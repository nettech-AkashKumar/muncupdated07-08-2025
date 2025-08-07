
import React, { useEffect, useState } from "react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { TbChevronUp, TbEdit, TbRefresh, TbTrash } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import AddPurchaseModal from "../../../../pages/Modal/PurchaseModals/AddPurchaseModal";
import { CiCirclePlus } from "react-icons/ci";
import EditPurchaseModal from "../../../../pages/Modal/PurchaseModals/EditPurchaseModal";
import axios from "axios";
import BASE_URL from "../../../../pages/config/config";
import { useSettings } from "../../../../Context/purchase/PurchaseContext";
// import { useSettings } from "../../../../Context/purchase/PurchaseContext";
// import "../../../../styles/purchase/product.css"
import "../../../../styles/product/product.css"


const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { settings } = useSettings();
  const navigate = useNavigate(); // 👈 inside the component


  // const fetchPurchases = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/purchases`, {
  //       params: {
  //         ...filters,
  //         page,
  //         limit: 10,
  //       },
  //     });
  //     setPurchases(res.data.purchases);
  //     setTotalPages(res.data.totalPages);
  //   } catch (error) {
  //     console.error("Error fetching purchases:", error);
  //   }
  // };
  const fetchPurchases = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/purchases`, {
        params: {
          ...filters,
          // status: "Received",  // force only received
          page,
          limit: 10,
        },
      });
      setPurchases(res.data.purchases);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [filters, page]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // const convertCurrency = (value) => {
  //   const rate = settings.conversionRates?.[settings.currencyCode] || 1;
  //   return (value * rate).toFixed(2);
  // };
  const convertCurrency = (value) => {
    if (!settings.conversionRates || !settings.baseCurrency) return value?.toFixed(2) || "0.00";

    const baseToSelectedRate = settings.conversionRates[settings.currencyCode] || 1;
    const baseToBaseRate = settings.conversionRates[settings.baseCurrency] || 1;

    const converted = (value / baseToBaseRate) * baseToSelectedRate;
    return converted.toFixed(2);
  };
  // New: handle edit button click — set selected purchase and open modal
  const handleEditClick = (purchase) => {
    setSelectedPurchase(purchase);
    // Open modal programmatically since React doesn’t auto open with state change
    const editModal = new window.bootstrap.Modal(document.getElementById("edit-purchase"));
    editModal.show();
  };
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const [activeSection, setActiveSection] = useState(
    sessionStorage.getItem("activeSection") || "personalInfo"
  );
  useEffect(() => {
    sessionStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  // Function to handle section toggling
  const onToggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4 className="fw-bold">Purchase</h4>
              <h6>Manage your purchases</h6>
            </div>
          </div>
          {/* <div className="table-top-head d-flex align-items-center gap-2 flex-wrap">
            <button
              className={`btn btn-outline-primary ${filters.status === "" ? "active" : ""}`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, status: "" }));
                setPage(1);
              }}
            >
              All
            </button>

            <button
              className={`btn btn-outline-warning ${filters.status === "Pending" ? "active" : ""}`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, status: "Pending" }));
                setPage(1);
              }}
            >
              Pending
            </button>

            <button
              className={`btn btn-outline-success ${filters.status === "Received" ? "active" : ""}`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, status: "Received" }));
                setPage(1);
              }}
            >
              Received
            </button>

            <button
              className={`btn btn-outline-info ${filters.status === "Ordered" ? "active" : ""}`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, status: "Ordered" }));
                setPage(1);
              }}
            >
              Purchase Orders
            </button>

            <button
              className="btn btn-dark"
              onClick={() => navigate("/stock-history")}
            >
              Stock History
            </button>
          </div> */}

          <div className="table-top-head me-2">
            <li><button type="button" className="icon-btn" title="Pdf"><FaFilePdf /></button></li>
            <li><label className="icon-btn m-0" title="Import Excel"><input type="file" accept=".xlsx, .xls" hidden /><FaFileExcel style={{ color: "green" }} /></label></li>
            <li><button type="button" className="icon-btn" title="Export Excel"><FaFileExcel /></button></li>
          </div>


          <div className="d-flex gap-2">
            <a className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-purchase"><CiCirclePlus className="me-1" />Add Purchase</a>
            <a className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#view-notes"><i data-feather="download" className="me-2" />Import Purchase</a>
          </div>
        </div>

        <div className="card">
          <div className="card-header  justify-content-between flex-wrap gap-3">
            <div className="row ">
              <div className="col-md-3">
                <input type="text" name="search" className="form-control" placeholder="Search by product, supplier, or reference" value={filters.search} onChange={handleInputChange} />
              </div>
              <div className="col-md-3">
                <input type="date" name="startDate" className="form-control" value={filters.startDate} onChange={handleInputChange} />
              </div>
              <div className="col-md-3">
                <input type="date" name="endDate" className="form-control" value={filters.endDate} onChange={handleInputChange} />
              </div>
              <div className="col-md-3">
                <select name="status" className="form-select" value={filters.status} onChange={handleInputChange}>
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table datatable text-center align-middle">
                <thead className="thead-light text-center">
                  <tr>
                    <th><label className="checkboxs"><input type="checkbox" /><span className="checkmarks" /></label></th>
                    <th>Supplier</th>
                    <th>Reference</th>
                    <th>Date</th>
                    <th>Products</th>
                    <th>Qyt</th>
                    <th>Purchase Price</th>
                    <th>Discount</th>
                    <th>Tax(%)</th>
                    <th>Tax Amount</th>
                    <th>Shipping Charge</th>
                    <th>Extra Expense</th>
                    <th>Unit cost</th>
                    <th>Total cost</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.length === 0 ? (
                    <tr><td colSpan="7" className="text-center">No purchases found.</td></tr>
                  ) : (
                    purchases.map((purchase) => (
                      <tr key={purchase._id}>
                        <td><label className="checkboxs"><input type="checkbox" /><span className="checkmarks" /></label></td>
                        <td>{purchase.supplier ? `${purchase.supplier.firstName} ${purchase.supplier.lastName}` : "N/A"}</td>
                        <td>{purchase.referenceNumber}</td>
                        <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                        <td>
                          <ul>{purchase.products.map((p, idx) => (<li key={idx}>{p.product?.productName} - {p.quantity} × {settings.currencySymbol}{convertCurrency(p.purchasePrice)}</li>))}</ul>
                        </td>
                        <td><ul>{purchase.products.map((p, idx) => (<li key={idx}>{p.quantity} {p.unit}</li>))}</ul></td>
                        <td><ul>{purchase.products.map((p, idx) => (<li key={idx}>{settings.currencySymbol}{convertCurrency(p.purchasePrice)}</li>))}</ul></td>
                        <td><ul>{purchase.products.map((p, idx) => (<li key={idx}>{settings.currencySymbol}{convertCurrency(p.discount)}</li>))}</ul></td>
                        <td><ul>{purchase.products.map((p, idx) => (<li key={idx}>{p.tax} %</li>))}</ul></td>
                        <td><ul>{purchase.products.map((p, idx) => (<li key={idx}>{settings.currencySymbol}{convertCurrency(p.taxAmount || ((p.afterDiscount * p.tax) / 100 || 0))}</li>))}</ul></td>
                        <td>{settings.currencySymbol}{convertCurrency(purchase.shippingCost)}</td>
                        <td>{settings.currencySymbol}{convertCurrency(purchase.orderTax)}</td>
                        <td><ul>{purchase.products.map((p, idx) => (<li key={idx}>{settings.currencySymbol}{convertCurrency(p.unitCost)}</li>))}</ul></td>
                        <td><ul>{purchase.products.map((p, idx) => (<li key={idx}>{settings.currencySymbol}{convertCurrency(p.totalCost)}</li>))}</ul></td>
                        <td><span className={`badge ${purchase.status === "Pending" ? "bg-warning" : "bg-success"}`}>{purchase.status}</span></td>
                        <td className="action-table-data">

                          <div className="edit-delete-action">
                            <a className="me-2 p-2" data-bs-toggle="modal" data-bs-target="#edit-purchase" onClick={() => handleEditClick(purchase)}><TbEdit /></a>
                            <a className="p-2"><TbTrash /></a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center p-2 mb-0">
              <div>Page {page} of {totalPages}</div>
              <div className="btn-group">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Prev</button>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
              </div>
            </div>
          </div>
        </div>

        <AddPurchaseModal />
        {/* <EditPurchaseModal /> */}
        <EditPurchaseModal editData={selectedPurchase} onUpdate={fetchPurchases} />

      </div>
    </div>
  );
};

export default Purchase;



// import React, { useEffect, useState } from "react";
// import { FaFileExcel, FaFilePdf } from "react-icons/fa";
// import { TbChevronUp, TbEdit, TbRefresh, TbTrash } from "react-icons/tb";
// import { Link } from "react-router-dom";
// import AddPurchaseModal from "../../../../pages/Modal/PurchaseModals/AddPurchaseModal";
// import { CiCirclePlus } from "react-icons/ci";
// import EditPurchaseModal from "../../../../pages/Modal/PurchaseModals/EditPurchaseModal";
// import axios from "axios";
// import BASE_URL from "../../../../pages/config/config";
// import { useSettings } from "../../../../Context/purchase/PurchaseContext";

// const Purchase = () => {
//   const [purchases, setPurchases] = useState([]);
//   const [filters, setFilters] = useState({
//     search: "",
//     startDate: "",
//     endDate: "",
//     status: "",
//   });
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const { settings } = useSettings();

//   const fetchPurchases = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/purchases`, {
//         params: {
//           ...filters,
//           page,
//           limit: 10,
//         },
//       });
//       setPurchases(res.data.purchases);
//       setTotalPages(res.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching purchases:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPurchases();
//   }, [filters, page]);

//   useEffect(() => {
//     fetchPurchases();
//   }, [filters, page]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setPage(1); // reset to page 1 on filter change
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };


