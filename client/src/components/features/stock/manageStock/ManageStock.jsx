// src/components/StockHistory.jsx
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../../pages/config/config";
import axios from "axios"; // Make sure axios is imported
import { toast } from "react-toastify";


const StockHistory = () => {
  const [logs, setLogs] = useState([]);

  console.log(logs);

  const [filters, setFilters] = useState({
    productName: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: 1,
    totalRecords: 0,
  });

  useEffect(() => {
    fetchStockHistory();
  }, [filters]);

  const fetchStockHistory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/stock-history`, {
        params: filters,
      });

      const { logs, totalPages, currentPage, totalRecords } = response.data;

      setLogs(logs);
      setPagination({ totalPages, currentPage, totalRecords });
    } catch (error) {
      console.error("Error fetching stock history:", error);
    }
  };

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this log?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/stock-history/${id}`);
      toast.success("Stock history deleted");
      fetchStockHistory(); // refresh
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete log");
    }
  };


  return (
    <div className="container mt-4">
      <h4>Stock History</h4>

      <div className="row mb-3">
        <div className="col-md-3">
          {/* <input
            type="text"
            name="product"
            className="form-control"
            placeholder="Product ID"
            value={filters.product}
            onChange={handleInputChange}
          /> */}
          <input
            type="text"
            name="productName" // <-- should match backend filter
            className="form-control"
            placeholder="Product Name"
            value={filters.productName}
            onChange={handleInputChange}
          />

        </div>

        <div className="col-md-3">
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={filters.startDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-3">
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={filters.endDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product Name</th>
            <th>Product Code</th>
            <th>New Quantity</th>
            <th>new Purchase Price</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{new Date(log.date).toLocaleDateString()}</td>
              <td>{log.product?.productName || "N/A"}</td>
              <td>{log.product?.itemBarcode || "N/A"}</td>
              <td>{log.quantityChanged}</td>
              <td>{log.priceChanged}</td>
              {/* <td>{log.action}</td> */}
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(log)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(log._id)}
                >
                  Delete
                </button>
              </td>


            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <p>Total Records: {pagination.totalRecords}</p>
        <div>
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`btn btn-sm mx-1 ${pagination.currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockHistory;



// import React from 'react'

// const ManageStock = () => {
//   return (
//     <div>ManageStock</div>
//   )
// }

// export default ManageStock