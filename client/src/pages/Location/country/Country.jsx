import React, { useEffect, useState } from "react";
import "../../../styles/card/card.css";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";
import axios from "axios";
import PdfIcon from "../../../assets/img/icons/pdf.svg";
import ExcelIcon from "../../../assets/img/icons/excel.svg";
import { CiCirclePlus } from "react-icons/ci";
import { TbChevronUp, TbEdit, TbRefresh, TbTrash } from "react-icons/tb";
import "../../../styles/card/card.css";
import "../../../styles/table/table.css";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import CountryModal from "./CountryEdit";
import DeleteAlert from "../../../utils/sweetAlert/DeleteAlert";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [, setEditMode] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch countries on mount
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/countries`);
      setCountries(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch countries");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/countries`, {
        name: newName,
        code: newCode,
      });
      toast.success("Country added");
      setNewName("");
      setNewCode("");
      fetchCountries();
      window.$(`#add-country`).modal("hide"); // auto close
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding country");
    }
  };

  //   const handleEdit = (country) => {
  //     setEditMode(true);
  //     setEditingCountry(country);
  //     setNewName(country.name);
  //     setNewCode(country.code);
  //   };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/api/countries/${editingCountry._id}`, {
        name: newName,
        code: newCode,
      });
      toast.success("Country updated");
      setEditMode(false);
      setEditingCountry(null);
      setNewName("");
      setNewCode("");
      fetchCountries();
      window.$(`#add-country`).modal("hide"); // auto close
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    // if (!window.confirm("Are you sure you want to delete this country?"))
    const confirmed = await DeleteAlert({
      title: "Delete country?",
      text: "This action cannot be undone.",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmed) return;
    try {
      await axios.delete(`${BASE_URL}/api/countries/${id}`);
      toast.success("Deleted");
      fetchCountries();
      Swal.fire("Deleted!", "The country has been deleted.", "success");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  const filteredCountries = countries.filter(
    (country) =>
      (country?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (country?.code || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Format to match backend model
        const formattedData = jsonData.map((item) => ({
          name: item["Country Name"],
          code: item["Country Code"],
        }));

        // ✅ Send all at once
        const res = await axios.post(`${BASE_URL}/api/countries/import`, {
          countries: formattedData,
        });

        toast.success(res.data.message);
        fetchCountries();
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(error);
      toast.error("Import failed");
    }
  };

  const handleExportExcel = () => {
    const worksheetData = countries.map((country) => ({
      "Country Name": country.name,
      "Country Code": country.code,
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Countries");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "Countries.xlsx");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Countries</h4>
              <h6>Manage Your Countries</h6>
            </div>
          </div>
          <div className="table-top-head me-2">
            <li>
              <button
                type="button"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Pdf"
                className="icon-btn"
              >
                <FaFilePdf />
              </button>
            </li>
            <li>
              <label className="icon-btn m-0" title="Import Excel">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleImportExcel}
                  style={{ display: "none" }}
                />
                <FaFileExcel style={{ color: "green" }} />
              </label>
            </li>
            <li>
              <button
                type="button"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Export Excel"
                id="collapse-header"
                className="icon-btn"
                onClick={handleExportExcel}
              >
                <FaFileExcel />
              </button>
            </li>
          </div>
          <div className="page-btn">
            <a
              href="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add-country"
              onClick={() => {
                setNewName("");
                setNewCode("");
                setEditMode(false);
              }}
            >
              <CiCirclePlus className="me-1" />
              Add Country
            </a>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div className="search-set">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search country..."
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
              <div className="dropdown">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  Sort By : Last 7 Days
                </a>
                <ul className="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item rounded-1"
                    >
                      Recently Added
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item rounded-1"
                    >
                      Ascending
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item rounded-1"
                    >
                      Desending
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item rounded-1"
                    >
                      Last Month
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item rounded-1"
                    >
                      Last 7 Days
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table datatable">
                <thead className="thead-light">
                  <tr>
                    <th className="no-sort">
                      <label className="checkboxs">
                        <input type="checkbox" id="select-all" />
                        <span className="checkmarks" />
                      </label>
                    </th>
                    <th>Country Name</th>
                    <th>Country Code</th>
                    {/* <th>Status</th> */}
                    <th className="no-sort" />
                  </tr>
                </thead>
                <tbody>
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <tr key={country._id}>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td className="text-gray-9">{country.name}</td>
                        <td>{country.code}</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <a
                              className="me-2 p-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-country"
                              onClick={() => {
                                setEditMode(true);
                                setEditingCountry(country);
                                setNewName(country.name);
                                setNewCode(country.code);
                              }}
                            >
                              <TbEdit />
                            </a>
                            <a
                              className="p-2"
                              onClick={() => handleDelete(country._id)}
                            >
                              <TbTrash />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        No countries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
      <div>
        {/* Add Country */}

        <CountryModal
          modalId="add-country"
          title="Add Country"
          name={newName}
          code={newCode}
          onNameChange={(e) => setNewName(e.target.value)}
          onCodeChange={(e) => setNewCode(e.target.value)}
          onSubmit={handleAdd}
          submitLabel="Add Country"
        />

        <CountryModal
          modalId="edit-country"
          title="Edit Country"
          name={newName}
          code={newCode}
          onNameChange={(e) => setNewName(e.target.value)}
          onCodeChange={(e) => setNewCode(e.target.value)}
          onSubmit={handleUpdate}
          submitLabel="Update Country"
        />

        {/* ===================== */}
        {/* <div className="modal fade" id="add-country">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Add Country</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form onSubmit={editMode ? handleUpdate : handleAdd}>
                <div className="modal-body">
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label">
                        Country Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Country Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary fs-13 fw-medium p-2 px-3"
                  >
                    Add Country
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}
        {/* /Add Country */}
      </div>
    </div>
  );
};

export default Country;

// import React, { useEffect, useState } from "react";
// import "../../../styles/card/card.css";
// import "../../../styles/table/table.css";
// import BASE_URL from "../../config/config";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { CiCirclePlus } from "react-icons/ci";
// import { TbEdit, TbTrash } from "react-icons/tb";
// import { FaFileExcel, FaFilePdf } from "react-icons/fa";
// import CountryModal from "./CountryEdit";

// const Country = () => {
//   const [countries, setCountries] = useState([]);
//   const [newName, setNewName] = useState("");
//   const [newCode, setNewCode] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [editingCountry, setEditingCountry] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const countriesPerPage = 5;

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchCountries = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/countries`);
//       setCountries(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch countries");
//     }
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${BASE_URL}/api/countries`, {
//         name: newName,
//         code: newCode,
//       });
//       toast.success("Country added");
//       setNewName("");
//       setNewCode("");
//       fetchCountries();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Error adding country");
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${BASE_URL}/api/countries/${editingCountry._id}`, {
//         name: newName,
//         code: newCode,
//       });
//       toast.success("Country updated");
//       setEditMode(false);
//       setEditingCountry(null);
//       setNewName("");
//       setNewCode("");
//       fetchCountries();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this country?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/countries/${id}`);
//       toast.success("Deleted");
//       fetchCountries();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete");
//     }
//   };

//   // Filtered and Paginated countries
//   const filteredCountries = countries.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       c.code.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const indexOfLast = currentPage * countriesPerPage;
//   const indexOfFirst = indexOfLast - countriesPerPage;
//   const currentCountries = filteredCountries.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Countries</h4>
//               <h6>Manage Your Countries</h6>
//             </div>
//           </div>
//           <div className="table-top-head me-2">
//             <button className="icon-btn" title="PDF">
//               <FaFilePdf />
//             </button>
//             <button className="icon-btn" title="Excel">
//               <FaFileExcel />
//             </button>
//           </div>
//           <div className="page-btn">
//             <a
//               href="#"
//               className="btn btn-primary"
//               data-bs-toggle="modal"
//               data-bs-target="#add-country"
//               onClick={() => {
//                 setNewName("");
//                 setNewCode("");
//                 setEditMode(false);
//               }}
//             >
//               <CiCirclePlus className="me-1" />
//               Add Country
//             </a>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header d-flex justify-content-between align-items-center">
//             <input
//               type="text"
//               placeholder="Search country..."
//               className="form-control w-25"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table datatable">
//                 <thead className="thead-light">
//                   <tr>
//                     <th>#</th>
//                     <th>Country Name</th>
//                     <th>Country Code</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentCountries.length > 0 ? (
//                     currentCountries.map((country, index) => (
//                       <tr key={country._id}>
//                         <td>{indexOfFirst + index + 1}</td>
//                         <td>{country.name}</td>
//                         <td>{country.code}</td>
//                         <td>
//                           <button
//                             className="btn btn-sm btn-primary me-2"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-country"
//                             onClick={() => {
//                               setEditMode(true);
//                               setEditingCountry(country);
//                               setNewName(country.name);
//                               setNewCode(country.code);
//                             }}
//                           >
//                             <TbEdit />
//                           </button>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={() => handleDelete(country._id)}
//                           >
//                             <TbTrash />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="text-center text-muted">
//                         No countries found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             {/* Pagination */}
//             <div className="d-flex justify-content-center my-3">
//               <nav>
//                 <ul className="pagination">
//                   {[...Array(totalPages).keys()].map((num) => (
//                     <li
//                       key={num}
//                       className={`page-item ${currentPage === num + 1 ? "active" : ""}`}
//                     >
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(num + 1)}
//                       >
//                         {num + 1}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <CountryModal
//         modalId="add-country"
//         title="Add Country"
//         name={newName}
//         code={newCode}
//         onNameChange={(e) => setNewName(e.target.value)}
//         onCodeChange={(e) => setNewCode(e.target.value)}
//         onSubmit={handleAdd}
//         submitLabel="Add Country"
//       />

//       <CountryModal
//         modalId="edit-country"
//         title="Edit Country"
//         name={newName}
//         code={newCode}
//         onNameChange={(e) => setNewName(e.target.value)}
//         onCodeChange={(e) => setNewCode(e.target.value)}
//         onSubmit={handleUpdate}
//         submitLabel="Update Country"
//       />
//     </div>
//   );
// };

// export default Country;