//   const convertCurrency = (value) => {
//     const rate = settings.conversionRates?.[settings.currencyCode] || 1;
//     return (value * rate).toFixed(2);
//   };
//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4 className="fw-bold">Purchase</h4>
//               <h6>Manage your purchases</h6>
//             </div>
//           </div>
//           <div className="table-top-head me-2">
//             <li>
//               <button type="button" className="icon-btn" title="Pdf">
//                 <FaFilePdf />
//               </button>
//             </li>
//             <li>
//               <label className="icon-btn m-0" title="Import Excel">
//                 <input type="file" accept=".xlsx, .xls" hidden />
//                 <FaFileExcel style={{ color: "green" }} />
//               </label>
//             </li>
//             <li>
//               <button type="button" className="icon-btn" title="Export Excel">
//                 <FaFileExcel />
//               </button>
//             </li>
//           </div>

//           <div className="d-flex gap-2">
//             <a
//               className="btn btn-primary"
//               data-bs-toggle="modal"
//               data-bs-target="#add-purchase"
//             >
//               <CiCirclePlus className="me-1" />
//               Add Purchase
//             </a>
//             <a
//               className="btn btn-secondary"
//               data-bs-toggle="modal"
//               data-bs-target="#view-notes"
//             >
//               <i data-feather="download" className="me-2" />
//               Import Purchase
//             </a>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header  justify-content-between flex-wrap gap-3">
//             <div className="row ">
//               <div className="col-md-3">
//                 <input
//                   type="text"
//                   name="search"
//                   className="form-control"
//                   placeholder="Search by product, supplier, or reference"
//                   value={filters.search}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-md-3">
//                 <input
//                   type="date"
//                   name="startDate"
//                   className="form-control"
//                   value={filters.startDate}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-md-3">
//                 <input
//                   type="date"
//                   name="endDate"
//                   className="form-control"
//                   value={filters.endDate}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-md-3">
//                 <select
//                   name="status"
//                   className="form-select"
//                   value={filters.status}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">All Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Received">Received</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table datatable text-center align-middle">

