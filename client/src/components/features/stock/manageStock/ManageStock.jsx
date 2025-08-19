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

  // Calculate total quantity, total price, and total return quantity for all stock history (not just current page)
  const [allTotals, setAllTotals] = useState({ totalQuantity: 0, totalPrice: 0, totalReturnQty: 0, availableQty: 0, availablePrice: 0 });

  useEffect(() => {
    fetchStockHistory();
  }, [filters]);

  useEffect(() => {
    // Fetch all logs for global totals (ignore pagination)
    const fetchAllTotals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/stock-history`, {
          params: { ...filters, page: 1, limit: 1000000 }, // large limit to get all
        });
        const allLogs = response.data.logs || [];
        let totalQuantity = 0;
        let totalPrice = 0;
        let totalReturnQty = 0;
        let totalReturnPrice = 0;
        allLogs.forEach(log => {
          const qty = Number(log.quantityChanged) || 0;
          const price = Number(log.priceChanged) || 0;
          if (log.type && log.type.toLowerCase() === 'return') {
            totalReturnQty -= qty;
            totalReturnPrice += price;
          } else {
            totalQuantity += qty;
            totalPrice += price;
          }
        });
        // Available = total - return
        const availableQty = totalQuantity - totalReturnQty;
        const availablePrice = totalPrice - totalReturnPrice;
        setAllTotals({ totalQuantity, totalPrice, totalReturnQty, availableQty, availablePrice });
      } catch (err) {
        setAllTotals({ totalQuantity: 0, totalPrice: 0, totalReturnQty: 0, availableQty: 0, availablePrice: 0 });
      }
    };
    fetchAllTotals();
    // eslint-disable-next-line
  }, [filters.productName, filters.startDate, filters.endDate]);

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

  // Calculate total quantity and total price
  const totalQuantity = logs.reduce((sum, log) => sum + (Number(log.quantityChanged) || 0), 0);
  const totalPrice = logs.reduce((sum, log) => sum + (Number(log.priceChanged) || 0), 0);

  return (
    <div className="container mt-4">
      <h4>Stock History</h4>

      {/* Summary Cards for ALL stock history */}
      <div className="row mb-4">
        <div className="col-md-2">
          <div className="card text-center border-primary">
            <div className="card-body">
              <h6 className="card-title">Total Quantity (All)</h6>
              <h4 className="card-text text-primary">{allTotals.totalQuantity}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-center border-success">
            <div className="card-body">
              <h6 className="card-title">Total Price (All)</h6>
              <h4 className="card-text text-success">₹{allTotals.totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-center border-warning">
            <div className="card-body">
              <h6 className="card-title">Total Return Qty (All)</h6>
              <h4 className="card-text text-warning">{allTotals.totalReturnQty}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center border-info">
            <div className="card-body">
              <h6 className="card-title">Available Quantity (All)</h6>
              <h4 className="card-text text-info">{allTotals.availableQty}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center border-dark">
            <div className="card-body">
              <h6 className="card-title">Available Price (All)</h6>
              <h4 className="card-text text-dark">₹{allTotals.availablePrice.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-body">
              <h6 className="card-title">Total Quantity</h6>
              <h4 className="card-text text-primary">{totalQuantity}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center border-success">
            <div className="card-body">
              <h6 className="card-title">Total Price</h6>
              <h4 className="card-text text-success">₹{totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>

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
            <th>Status</th>
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
              <td>{log.type || "N/A"}</td>
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