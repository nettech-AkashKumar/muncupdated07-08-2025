import React, { useEffect, useState } from "react";
import "./AllSupplier.css";
// import MoneyBag from "../images/MoneyBag.png";
// import RadioActive from "../images/Radioactive.png";
// import CircleLogo from "../images/Circlelogo.png";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddSupplierModals from "../../../pages/Modal/suppliers/AddSupplierModals";
import BASE_URL from "../../../pages/config/config";

function AllSuppliers() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  // const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/suppliers`);
      const data = await res.json();
      setSuppliers(data);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSupplier = async (id) => {
    if (!window.confirm('Are you sure you want to delete this supplier?')) return;
    try {
      await fetch(`${BASE_URL}/api/suppliers/${id}`, { method: 'DELETE' });
      fetchSuppliers();
    } catch (err) {
      // handle error
    }
  };

  // Pagination logic
  const totalItems = suppliers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = suppliers.slice(startIndex, endIndex);
  return (

    <div className="page-wrapper">
  <div className="content">
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>Suppliers</h4>
          <h6>Manage your suppliers</h6>
        </div>
      </div>
      <ul className="table-top-head">							
        <li className="me-2">
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img src="assets/img/icons/pdf.svg" alt="img" /></a>
        </li>
        <li className="me-2">
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img src="assets/img/icons/excel.svg" alt="img" /></a>
        </li>
        <li className="me-2">
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i className="ti ti-refresh" /></a>
        </li>
        <li className="me-2">
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i className="ti ti-chevron-up" /></a>
        </li>
      </ul>
      <div className="page-btn">
        {/* <a onClick={() => {  setShowAddModal(true); }} href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-supplier"><i className="ti ti-circle-plus me-1" />Add Supplier</a> */}
        <button onClick={() => {  setShowAddModal(true); }} className="add-btn">
            Add Supplier
          </button>
      </div>
    </div>
    {/* /product list */}
    <div className="card">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <div className="search-set">
          <div className="search-input">
            <span className="btn-searchset"><i className="ti ti-search fs-14 feather-search" /></span>
          </div>
        </div>
        <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
          <div className="dropdown">
            <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Status
            </a>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Active</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Inactive</a>
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
                <th>Code</th>
                <th>Supplier</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Status</th>
                <th className="no-sort" />
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((supplier) => (
                <tr key={supplier._id}>
                  <td>
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" />
                    </label>
                  </td>
                  <td>{supplier.code || supplier._id?.slice(-5)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="#" className="avatar avatar-md">
                        <img src={supplier.image ? `/uploads/${supplier.image}` : "assets/img/supplier/supplier-01.png"} className="img-fluid rounded-2" alt="img" />
                      </a>
                      <div className="ms-2">
                        <p className="text-gray-9 mb-0"><a href="#">{supplier.firstName} {supplier.lastName}</a></p>
                      </div>
                    </div>
                  </td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.country}</td>
                  <td>
                    <span className={`badge ${supplier.status ? 'badge-success' : 'badge-danger'} d-inline-flex align-items-center badge-xs`}>
                      <i className="ti ti-point-filled me-1" />{supplier.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="action-table-data">
                    <div className="edit-delete-action">
                      <a className="me-2 p-2" href="#" title="Edit" onClick={() => { setEditSupplier(supplier); setShowEditModal(true); }}>
                        <i data-feather="edit" className="feather-edit" />
                      </a>
                      <a className="p-2" href="#" title="Delete" onClick={() => handleDeleteSupplier(supplier._id)}>
                        <i data-feather="trash-2" className="feather-trash-2" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* /product list */}
      {showAddModal && !showEditModal && (
        <AddSupplierModals
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); fetchSuppliers(); }}
        />
      )}
      {showEditModal && (
        <AddSupplierModals
          onClose={() => { setShowEditModal(false); setEditSupplier(null); }}
          onSuccess={() => { setShowEditModal(false); setEditSupplier(null); fetchSuppliers(); }}
          editSupplier={editSupplier}
        />
      )}
  </div>
  
