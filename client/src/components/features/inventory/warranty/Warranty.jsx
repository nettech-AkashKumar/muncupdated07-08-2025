import { useMemo, useRef, useState, useEffect } from "react";
import { BiSolidFilePdf } from "react-icons/bi";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";
import Button from "react-bootstrap/Button";
import { LuCirclePlus } from "react-icons/lu";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { Modal, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import dayjs from "dayjs";
// import "./Warranty.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import axios from "axios";





const calculateDuration = (fromDate, toDate) => {
  if (!fromDate || !toDate) return "";

  const from = new Date(fromDate);
  const to = new Date(toDate);

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();

  const totalMonths = years * 12 + months;

  return `${(totalMonths / 12).toFixed(1)} years`;
};



const Warranty = ({ show, handleClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [Warrantydata, setWarrantydata] = useState([]);
  const [Error, setError] = useState(null);
  const tableRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [warranties, setWarranties] = useState([]);
  const [FilteredWarranties, setFilteredWarranties] = useState([]);
  const [loading, setLoading] = useState(false);




  const fetchWarranties = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/warranty/");
      if (!res.ok) {
        throw new Error("Failed to fetch Warranty data");
      }

      const data = await res.json();

      const updatedData = data.map((item) => ({
        ...item,
        id: item._id,
      }));

      setWarranties(updatedData);

      setFilteredWarranties(updatedData);
    } catch (err) {
      console.error("Error fetching warranties:", err);
      setError("Failed to fetch warranties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, []);



  useEffect(() => {
    const fetchGiftData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/warranty/");
        if (!response.ok) {
          throw new Error("Failed to fetch warranty data");
        }
        const data = await response.json();
        console.log(data);
        const updatedData = data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setWarrantydata(updatedData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchGiftData();
  }, []);



  const handleExportPDF = () => {
    const table = tableRef.current;
    if (!table) {
      console.error("Table reference not found");
      return;
    }
    html2canvas(table, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("warranties.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        setError("Failed to generate PDF. Please try again.");
      });
  };


  const handleExportExcel = () => {
    const exportData = filteredWarranties.map((item) => ({
      Warranty: item.warranty,
      Description: item.description,
      From: item.fromDate ? new Date(item.fromDate).toLocaleDateString() : "",
      To: item.toDate ? new Date(item.toDate).toLocaleDateString() : "",
      Duration: item.duration || "",
      Status: item.status ? "Active" : "Inactive",
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Warranties");
    XLSX.writeFile(workbook, "warranties.xlsx");
  };

  const handleCloses = () => setShowModal(false);

  const [formData, setFormData] = useState({
    warranty: "",
    description: "",
    duration: "",
    fromDate: "",
    toDate: "",
    status: false,
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    warranty: "",
    description: "",
    duration: "",
    fromDate: "",
    toDate: "",
    status: false,
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
      const response = await fetch("http://localhost:5000/api/warranty/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add warranty");
      }
      const data = await response.json();
      console.log("New Warranty Added:", data);
      setWarrantydata((prevData) => [...prevData, { ...data, id: data._id }]);
      handleCloses();
    } catch (err) {
      setError(err.message);
      console.error("Error:", err.message);
    }
  };

  const handleEditOpen = (card) => {
    console.log("Opening edit modal for card:", card);
    setEditFormData({
      id: card.id || "",
      warranty: card.warranty || "",
      description: card.description || "",
      duration: card.duration || "",
      fromDate: card.fromDate || "",
      toDate: card.toDate || "",
      status: card.status || false,
    });
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setEditFormData({
      id: "",
      warranty: "",
      description: "",
      duration: "",
      fromDate: "",
      toDate: "",
      status: false,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...editFormData,
      [name]: value,
    };

    // 👉 New: auto-calculate duration from fromDate and toDate
    if ((name === "fromDate" || name === "toDate") && updatedForm.fromDate && updatedForm.toDate) {
      const from = new Date(updatedForm.fromDate);
      const to = new Date(updatedForm.toDate);

      const yearsDiff = to.getFullYear() - from.getFullYear();
      const monthsDiff = to.getMonth() - from.getMonth();
      const totalMonths = yearsDiff * 12 + monthsDiff;

      const durationInYears = (totalMonths / 12).toFixed(1);
      updatedForm.duration = `${durationInYears} years`; // 👉 New line
    }

    setEditFormData(updatedForm);
  };



  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/warranty/${editFormData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });
      if (!response.ok) {
        throw new Error("Failed to update warranty");
      }
      const data = await response.json();
      console.log("Updated Warranty:", data);
      setWarrantydata((prevData) =>
        prevData.map((card) => (card.id === data.id ? { ...card, ...data } : card))
      );
      handleEditClose();
    } catch (err) {
      console.error("Error updating warranty:", err);
      setError("Failed to update warranty. Please try again.");
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/warranty/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the warranty");
      }
      setWarrantydata((prev) => prev.filter((item) => item.id !== id));
      setShowDeleteModal(false);
      setPendingDeleteId(null);
      // alert("Warranty deleted successfully");
    } catch (err) {
      console.error("Error deleting warranty:", err);
      setError("Failed to delete the warranty. Please try again.");
    }
  };


  const filteredWarranties = useMemo(() => {
    return Warrantydata.filter((item) => {
      const warranty = item?.warranty || "";
      const description = item?.description || "";
      const searchMatch =
        warranty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "active" && item.status) ||
        (statusFilter === "inactive" && !item.status);
      return searchMatch && statusMatch;
    });
  }, [Warrantydata, searchTerm, statusFilter]);



  const openDeleteModal = (id) => {
    setPendingDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleShow = () => setShowModal(true);


  return (
    <div className="fn-conatiner">
      {Error && <div className="alert alert-danger">{Error}</div>}
      <div className="d-flex bd-highlight justify-content-between align-items-start">
        <div className="p-3 mt-3 flex-grow-1">
          <div className="h4">Warranties</div>
          <div className="text-secondary">Manage your Warranties</div>
        </div>
        <div className="d-flex align-items-center gap-1 p-4 mt-3">
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
            <BiSolidFilePdf size={24} />
          </Button>

          <Button
            variant="light"
            aria-label="Refresh"
            className="text-secondary"
            onClick={() => {

              fetchWarranties();
            }}
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
          <Button variant="warning text-white" onClick={handleShow}>
            <LuCirclePlus /> Add Warranty
          </Button>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloses} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Warranty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="warranty">
              <Form.Label>
                Warranty <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter warranty"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
              />
            </Form.Group>

            {/* //to date */}
            <Row className="mt-3">
              <Col>
                <Form.Group controlId="fromDate">
                  <Form.Label>
                    From Date  <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="Date"
                    min={1}
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="toDate">
                  <Form.Label>
                    To Date  <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="Date"
                    min={1}
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <Form.Group controlId="description">
                  <Form.Label>
                    Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
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
          <Button variant="dark" onClick={handleCloses}>
            Cancel
          </Button>
          <Button variant="warning text-white" onClick={handleSubmit}>
            Add Warranty
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Warranty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editWarranty">
              <Form.Label>
                Warranty <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="warranty"
                value={editFormData.warranty}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Row className="mt-3">
              <Col>
                <Form.Group controlId="editDuration">
                  <Form.Label>
                    Duration <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="duration"
                    value={editFormData.duration}
                    onChange={handleEditChange}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Group controlId="fromDate">
                  <Form.Label>
                    From Date  <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="Date"
                    min={1}
                    name="fromDate"
                    value={editFormData.fromDate}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="toDate">
                  <Form.Label>
                    To Date  <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="Date"
                    min={1}
                    name="toDate"
                    value={editFormData.toDate}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="editDescription" className="mt-3">
              <Form.Label>
                Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editFormData.description}
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
          <Button variant="dark" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Body className="text-center py-4">
          <div className="d-flex justify-content-center mb-3">
            <div className="bg-danger bg-opacity-10 rounded-circle p-3">
              <RiDeleteBinLine size={28} className="text-danger" />
            </div>
          </div>
          <h5 className="fw-bold">Delete Warranty</h5>
          <p>Are you sure you want to delete warranty?</p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button variant="dark" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="warning" onClick={() => handleDelete(pendingDeleteId)}>
              Yes Delete
            </Button>
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
              <option value="all">All Statuses</option>
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
                <th scope="col">Warranty</th>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">To Date</th>
                <th scope="col">From Date</th>
                <th scope="col">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredWarranties
                .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                .map((item, idx) => (
                  <tr key={idx}>
                    <th scope="col">
                      <input type="checkbox" />
                    </th>
                    <td>{item.warranty}</td>
                    <td>{item.description}</td>
                    {/* <td>{`${item.duration}`}</td> */}
                    <td>{calculateDuration(item.fromDate, item.toDate)}</td>
                    <td> {dayjs(item.toDate).format("YYYY-MM-DD")}</td>
                    <td>{dayjs(item.fromDate).format("YYYY-MM-DD")}</td>
                    <td>

                      <span
                        className={`badge ${item.status ? "badge-success" : "badge-danger"}`}
                      >
                        {item.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="iconsms">
                        <button>
                          <IoEyeOutline />
                        </button>

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
        {/* CHANGE: Fixed pagination to use filteredWarranties */}
        <div className="d-flex justify-content-between align-items-center p-3">
          <div className="d-flex gap-3 align-items-center">
            <div>Rows Per Page</div>
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
                  Math.min(prev + 1, Math.ceil(filteredWarranties.length / rowsPerPage))
                )
              }
              disabled={currentPage === Math.ceil(filteredWarranties.length / rowsPerPage)}
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

export default Warranty;