//                 <thead className="thead-light text-center">
//                   <tr>
//                     <th>
//                       <label className="checkboxs">
//                         <input type="checkbox" />
//                         <span className="checkmarks" />
//                       </label>
//                     </th>
//                     <th>Supplier</th>
//                     <th>Reference</th>
//                     <th>Date</th>
//                     <th>Products</th>
//                     <th>Qyt</th>
//                     <th>Purchase Price</th>
//                     <th>Discount</th>
//                     <th>Tax(%)</th>
//                     <th>Tax Amount</th>
//                     <th>Shipping Charge</th>
//                     <th>Extra Expense</th>
//                     <th>Unit cost</th>
//                     <th>Total cost</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {purchases.length === 0 ? (
//                     <tr>
//                       <td colSpan="7" className="text-center">
//                         No purchases found.
//                       </td>
//                     </tr>
//                   ) : (
//                     purchases.map((purchase) => (
//                       <tr key={purchase._id}>
//                         <td>
//                           <label className="checkboxs">
//                             <input type="checkbox" />
//                             <span className="checkmarks" />
//                           </label>
//                         </td>
//                         <td>
//                           {purchase.supplier
//                             ? `${purchase.supplier.firstName} ${purchase.supplier.lastName}`
//                             : "N/A"}
//                         </td>
//                         <td>{purchase.referenceNumber}</td>
//                         <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>