</div>

    // <div className="all-supplier-container">
    //   <div className="supplier-header">
    //     <Link
    //       to="/"
    //       style={{
    //         textDecoration: "none",
    //         color: "#676767",
    //         marginBottom: "20px",
    //       }}
    //     >
    //       Supplier
    //     </Link>

    //     {/* Three-Box */}
    //     <div className="three-box">
    //       {/* All Parties */}
    //       <div className="money-bag">
    //         <div>
    //           {/* <img src={MoneyBag} alt="money" /> */}
    //         </div>
    //         <div className="bag-content">
    //           <span style={{ color: "#676767", marginTop: "50px" }}>
    //             All Parties
    //           </span>
    //           <br />
    //           <span style={{ textAlign: "left" }}>
    //             <b>14</b>
    //           </span>
    //         </div>
    //       </div>

    //       {/* To Receive */}
    //       <div className="radio-active">
    //         <div>
    //           {/* <img src={RadioActive} alt="money" /> */}
    //         </div>
    //         <div className="bag-content">
    //           <span style={{ color: "#676767", marginTop: "50px" }}>
    //             To Receive
    //           </span>
    //           <br />
    //           <span style={{ textAlign: "left" }}>
    //             <b>₹12,75,987</b>
    //           </span>
    //         </div>
    //       </div>

    //       {/* To Pay */}
    //       <div className="Circle-logo">
    //         <div>
    //           {/* <img src={CircleLogo} alt="money" /> */}
    //         </div>
    //         <div className="bag-content">
    //           <span style={{ color: "#676767", marginTop: "50px" }}>
    //             To Pay{" "}
    //           </span>
    //           <br />
    //           <span style={{ textAlign: "left" }}>
    //             <b>₹5,987</b>
    //           </span>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Search Category & Add Supplier */}
    //     <div className="sea-cat-add">
    //       {/* Search */}
    //       <div style={{ display: "flex", justifyContent: "space-between" }}>
    //         <div style={{ display: "flex", gap: "50px" }}>
    //           <div className="search">
    //             <FaSearch />
    //             <input
    //               type="search"
    //               placeholder="Search"
    //               style={{
    //                 border: "none",
    //                 textAlign: "left",
    //                 width: "100%",
    //                 outline: "none",
    //               }}
    //             />
    //           </div>

    //           {/* Category */}
    //           <div className="select-category">
    //             <select
    //               name=""
    //               id=""
    //               style={{
    //                 border: "1px solid #e6e6e6",
    //                 backgroundColor: "#ffffff",
    //                 borderRadius: "8px",
    //                 padding: "10px 20px",
    //                 textAlign: "left", // ensures text is aligned left
    //                 direction: "ltr",
    //                 width: "200px", // optional: fixed width
    //                 outline: "none",
    //               }}
    //             >
    //               <option value="">Select Category</option>
    //             </select>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Add Supplier Button*/}

    //       <div className="Add-supplier-link">
    //         <Link
    //           to="/AddSupplier"
    //           style={{
    //             padding: "8px 15px",
    //             backgroundColor: "#1368EC",
    //             color: "white",
    //             borderRadius: "8px",
    //             border: "none",
    //             textDecoration: "none",
    //           }}
    //         >
    //           Add Supplier
    //         </Link>
    //       </div>
    //     </div>

    //     {/* Toolbar */}
    //     <div
    //       style={{
    //         backgroundColor: "white",
    //         marginTop: "30px",
    //         borderRadius: "8px",
    //       }}
    //     >
    //       <div className="overview">
    //         <div>
    //           <div className="toolbars">
    //             <div>
    //               <h3>All Supplier</h3>
    //             </div>
    //             <div className="toolbar-actions">
    //               <select
    //                 style={{
    //                   border: "1px solid #e6e6e6",
    //                   borderRadius: "8px",
    //                   padding: "10px 20px",
    //                   outline: "none",
    //                   backgroundColor: "white",
    //                   color: "#333",
    //                 }}
    //               >
    //                 <option value="">Select warehouse</option>
    //               </select>
    //             </div>
    //           </div>

    //           <div className="toolbar-actions-th" style={{justifyContent:'space-between', alignItems:'center'}}>
    //             <div className="toolbar-titles">
    //               <button className="toolbar-filter-btn">All</button>
    //             </div>

    //             <div style={{ display: "flex", gap: "16px",marginTop: "10px",marginBottom: "10px", padding:'0px 20px' }}>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   border: "1px solid #E6E6E6",
    //                   backgroundColor: "#FFFFFF",
    //                   borderRadius: "6px",
    //                   padding: "10px",
    //                   gap: "10px",
    //                 }}
    //               >
    //                 <span>
    //                   <CiSearch />
    //                 </span>
    //                 <span>
    //                   <IoFilter />
    //                 </span>
    //               </div>

    //               {/* up & down icon */}
    //               <div
    //                 style={{
    //                   border: "1px solid #E6E6E6",
    //                   backgroundColor: "#FFFFFF",
    //                   borderRadius: "6px",
    //                   padding: "10px",
    //                 }}
    //               >
    //                 <span>
    //                   <LuArrowUpDown />
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* table Container */}
    //       <div style={{ backgroundColor: "white" }}>
    //         <table className="product-table">
    //           <thead>
    //             <tr style={{ color: "#676767" }}>
    //               <th>
    //                 <input type="checkbox" />
    //               </th>
    //               <th>Supplier</th>
    //               <th>Category</th>
    //               <th>Supplier Type </th>
    //               <th>Balance</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {paginatedData.map((sales, index) => (
    //               <tr key={index}>
    //                 <td>
    //                   <input type="checkbox" />
    //                 </td>
    //                 <td>{sales.supplier}</td>
    //                 <td>
    //                   {Array.isArray(sales.category) ? (
    //                     sales.category.map((cat, i) => (
    //                       <span key={i} className="category-chip">
    //                         {" "}
    //                         {cat}{" "}
    //                       </span>
    //                     ))
    //                   ) : (
    //                     <span className="category-chip">
    //                       {" "}
    //                       {sales.category}{" "}
    //                     </span>
    //                   )}
    //                 </td>

    //                 <td>{sales.supplierType}</td>
    //                 <td>
    //                   <span
    //                     className={
    //                       sales.balance.trim().startsWith("+")
    //                         ? "balance-positive"
    //                         : "balance-negative"
    //                     }
    //                   >
    //                     {sales.balance}
    //                   </span>
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>

    //         <div className="pagination">
    //           <div className="pagination-boxx">{itemsPerPage} per page</div>
    //           <div className="pagination-boxx pagination-info">
    //             <span>
    //               {startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
    //               {totalItems}
    //             </span>
    //             <span style={{ color: "grey" }}> | </span>
    //             <button
    //               disabled={currentPage === 1}
    //               onClick={() =>
    //                 setCurrentPage((prev) => Math.max(prev - 1, 1))
    //               }
    //               className="pagination-arrow"
    //             >
    //               <FaAngleLeft />
    //             </button>
    //             <button
    //               disabled={currentPage === totalPages}
    //               onClick={() =>
    //                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    //               }
    //               className="pagination-arrow"
    //             >
    //               <FaChevronRight />
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default AllSuppliers;
