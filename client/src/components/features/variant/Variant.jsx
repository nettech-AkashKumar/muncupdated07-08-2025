import { useMemo, useRef, useState, useEffect } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { BiSolidFilePdf } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuCirclePlus } from "react-icons/lu";
import { Modal, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { IoSettingsSharp } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import html2canvas from "html2canvas";
import { AiOutlineFileExcel } from "react-icons/ai";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";



import dayjs from "dayjs";
// import "../../../styles/varient/varient.css";

const Variant = ({ show, handleClose }) => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [variantData, setVariantData] = useState([]);
    const [error, setError] = useState(null);
    const tableRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const fetchVariants = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/variant-attributes/");
            if (!res.ok) {
                throw new Error("Failed to fetch variant data");
            }
            const data = await res.json();
            const updatedData = data.map((item) => ({
                ...item,
                id: item._id,
            }));
            console.log("Fetched Data:", updatedData);
            setVariantData(updatedData);
        } catch (err) {
            console.error("Error fetching variants:", err);
            setError("Failed to fetch variants");
        }
    };

    useEffect(() => {
        fetchVariants();
    }, []);

    const [formData, setFormData] = useState({
        variant: "",
        value: "",
        createdDate: dayjs().format("YYYY-MM-DD"),
        status: true,
    });

    const [editFormData, setEditFormData] = useState({
        id: "",
        variant: "",
        value: "",
        createdDate: "",
        status: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/variant-attributes/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Failed to add variant");
            }
            const data = await response.json();
            setVariantData((prevData) => [...prevData, { ...data, id: data._id }]);
            handleCloses();
        } catch (err) {
            setError(err.message);
            console.error("Error:", err.message);
        }
    };

    const handleEditOpen = (item) => {
        setEditFormData({
            id: item.id || "",
            variant: item.variant || "",
            value: item.value || "",
            createdDate: item.createdDate || "",
            status: item.status || true,
        });
        setShowEditModal(true);
    };

    const handleEditClose = () => {
        setShowEditModal(false);
        setEditFormData({ id: "", variant: "", value: "", createdDate: "", status: true });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/variant-attributes/${editFormData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editFormData),
            });
            if (!response.ok) {
                throw new Error("Failed to update variant");
            }
            const data = await response.json();
            setVariantData((prevData) =>
                prevData.map((item) => (item.id === data.id ? { ...item, ...data } : item))
            );
            handleEditClose();
        } catch (err) {
            console.error("Error updating variant:", err);
            setError("Failed to update variant. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/variant-attributes/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete the variant");
            }
            setVariantData((prev) => prev.filter((item) => item.id !== id));
            setShowDeleteModal(false);
            setPendingDeleteId(null);
        } catch (err) {
            console.error("Error deleting variant:", err);
            setError("Failed to delete the variant. Please try again.");
        }
    };

    const filteredVariants = useMemo(() => {
        return variantData.filter((item) => {
            const variant = item?.variant?.toLowerCase() || "";
            const value = item?.value?.toLowerCase() || "";
            const search = searchTerm?.toLowerCase() || "";

            const searchMatch = variant.includes(search) || value.includes(search);

            const statusMatch =
                statusFilter === "all" ||
                (statusFilter === "active" && item.status) ||
                (statusFilter === "inactive" && !item.status);

            return searchMatch && statusMatch;
        });
    }, [variantData, searchTerm, statusFilter]);


    const handleExportPDF = () => {
        const table = tableRef.current;
        if (!table) {
            console.error("Table reference not found");
            return;
        }

        html2canvas(table, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 10;

            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                pdf.addPage();
                position = 0;
                pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save("variants.pdf");
        }).catch((error) => {
            console.error("Error generating PDF:", error);
            setError("Failed to generate PDF. Please try again.");
        });
    };

    const handleExportExcel = () => {
        const exportData = filteredVariants.map((item) => ({
            Variant: item.variant,
            Values: item.value,
            "Created Date": dayjs(item.createdDate).format("DD MMM YYYY"),
            Status: item.status ? "Active" : "Inactive",
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Variants");
        XLSX.writeFile(workbook, "variants.xlsx");
    };


    const openDeleteModal = (id) => {
        setPendingDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleCloses = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    return (
        <div className="fn-conatiner">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex bd-highlight justify-content-between align-items-start">
                <div className="p-3 mt-0 flex-grow-1">
                    <div className="h4">Variant Attributes</div>
                    <div className="text-secondary">Manage your variant attributes</div>
                </div>

                <div className="d-flex align-items-center gap-1 p-4 mt-0">
                    <Button
                        className="text-danger"
                        variant="light"
                        aria-label="Export as PDF"
                        onClick={handleExportPDF}
                    >
                        <BiSolidFilePdf size={24} />
                    </Button>
                    <Button
                        className="text-success"
                        variant="light"
                        aria-label="Export as Excel"
                        onClick={handleExportExcel}
                    >
                        <AiOutlineFileExcel size={24} />
                    </Button>

                    <Button
                        variant="light"
                        aria-label="Refresh"
                        className="text-secondary"
                        onClick={fetchVariants}
                    >
                        <HiOutlineRefresh size={20} />
                    </Button>
                    <Button
                        variant="light"
                        aria-label="Collapse"
                        className="text-secondary"
                    >
                        <IoIosArrowUp size={18} />
                    </Button>
                    <button className="btn btn-warning text-white" onClick={handleShow}>
                        <LuCirclePlus /> Add Variant
                    </button>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloses} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Variant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="variant">
                            <Form.Label>
                                Variant <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter variant (e.g., Size, Color)"
                                name="variant"
                                value={formData.variant}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="value" className="mt-3">
                            <Form.Label>
                                Values <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter values separated by comma (e.g., XS, S, M, L)"
                                name="value"
                                value={formData.value}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        Enter Value separated by comma

                        <Form.Group
                            controlId="status"
                            className="mt-4 d-flex align-items-center justify-content-between"
                        >
                            <Form.Label className="me-3 mb-0">Status</Form.Label>
                            <Form.Check
                                type="switch"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-dark" onClick={handleCloses}>
                        Cancel
                    </button>
                    <button className="btn btn-warning text-white" onClick={handleSubmit}>
                        Add Variant
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditModal} onHide={handleEditClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Variant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editVariant">
                            <Form.Label>
                                Variant <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="variant"
                                value={editFormData.variant}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="editValue" className="mt-3">
                            <Form.Label>
                                Values <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="value"
                                value={editFormData.value}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="editStatus"
                            className="mt-4 d-flex align-items-center justify-content-between"
                        >
                            <Form.Label className="me-3 mb-0">Status</Form.Label>
                            <Form.Check
                                type="switch"
                                name="status"
                                checked={editFormData.status}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-dark" onClick={handleEditClose}>
                        Cancel
                    </button>
                    <button className="btn btn-warning" onClick={handleEditSubmit}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Body className="text-center py-4">
                    <div className="d-flex justify-content-center mb-3">
                        <div className="bg-danger bg-opacity-10 rounded-circle p-3">
                            <RiDeleteBinLine size={28} className="text-danger" />
                        </div>
                    </div>
                    <h5 className="fw-bold">Delete Variant</h5>
                    <p>Are you sure you want to delete variant?</p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button className="btn btn-dark" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-warning" onClick={() => handleDelete(pendingDeleteId)}>
                            Yes Delete
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="container-mn">
                <div className="d-flex justify-content-between align-items-center p-3">
                    <div>
                        <div className="input-group rounded">
                            <input
                                type="search"
                                className="form-control rounded"
                                placeholder="🔍︎ Search"
                                aria-label="Search"
                                aria-describedby="search-addon"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <select
                            className="form-select"
                            value={statusFilter}
                            aria-label="Default select example"
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div>
                    <table className="table" ref={tableRef}>
                        <thead className="tableheader">
                            <tr>
                                <th scope="col">
                                    <input type="checkbox" />
                                </th>
                                <th scope="col">Variant</th>
                                <th scope="col">Values</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVariants
                                .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                                .map((item, idx) => (
                                    <tr key={idx}>
                                        <th scope="col">
                                            <input type="checkbox" />
                                        </th>
                                        <td>{item.variant}</td>
                                        <td>{item.value}</td>
                                        <td>{dayjs(item.createdAt).format("DD MMM YYYY")}</td>
                                        <td>
                                            <span className={`badge ${item.status ? "badge-success" : "badge-danger"}`}>
                                                {item.status ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="iconsms">
                                                {/* <button>
                                                    <IoEyeOutline />
                                                </button> */}
                                                <button onClick={() => handleEditOpen(item)}>
                                                    <FiEdit />
                                                </button>
                                                <button onClick={() => openDeleteModal(item.id)}>
                                                    <RiDeleteBinLine />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex gap-3 align-items-center">
                        <div>Row Per Page</div>
                        <select
                            className="form-select"
                            name="rows"
                            id="rows"
                            style={{ width: "80px" }}
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                        <div>Entries</div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn"
                            style={{ border: "none", background: "transparent" }}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            aria-label="Previous Page"
                        >
                            <GoChevronLeft size={20} />
                        </button>
                        <div className="text-center downt">
                            <span>{currentPage}</span>
                        </div>
                        <button
                            className="btn"
                            style={{ border: "none", background: "transparent" }}
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, Math.ceil(filteredVariants.length / rowsPerPage))
                                )
                            }
                            disabled={currentPage === Math.ceil(filteredVariants.length / rowsPerPage)}
                            aria-label="Next Page"
                        >
                            <GoChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="settings">
                <IoSettingsSharp />
            </div> */}
        </div>
    );
};

export default Variant;