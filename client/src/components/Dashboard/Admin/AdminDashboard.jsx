import React from 'react'
// import '../../../styles/dashboard/admindashboard.css'
// import '../../../styles/style.css'


const AdminDashboard = () => {
    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
                    <div className="mb-3">
                        <h1 className="mb-1">Welcome, Admin</h1>
                        <p className="fw-medium">You have <span className="text-primary fw-bold">200+</span> Orders, Today</p>
                    </div>
                    <div className="input-icon-start position-relative mb-3">
                        <span className="input-icon-addon fs-16 text-gray-9">
                            <i className="ti ti-calendar" />
                        </span>
                        <input type="text" className="form-control date-range bookingrange" placeholder="Search Product" />
                    </div>
                </div>
                <div className="alert bg-orange-transparent alert-dismissible fade show mb-4">
                    <div>
                        <span><i className="ti ti-info-circle fs-14 text-orange me-2" />Your Product </span> <span
                            className="text-orange fw-semibold"> Apple Iphone 15 is running Low, </span> already below 5 Pcs.,
                        <a href="javascript:void(0);" className="link-orange text-decoration-underline fw-semibold"
                            data-bs-toggle="modal" data-bs-target="#add-stock">Add Stock</a>
                    </div>
                    <button type="button" className="btn-close text-gray-9 fs-14" data-bs-dismiss="alert"
                        aria-label="Close"><i className="ti ti-x" /></button>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-primary sale-widget flex-fill">
                            <div className="card-body d-flex align-items-center">
                                <span className="sale-icon bg-white text-primary">
                                    <i className="ti ti-file-text fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="text-white mb-1">Total Sales</p>
                                    <div className="d-inline-flex align-items-center flex-wrap gap-2">
                                        <h4 className="text-white">$48,988,078</h4>
                                        <span className="badge badge-soft-primary"><i
                                            className="ti ti-arrow-up me-1" />+22%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-secondary sale-widget flex-fill">
                            <div className="card-body d-flex align-items-center">
                                <span className="sale-icon bg-white text-secondary">
                                    <i className="ti ti-repeat fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="text-white mb-1">Total Sales Return</p>
                                    <div className="d-inline-flex align-items-center flex-wrap gap-2">
                                        <h4 className="text-white">$16,478,145</h4>
                                        <span className="badge badge-soft-danger"><i
                                            className="ti ti-arrow-down me-1" />-22%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-teal sale-widget flex-fill">
                            <div className="card-body d-flex align-items-center">
                                <span className="sale-icon bg-white text-teal">
                                    <i className="ti ti-gift fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="text-white mb-1">Total Purchase</p>
                                    <div className="d-inline-flex align-items-center flex-wrap gap-2">
                                        <h4 className="text-white">$24,145,789</h4>
                                        <span className="badge badge-soft-success"><i
                                            className="ti ti-arrow-up me-1" />+22%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-info sale-widget flex-fill">
                            <div className="card-body d-flex align-items-center">
                                <span className="sale-icon bg-white text-info">
                                    <i className="ti ti-brand-pocket fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="text-white mb-1">Total Purchase Return</p>
                                    <div className="d-inline-flex align-items-center flex-wrap gap-2">
                                        <h4 className="text-white">$18,458,747</h4>
                                        <span className="badge badge-soft-success"><i
                                            className="ti ti-arrow-up me-1" />+22%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* Profit */}
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card revenue-widget flex-fill">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <div>
                                        <h4 className="mb-1">$8,458,798</h4>
                                        <p>Profit</p>
                                    </div>
                                    <span className="revenue-icon bg-cyan-transparent text-cyan">
                                        <i className="fa-solid fa-layer-group fs-16" />
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0"><span className="fs-13 fw-bold text-success">+35%</span> vs Last Month
                                    </p>
                                    <a href="profit-and-loss.html" className="text-decoration-underline fs-13 fw-medium">View
                                        All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Profit */}
                    {/* Invoice */}
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card revenue-widget flex-fill">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <div>
                                        <h4 className="mb-1">$48,988,78</h4>
                                        <p>Invoice Due</p>
                                    </div>
                                    <span className="revenue-icon bg-teal-transparent text-teal">
                                        <i className="ti ti-chart-pie fs-16" />
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0"><span className="fs-13 fw-bold text-success">+35%</span> vs Last Month
                                    </p>
                                    <a href="invoice-report.html" className="text-decoration-underline fs-13 fw-medium">View
                                        All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Invoice */}
                    {/* Expenses */}
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card revenue-widget flex-fill">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <div>
                                        <h4 className="mb-1">$8,980,097</h4>
                                        <p>Total Expenses</p>
                                    </div>
                                    <span className="revenue-icon bg-orange-transparent text-orange">
                                        <i className="ti ti-lifebuoy fs-16" />
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0"><span className="fs-13 fw-bold text-success">+41%</span> vs Last Month
                                    </p>
                                    <a href="expense-list.html" className="text-decoration-underline fs-13 fw-medium">View
                                        All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Expenses */}
                    {/* Returns */}
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card revenue-widget flex-fill">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <div>
                                        <h4 className="mb-1">$78,458,798</h4>
                                        <p>Total Payment Returns</p>
                                    </div>
                                    <span className="revenue-icon bg-indigo-transparent text-indigo">
                                        <i className="ti ti-hash fs-16" />
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0"><span className="fs-13 fw-bold text-danger">-20%</span> vs Last Month
                                    </p>
                                    <a href="sales-report.html" className="text-decoration-underline fs-13 fw-medium">View
                                        All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Returns */}
                </div>
                <div className="row">
                    {/* Sales & Purchase */}
                    <div className="col-xxl-8 col-xl-7 col-sm-12 col-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-primary fs-16 me-2"><i
                                        className="ti ti-shopping-cart" /></span>
                                    <h5 className="card-title mb-0">Sales &amp; Purchase</h5>
                                </div>
                                <ul className="nav btn-group custom-btn-group">
                                    <a className="btn btn-outline-light" href="javascript:void(0);">1D</a>
                                    <a className="btn btn-outline-light" href="javascript:void(0);">1W</a>
                                    <a className="btn btn-outline-light" href="javascript:void(0);">1M</a>
                                    <a className="btn btn-outline-light" href="javascript:void(0);">3M</a>
                                    <a className="btn btn-outline-light" href="javascript:void(0);">6M</a>
                                    <a className="btn btn-outline-light active" href="javascript:void(0);">1Y</a>
                                </ul>
                            </div>
                            <div className="card-body pb-0">
                                <div>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="border p-2 br-8">
                                            <p className="d-inline-flex align-items-center mb-1"><i
                                                className="ti ti-circle-filled fs-8 text-primary-300 me-1" />Total
                                                Purchase</p>
                                            <h4>3K</h4>
                                        </div>
                                        <div className="border p-2 br-8">
                                            <p className="d-inline-flex align-items-center mb-1"><i
                                                className="ti ti-circle-filled fs-8 text-primary me-1" />Total Sales</p>
                                            <h4>1K</h4>
                                        </div>
                                    </div>
                                    <div id="sales-daychart" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Sales & Purchase */}
                    {/* Top Selling Products */}
                    <div className="col-xxl-4 col-xl-5 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-info fs-16 me-2"><i
                                        className="ti ti-info-circle" /></span>
                                    <h5 className="card-title mb-0">Overall Information</h5>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <div className="info-item border bg-light p-3 text-center">
                                            <div className="mb-2 text-info fs-24">
                                                <i className="ti ti-user-check" />
                                            </div>
                                            <p className="mb-1">Suppliers</p>
                                            <h5>6987</h5>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info-item border bg-light p-3 text-center">
                                            <div className="mb-2 text-orange fs-24">
                                                <i className="ti ti-users" />
                                            </div>
                                            <p className="mb-1">Customer</p>
                                            <h5>4896</h5>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info-item border bg-light p-3 text-center">
                                            <div className="mb-2 text-teal fs-24">
                                                <i className="ti ti-shopping-cart" />
                                            </div>
                                            <p className="mb-1">Orders</p>
                                            <h5>487</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer pb-sm-0">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <h5>Customers Overview</h5>
                                    <div className="dropdown dropdown-wraper">
                                        <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="ti ti-calendar me-1" />Today
                                        </a>
                                        <ul className="dropdown-menu p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-sm-5">
                                        <div id="customer-chart" />
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="row gx-0">
                                            <div className="col-sm-6">
                                                <div className="text-center border-end">
                                                    <h2 className="mb-1">5.5K</h2>
                                                    <p className="text-orange mb-2">First Time</p>
                                                    <span
                                                        className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                            className="ti ti-arrow-up-left me-1" />25%</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="text-center">
                                                    <h2 className="mb-1">3.5K</h2>
                                                    <p className="text-teal mb-2">Return</p>
                                                    <span
                                                        className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                            className="ti ti-arrow-up-left me-1" />21%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* Top Selling Products */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-pink fs-16 me-2"><i className="ti ti-box" /></span>
                                    <h5 className="card-title mb-0">Top Selling Products</h5>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-calendar me-1" />Today
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body sell-product">
                                <div className="d-flex align-items-center justify-content-between border-bottom">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-01.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Charger Cable -
                                                Lighting</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>$187</p>
                                                <p>247+ Sales</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center"><i
                                        className="ti ti-arrow-up-left me-1" />25%</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between border-bottom">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-16.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Yves Saint Eau De
                                                Parfum</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>$145</p>
                                                <p>289+ Sales</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center"><i
                                        className="ti ti-arrow-up-left me-1" />25%</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between border-bottom">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-03.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Apple Airpods 2</a>
                                            </h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>$458</p>
                                                <p>300+ Sales</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center"><i
                                        className="ti ti-arrow-up-left me-1" />25%</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between border-bottom">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-04.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Vacuum Cleaner</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>$139</p>
                                                <p>225+ Sales</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="badge bg-outline-danger badge-xs d-inline-flex align-items-center"><i
                                        className="ti ti-arrow-down-left me-1" />21%</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-05.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Samsung Galaxy S21 Fe
                                                5g</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>$898</p>
                                                <p>365+ Sales</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center"><i
                                        className="ti ti-arrow-up-left me-1" />25%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Top Selling Products */}
                    {/* Low Stock Products */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-danger fs-16 me-2"><i
                                        className="ti ti-alert-triangle" /></span>
                                    <h5 className="card-title mb-0">Low Stock Products</h5>
                                </div>
                                <a href="low-stocks.html" className="fs-13 fw-medium text-decoration-underline">View All</a>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-06.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Dell XPS 13</a></h6>
                                            <p className="fs-13">ID : #665814</p>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">Instock</p>
                                        <h6 className="text-orange fw-medium">08</h6>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-07.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Vacuum Cleaner
                                                Robot</a></h6>
                                            <p className="fs-13">ID : #940004</p>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">Instock</p>
                                        <h6 className="text-orange fw-medium">14</h6>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-08.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">KitchenAid Stand
                                                Mixer</a></h6>
                                            <p className="fs-13">ID : #325569</p>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">Instock</p>
                                        <h6 className="text-orange fw-medium">21</h6>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-09.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Levi's Trucker
                                                Jacket</a></h6>
                                            <p className="fs-13">ID : #124588</p>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">Instock</p>
                                        <h6 className="text-orange fw-medium">12</h6>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-0">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-10.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Lay's Classic</a></h6>
                                            <p className="fs-13">ID : #365586</p>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">Instock</p>
                                        <h6 className="text-orange fw-medium">10</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Low Stock Products */}
                    {/* Recent Sales */}
                    <div className="col-xxl-4 col-md-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-pink fs-16 me-2"><i className="ti ti-box" /></span>
                                    <h5 className="card-title mb-0">Recent Sales</h5>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-calendar me-1" />Weekly
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-11.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Apple Watch Series
                                                9</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>Electronics</p>
                                                <p className="text-gray-9">$640</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">Today</p>
                                        <span className="badge bg-purple badge-xs d-inline-flex align-items-center"><i
                                            className="ti ti-circle-filled fs-5 me-1" />Processing</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-12.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Gold Bracelet</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>Fashion</p>
                                                <p className="text-gray-9">$126</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">Today</p>
                                        <span className="badge badge-danger badge-xs d-inline-flex align-items-center"><i
                                            className="ti ti-circle-filled fs-5 me-1" />Cancelled</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-13.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Parachute Down
                                                Duvet</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>Health</p>
                                                <p className="text-gray-9">$69</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">15 Jan 2025</p>
                                        <span className="badge badge-cyan badge-xs d-inline-flex align-items-center"><i
                                            className="ti ti-circle-filled fs-5 me-1" />Onhold</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-14.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">YETI Rambler
                                                Tumbler</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>Sports</p>
                                                <p className="text-gray-9">$65</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">12 Jan 2025</p>
                                        <span className="badge bg-purple badge-xs d-inline-flex align-items-center"><i
                                            className="ti ti-circle-filled fs-5 me-1" />Processing</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-0">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg">
                                            <img src="assets/img/products/product-15.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fw-bold mb-1"><a href="javascript:void(0);">Osmo Genius Starter
                                                Kit</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p>Lifestyles</p>
                                                <p className="text-gray-9">$87.56</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">11 Jan 2025</p>
                                        <span className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                            className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Recent Sales */}
                </div>
                <div className="row">
                    {/* Sales Statics */}
                    <div className="col-xl-6 col-sm-12 col-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-danger fs-16 me-2"><i
                                        className="ti ti-alert-triangle" /></span>
                                    <h5 className="card-title mb-0">Sales Statics</h5>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-calendar me-1" />2025
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">2025</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">2022</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">2021</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body pb-0">
                                <div className="d-flex align-items-center flex-wrap gap-2">
                                    <div className="border p-2 br-8">
                                        <h5 className="d-inline-flex align-items-center text-teal">$12,189<span
                                            className="badge badge-success badge-xs d-inline-flex align-items-center ms-2"><i
                                                className="ti ti-arrow-up-left me-1" />25%</span></h5>
                                        <p>Revenue</p>
                                    </div>
                                    <div className="border p-2 br-8">
                                        <h5 className="d-inline-flex align-items-center text-orange">$48,988,078<span
                                            className="badge badge-danger badge-xs d-inline-flex align-items-center ms-2"><i
                                                className="ti ti-arrow-down-right me-1" />25%</span></h5>
                                        <p>Expense</p>
                                    </div>
                                </div>
                                <div id="sales-statistics" />
                            </div>
                        </div>
                    </div>
                    {/* /Sales Statics */}
                    {/* Recent Transactions */}
                    <div className="col-xl-6 col-sm-12 col-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-orange fs-16 me-2"><i className="ti ti-flag" /></span>
                                    <h5 className="card-title mb-0">Recent Transactions</h5>
                                </div>
                                <a href="online-orders.html" className="fs-13 fw-medium text-decoration-underline">View
                                    All</a>
                            </div>
                            <div className="card-body p-0">
                                <ul className="nav nav-tabs nav-justified transaction-tab">
                                    <li className="nav-item"><a className="nav-link active" href="#sale"
                                        data-bs-toggle="tab">Sale</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#purchase-transaction"
                                        data-bs-toggle="tab">Purchase</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#quotation"
                                        data-bs-toggle="tab">Quotation</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#expenses"
                                        data-bs-toggle="tab">Expenses</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#invoices"
                                        data-bs-toggle="tab">Invoices</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane show active" id="sale">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Customer</th>
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>24 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer16.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6><a href="javascript:void(0);"
                                                                        className="fw-bold">Andrea Willer</a></h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="fs-16 fw-bold text-gray-9">$4,560</td>
                                                    </tr>
                                                    <tr>
                                                        <td>23 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer17.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6><a href="javascript:void(0);"
                                                                        className="fw-bold">Timothy Sandsr</a></h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="fs-16 fw-bold text-gray-9">$3,569</td>
                                                    </tr>
                                                    <tr>
                                                        <td>22 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer18.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6><a href="javascript:void(0);"
                                                                        className="fw-bold">Bonnie Rodrigues</a></h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-pink badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Draft</span>
                                                        </td>
                                                        <td className="fs-16 fw-bold text-gray-9">$4,560</td>
                                                    </tr>
                                                    <tr>
                                                        <td>21 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer15.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6><a href="javascript:void(0);"
                                                                        className="fw-bold">Randy McCree</a></h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="fs-16 fw-bold text-gray-9">$2,155</td>
                                                    </tr>
                                                    <tr>
                                                        <td>21 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer13.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6><a href="javascript:void(0);"
                                                                        className="fw-bold">Dennis Anderson</a></h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="fs-16 fw-bold text-gray-9">$5,123</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="purchase-transaction">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Supplier</th>
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>24 May 2025</td>
                                                        <td>
                                                            <a href="javascript:void(0);" className="fw-semibold">Electro
                                                                Mart</a>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="text-gray-9">$1000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>23 May 2025</td>
                                                        <td>
                                                            <a href="javascript:void(0);" className="fw-semibold">Quantum
                                                                Gadgets</a>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="text-gray-9">$1500</td>
                                                    </tr>
                                                    <tr>
                                                        <td>22 May 2025</td>
                                                        <td>
                                                            <a href="javascript:void(0);" className="fw-semibold">Prime
                                                                Bazaar</a>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-cyan badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Pending</span>
                                                        </td>
                                                        <td className="text-gray-9">$2000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>21 May 2025</td>
                                                        <td>
                                                            <a href="javascript:void(0);" className="fw-semibold">Alpha
                                                                Mobiles</a>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="text-gray-9">$1200</td>
                                                    </tr>
                                                    <tr>
                                                        <td>21 May 2025</td>
                                                        <td>
                                                            <a href="javascript:void(0);" className="fw-semibold">Aesthetic
                                                                Bags</a>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="text-gray-9">$1300</td>
                                                    </tr>
                                                    <tr>
                                                        <td>28 May 2025</td>
                                                        <td>
                                                            <a href="javascript:void(0);" className="fw-semibold">Sigma
                                                                Chairs</a>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="text-gray-9">$1600</td>
                                                    </tr>
                                                    <tr>
                                                        <td>26 May 2025</td>
                                                        <td>
                                                            <a href="javascript:void(0);" className="fw-semibold">A-Z Store
                                                                s</a>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Completed</span>
                                                        </td>
                                                        <td className="text-gray-9">$1100</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="quotation">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Customer</th>
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>24 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer16.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-medium"><a
                                                                        href="javascript:void(0);">Andrea Willer</a></h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Sent</span>
                                                        </td>
                                                        <td className="text-gray-9">$4,560</td>
                                                    </tr>
                                                    <tr>
                                                        <td>23 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer17.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-medium"><a
                                                                        href="javascript:void(0);">Timothy Sandsr</a></h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-warning badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Ordered</span>
                                                        </td>
                                                        <td className="text-gray-9">$3,569</td>
                                                    </tr>
                                                    <tr>
                                                        <td>22 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer18.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-medium"><a
                                                                        href="javascript:void(0);">Bonnie Rodrigues</a>
                                                                    </h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-cyan badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Pending</span>
                                                        </td>
                                                        <td className="text-gray-9">$4,560</td>
                                                    </tr>
                                                    <tr>
                                                        <td>21 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer15.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-medium"><a
                                                                        href="javascript:void(0);">Randy McCree</a></h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-warning badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Ordered</span>
                                                        </td>
                                                        <td className="text-gray-9">$2,155</td>
                                                    </tr>
                                                    <tr>
                                                        <td>21 May 2025</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer13.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-medium"><a
                                                                        href="javascript:void(0);">Dennis Anderson</a>
                                                                    </h6>
                                                                    <span className="fs-13 text-orange">#114589</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Sent</span>
                                                        </td>
                                                        <td className="text-gray-9">$5,123</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="expenses">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Expenses</th>
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>24 May 2025</td>
                                                        <td>
                                                            <h6 className="fw-medium"><a
                                                                href="javascript:void(0);">Electricity Payment</a></h6>
                                                            <span className="fs-13 text-orange">#EX849</span>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Approved</span>
                                                        </td>
                                                        <td className="text-gray-9">$200</td>
                                                    </tr>
                                                    <tr>
                                                        <td>23 May 2025</td>
                                                        <td>
                                                            <h6 className="fw-medium"><a
                                                                href="javascript:void(0);">Electricity Payment</a></h6>
                                                            <span className="fs-13 text-orange">#EX849</span>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Approved</span>
                                                        </td>
                                                        <td className="text-gray-9">$200</td>
                                                    </tr>
                                                    <tr>
                                                        <td>22 May 2025</td>
                                                        <td>
                                                            <h6 className="fw-medium"><a href="javascript:void(0);">Stationery
                                                                Purchase</a></h6>
                                                            <span className="fs-13 text-orange">#EX848</span>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Approved</span>
                                                        </td>
                                                        <td className="text-gray-9">$50</td>
                                                    </tr>
                                                    <tr>
                                                        <td>21 May 2025</td>
                                                        <td>
                                                            <h6 className="fw-medium"><a href="javascript:void(0);">AC Repair
                                                                Service</a></h6>
                                                            <span className="fs-13 text-orange">#EX847</span>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-cyan badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Pending</span>
                                                        </td>
                                                        <td className="text-gray-9">$800</td>
                                                    </tr>
                                                    <tr>
                                                        <td>21 May 2025</td>
                                                        <td>
                                                            <h6 className="fw-medium"><a href="javascript:void(0);">Client
                                                                Meeting</a></h6>
                                                            <span className="fs-13 text-orange">#EX846</span>
                                                        </td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Approved</span>
                                                        </td>
                                                        <td className="text-gray-9">$100</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="invoices">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Customer</th>
                                                        <th>Due Date</th>
                                                        <th>Status</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer16.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-bold"><a
                                                                        href="javascript:void(0);">Andrea Willer</a></h6>
                                                                    <span className="fs-13 text-orange">#INV005</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>24 May 2025</td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Paid</span>
                                                        </td>
                                                        <td className="text-gray-9">$1300</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer17.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-bold"><a
                                                                        href="javascript:void(0);">Timothy Sandsr</a></h6>
                                                                    <span className="fs-13 text-orange">#INV004</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>23 May 2025</td>
                                                        <td><span
                                                            className="badge badge-warning badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Overdue</span>
                                                        </td>
                                                        <td className="text-gray-9">$1250</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer18.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-bold"><a
                                                                        href="javascript:void(0);">Bonnie Rodrigues</a>
                                                                    </h6>
                                                                    <span className="fs-13 text-orange">#INV003</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>22 May 2025</td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Paid</span>
                                                        </td>
                                                        <td className="text-gray-9">$1700</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer15.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-bold"><a
                                                                        href="javascript:void(0);">Randy McCree</a></h6>
                                                                    <span className="fs-13 text-orange">#INV002</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>21 May 2025</td>
                                                        <td><span
                                                            className="badge badge-danger badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Unpaid</span>
                                                        </td>
                                                        <td className="text-gray-9">$1500</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src="assets/img/customer/customer13.jpg"
                                                                        className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-bold"><a
                                                                        href="javascript:void(0);">Dennis Anderson</a>
                                                                    </h6>
                                                                    <span className="fs-13 text-orange">#INV001</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>21 May 2025</td>
                                                        <td><span
                                                            className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                className="ti ti-circle-filled fs-5 me-1" />Paid</span>
                                                        </td>
                                                        <td className="text-gray-9">$1000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Recent Transactions */}
                </div>
                <div className="row">
                    {/* Top Customers */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-orange fs-16 me-2"><i
                                        className="ti ti-users" /></span>
                                    <h5 className="card-title mb-0">Top Customers</h5>
                                </div>
                                <a href="customers.html" className="fs-13 fw-medium text-decoration-underline">View All</a>
                            </div>
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg flex-shrink-0">
                                            <img src="assets/img/customer/customer11.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fs-14 fw-bold mb-1"><a href="javascript:void(0);">Carlos Curran</a>
                                            </h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p className="d-inline-flex align-items-center"><i
                                                    className="ti ti-map-pin me-1" />USA</p>
                                                <p>24 Orders</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h5>$8,9645</h5>
                                    </div>
                                </div>
                                <div
                                    className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg flex-shrink-0">
                                            <img src="assets/img/customer/customer12.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fs-14 fw-bold mb-1"><a href="javascript:void(0);">Stan Gaunter</a>
                                            </h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p className="d-inline-flex align-items-center"><i
                                                    className="ti ti-map-pin me-1" />UAE</p>
                                                <p>22 Orders</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h5>$16,985</h5>
                                    </div>
                                </div>
                                <div
                                    className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg flex-shrink-0">
                                            <img src="assets/img/customer/customer13.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fs-14 fw-bold mb-1"><a href="javascript:void(0);">Richard
                                                Wilson</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p className="d-inline-flex align-items-center"><i
                                                    className="ti ti-map-pin me-1" />Germany</p>
                                                <p>14 Orders</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h5>$5,366</h5>
                                    </div>
                                </div>
                                <div
                                    className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg flex-shrink-0">
                                            <img src="assets/img/customer/customer14.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fs-14 fw-bold mb-1"><a href="javascript:void(0);">Mary Bronson</a>
                                            </h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p className="d-inline-flex align-items-center"><i
                                                    className="ti ti-map-pin me-1" />Belgium</p>
                                                <p>08 Orders</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h5>$4,569</h5>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="avatar avatar-lg flex-shrink-0">
                                            <img src="assets/img/customer/customer15.jpg" alt="img" />
                                        </a>
                                        <div className="ms-2">
                                            <h6 className="fs-14 fw-bold mb-1"><a href="javascript:void(0);">Annie
                                                Tremblay</a></h6>
                                            <div className="d-flex align-items-center item-list">
                                                <p className="d-inline-flex align-items-center"><i
                                                    className="ti ti-map-pin me-1" />Greenland</p>
                                                <p>14 Orders</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h5>$3,5698</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Top Customers */}
                    {/* Top Categories */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-orange fs-16 me-2"><i
                                        className="ti ti-users" /></span>
                                    <h5 className="card-title mb-0">Top Categories</h5>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);"
                                        className="dropdown-toggle btn btn-sm btn-white d-flex align-items-center"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-calendar me-1" />Weekly
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-4 mb-4">
                                    <div>
                                        <canvas id="top-category" height={230} width={200} />
                                    </div>
                                    <div>
                                        <div className="category-item category-primary">
                                            <p className="fs-13 mb-1">Electronics</p>
                                            <h2 className="d-flex align-items-center">698<span
                                                className="fs-13 fw-normal text-default ms-1">Sales</span></h2>
                                        </div>
                                        <div className="category-item category-orange">
                                            <p className="fs-13 mb-1">Sports</p>
                                            <h2 className="d-flex align-items-center">545<span
                                                className="fs-13 fw-normal text-default ms-1">Sales</span></h2>
                                        </div>
                                        <div className="category-item category-secondary">
                                            <p className="fs-13 mb-1">Lifestyles</p>
                                            <h2 className="d-flex align-items-center">456<span
                                                className="fs-13 fw-normal text-default ms-1">Sales</span></h2>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="mb-2">Category Statistics</h6>
                                <div className="border br-8">
                                    <div className="d-flex align-items-center justify-content-between border-bottom p-2">
                                        <p className="d-inline-flex align-items-center mb-0"><i
                                            className="ti ti-square-rounded-filled text-indigo fs-8 me-2" />Total Number
                                            Of Categories</p>
                                        <h5>698</h5>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between p-2">
                                        <p className="d-inline-flex align-items-center mb-0"><i
                                            className="ti ti-square-rounded-filled text-orange fs-8 me-2" />Total Number
                                            Of Products</p>
                                        <h5>7899</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Top Categories */}
                    {/* Order Statistics */}
                    <div className="col-xxl-4 col-md-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-indigo fs-16 me-2"><i
                                        className="ti ti-package" /></span>
                                    <h5 className="card-title mb-0">Order Statistics</h5>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-calendar me-1" />Weekly
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body pb-0">
                                <div id="heat_chart" />
                            </div>
                        </div>
                    </div>
                    {/* /Order Statistics */}
                </div>
            </div>
            {/* */}
        </div>

    )
}

export default AdminDashboard