//                         <td>
//                           <ul>
//                             {purchase.products.map((p, idx) => (
//                               <li key={idx}>
//                                 {p.product?.productName} - {p.quantity} × {settings.currencySymbol}{convertCurrency(p.purchasePrice)}
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>
//                           <ul>
//                             {purchase.products.map((p, idx) => (
//                               <li key={idx}>
//                                 {p.quantity}  {p.unit}
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>
//                           <ul>
//                             {purchase.products.map((p, idx) => (
//                               <li key={idx}>
//                                 {p.purchasePrice}₹
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>
//                           <ul>
//                             {purchase.products.map((p, idx) => (
//                               <li key={idx}>
//                                 {p.discount} ₹
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>
//                           <ul>
//                             {purchase.products.map((p, idx) => (
//                               <li key={idx}>
//                                 {p.tax} %
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>
//                           <ul>
//                             {purchase.products.map((p, idx) => (
//                               <li key={idx}>
//                                 {/* {p.taxAmount} ₹ */}
//                                 ₹{p.taxAmount || ((p.afterDiscount * p.tax) / 100 || "0.00")}
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>{purchase.shippingCost}</td>
//                         <td>{purchase.orderTax}</td>
//                         <td>
//                           <ul>
//                             {purchase.products.map((p, idx) => (
//                               <li key={idx}>₹{p.unitCost?.toFixed(2) || '0.00'}</li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>
//                           <ul>
//                             {purchase.products.map((p, idx) => (
//                               <li key={idx}>₹{p.totalCost?.toFixed(2) || '0.00'}</li>
//                             ))}
//                           </ul>
//                         </td>



//                         <td>
//                           <span className={`badge ${purchase.status === "Pending" ? "bg-warning" : "bg-success"}`}>
//                             {purchase.status}
//                           </span>
//                         </td>



//                         <td className="action-table-data">
//                           <div className="edit-delete-action">
//                             <a
//                               className="me-2 p-2"
//                               data-bs-toggle="modal"
//                               data-bs-target="#edit-purchase"
//                             >
//                               <TbEdit />
//                             </a>

//                             <a
//                               className="p-2"

//                             >
//                               <TbTrash />
//                             </a>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>

//               </table>
//             </div>
//             {/* Pagination */}
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div>Page {page} of {totalPages}</div>
//               <div className="btn-group">
//                 <button
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() => handlePageChange(page - 1)}
//                   disabled={page === 1}
//                 >
//                   Prev
//                 </button>
//                 <button
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() => handlePageChange(page + 1)}
//                   disabled={page === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>

//         </div>
//         <AddPurchaseModal />
//         <EditPurchaseModal />
//       </div>
//     </div>
//   );
// };

// export default Purchase;
