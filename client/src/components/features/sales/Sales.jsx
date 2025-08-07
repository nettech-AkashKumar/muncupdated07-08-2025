import React from 'react'
import AddSalesModal from '../../../pages/Modal/SalesModal/AddSalesModal'

const Sales = () => {
  return (
   		<div className="page-wrapper">
  <div className="content">
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>Sales</h4>
          <h6>Manage Your Sales</h6>
        </div>
      </div>
      <ul className="table-top-head">
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img src="assets/img/icons/pdf.svg" alt="img" /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img src="assets/img/icons/excel.svg" alt="img" /></a>
        </li>	
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i className="ti ti-refresh" /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i className="ti ti-chevron-up" /></a>
        </li>
      </ul>
      <div className="page-btn">
        <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-sales-new"><i className="ti ti-circle-plus me-1" />Add Sales</a>
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
          <div className="dropdown me-2">
            <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Customer
            </a>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Carl Evans</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Minerva Rameriz</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Robert Lamon</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Patricia Lewis</a>
              </li>
            </ul>
          </div>
          <div className="dropdown me-2">
            <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Staus
            </a>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Completed</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Pending</a>
              </li>
            </ul>
          </div>
          <div className="dropdown me-2">
            <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Payment Status
            </a>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Paid</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Unpaid</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Overdue</a>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Sort By : Last 7 Days
            </a>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Recently Added</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Ascending</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Desending</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Last Month</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Last 7 Days</a>
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
                <th>Customer</th>
                <th>Reference</th>
                <th>Date</th>
                <th>Status</th>
                <th>Grand Total</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Payment Status</th>
                <th>Biller</th>
                <th />
              </tr>
            </thead>
            <tbody className="sales-list">
              <tr>
                <td>
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                  </label>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <a href="javascript:void(0);" className="avatar avatar-md me-2">
                      <img src="assets/img/users/user-27.jpg" alt="product" />
                    </a>
                    <a href="javascript:void(0);">Afroz</a>
                  </div>
                </td>
                <td>SL001</td>
                <td>24 Jul 2025</td>
                <td><span className="badge badge-success">Completed</span></td>
                <td>$1000</td>
                <td>$1000</td>
                <td>$0.00</td>
                <td><span className="badge badge-soft-success shadow-none badge-xs"><i className="ti ti-point-filled me-1" />Paid</span></td>
                <td>Admin</td>
                <td className="text-center">
                  <a className="action-set" href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">
                    <i className="fa fa-ellipsis-v" aria-hidden="true" />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#sales-details-new"><i data-feather="eye" className="info-img" />Sale Detail</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit-sales-new"><i data-feather="edit" className="info-img" />Edit Sale</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#showpayment"><i data-feather="dollar-sign" className="info-img" />Show Payments</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#createpayment"><i data-feather="plus-circle" className="info-img" />Create Payment</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item"><i data-feather="download" className="info-img" />Download pdf</a>
                    </li>	
                    <li>
                      <a href="javascript:void(0);" className="dropdown-item mb-0" data-bs-toggle="modal" data-bs-target="#delete"><i data-feather="trash-2" className="info-img" />Delete Sale</a>
                    </li>								
                  </ul>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* /product list */}
  </div>
 <AddSalesModal/>
</div>

  )
}

export default Sales
