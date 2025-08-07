<div className="row">
    <div className="col-md-11 mx-auto">
        {/* Start Breadcrumb */}
        <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
            <div>
                <h6><a href="debit-notes.html" className="d-flex align-items-center "><i className="isax isax-arrow-left me-2" />Debit Note</a></h6>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
                <div className="me-1">
                    <a href="javascript:void(0);" className="btn btn-outline-white d-inline-flex align-items-center">
                        <i className="isax isax-eye me-1" />Preview
                    </a>
                </div>
            </div>
        </div>
        {/* End Breadcrumb */}
        <div className="card">
            <div className="card-body">
                <div className="top-content">
                    <div className="purchase-header mb-3">
                        <h6>Purchase Order Details</h6>
                    </div>
                    <div>
                        {/* start row */}
                        <div className="row justify-content-between">
                            <div className="col-md-6">
                                <div className="purchase-top-content">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Debit Note Id</label>
                                                <input type="text" className="form-control" placeholder={9876543} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Reference Number</label>
                                                <input type="text" className="form-control" defaultValue={1254569} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label">Debit Note Date</label>
                                            <div className="input-group position-relative mb-3">
                                                <input type="text" className="form-control datetimepicker rounded-end" placeholder="25 Mar 2025" />
                                                <span className="input-icon-addon fs-16 text-gray-9">
                                                    <i className="isax isax-calendar-2" />
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0);" className="d-flex align-items-center "><i className="isax isax-add-circle5 me-1 text-primary" />Add
                                                Due Date</a>
                                        </div>
                                    </div>
                                </div>
                            </div>{/* end col */}
                            <div className="col-md-4">
                                <div className="purchase-top-content">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <div className="logo-image">
                                                    <img src="assets/img/invoice-logo.svg" className="invoice-logo-dark" alt="img" />
                                                    <img src="assets/img/invoice-logo-white-2.svg" className="invoice-logo-white" alt="img" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <Select className="select">
                                                    <option>Select Status</option>
                                                    <option>Paid</option>
                                                    <option>Pending</option>
                                                    <option>Cancelled</option>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <select className="select">
                                                    <option>Currency</option>
                                                    <option>$</option>
                                                    <option>€</option>
                                                    <option>₹</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="p-2 border rounded d-flex justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <div className="form-check form-switch me-4">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="enabe_tax" defaultChecked />
                                                        <label className="form-check-label" htmlFor="enabe_tax">Enable Tax</label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <a href="javascript:void(0);"><span className="bg-primary-subtle p-1 rounded"><i className="isax isax-setting-2 text-primary" /></span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>{/* end col */}
                        </div>
                        {/* end row */}
                    </div>
                </div>
                <div className="bill-content pb-0">
                    {/* start row */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card box-shadow-0">
                                <div className="card-header border-0 pb-0">
                                    <h6>Bill From</h6>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Billed By</label>
                                        <select className="select">
                                            <option>Select</option>
                                            <option>Kanakku</option>
                                        </select>
                                    </div>
                                    <div className="p-3 bg-light rounded border">
                                        <div className="d-flex">
                                            <div className="me-3">
                                                <span className="p-2 rounded border"><img src="assets/img/logo-small.svg" alt="image" className="img-fluid" /></span>
                                            </div>
                                            <div>
                                                <h6 className="fs-14 mb-1">Kanakku Invoice Management</h6>
                                                <p className="mb-0">15 Hodges Mews, HP12 3JL, United Kingdom
                                                </p>
                                                <p className="mb-0">Phone : +1 54664 75945</p>
                                                <p className="mb-0">Email : <a href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="5f363139301f3a273e322f333a713c3032">[email&nbsp;protected]</a></p>
                                                <p className="text-dark mb-0">GST : 243E45767889</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{/* end col */}
                        <div className="col-md-6">
                            <div className="card box-shadow-0">
                                <div className="card-header border-0 pb-0">
                                    <h6>Bill To</h6>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <label className="form-label">Vendor Name</label>
                                            <a href="javascript:void(0);" className="d-flex align-items-center"><i className="isax isax-add-circle5 text-primary me-1" />Add
                                                New</a>
                                        </div>
                                        <select className="select">
                                            <option>Select</option>
                                            <option>Timesquare Tech</option>
                                        </select>
                                    </div>
                                    <div className="p-3 bg-light rounded border">
                                        <div className="d-flex">
                                            <div className="me-3">
                                                <span><img src="assets/img/icons/timesquare-icon.svg" alt="image" className="img-fluid rounded" /></span>
                                            </div>
                                            <div>
                                                <h6 className="fs-14 mb-1">Timesquare Tech</h6>
                                                <p className="mb-0">299 Star Trek Drive, Florida, 32405, USA
                                                </p>
                                                <p className="mb-0">Phone : +1 54664 75945</p>
                                                <p className="mb-0">Email : <a href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6900070f06290c11080419050c470a0604">[email&nbsp;protected]</a></p>
                                                <p className="text-dark mb-0">GST : 243E45767889</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{/* end col */}
                    </div>
                    {/* end row */}
                </div>
                <div className="items-details">
                    <div className="purchase-header mb-3">
                        <h6>Items &amp; Details</h6>
                    </div>
                    {/* start row */}
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <h6 className="fs-14 mb-1">Item Type</h6>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Product
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Service
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Products/Services</label>
                                <select className="select">
                                    <option>Select</option>
                                    <option>Nike Jordon</option>
                                    <option>Enter Product Name</option>
                                </select>
                            </div>
                        </div>{/* end col */}
                    </div>
                    {/* end row */}
                    {/* Table list start */}
                    <div className="table-responsive rounded border-bottom-0 border mb-3">
                        <table className="table table-nowrap add-table mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Product/Service</th>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                    <th>Rate</th>
                                    <th>Discount</th>
                                    <th>Tax (%)</th>
                                    <th>Amount</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody className="add-tbody">
                                <tr>
                                    <td>
                                        <input type="text" className="form-control" defaultValue="Nike Jordon" />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue={1} style={{ minWidth: 66 }} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue="Pcs" style={{ minWidth: 66 }} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue="$1360.00" style={{ minWidth: 66 }} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue="0%" style={{ minWidth: 66 }} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue={18} style={{ minWidth: 66 }} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue="$1358.00" style={{ minWidth: 66 }} />
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" className="form-control" defaultValue="Enter Product Name" />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue={0} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue="Unit" />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue={0} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue="0%" />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue={0} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue={0} style={{ minWidth: 66 }} />
                                    </td>
                                    <td>
                                        <div>
                                            <a href="javascript:void(0);" className="text-danger remove-table"><i className="isax isax-close-circle" /></a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Table list end */}
                    <div>
                        <a href="#" className="d-inline-flex align-items-center add-invoice-data"><i className="isax isax-add-circle5 text-primary me-1" />Add New</a>
                    </div>
                </div>
                <div className="extra-info">
                    {/* start row */}
                    <div className="row">
                        <div className="col-md-7">
                            <div className="mb-3">
                                <h6 className="mb-3">Extra Information</h6>
                                <div>
                                    <ul className="nav nav-tabs nav-solid-primary mb-3" role="tablist">
                                        <li className="nav-item me-2" role="presentation">
                                            <a className="nav-link active border fs-12 fw-semibold rounded" data-bs-toggle="tab" data-bs-target="#notes" aria-current="page" href="javascript:void(0);"><i className="isax isax-document-text me-1" />Add Notes</a>
                                        </li>
                                        <li className="nav-item me-2" role="presentation">
                                            <a className="nav-link border fs-12 fw-semibold rounded" data-bs-toggle="tab" data-bs-target="#terms" href="javascript:void(0);"><i className="isax isax-document me-1" />Add Terms &amp; Conditions</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link border fs-12 fw-semibold rounded" data-bs-toggle="tab" data-bs-target="#bank" href="javascript:void(0);"><i className="isax isax-bank me-1" />Bank Details</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active show" id="notes" role="tabpanel">
                                            <label className="form-label">Additional Notes</label>
                                            <textarea className="form-control" defaultValue={""} />
                                        </div>
                                        <div className="tab-pane fade" id="terms" role="tabpanel">
                                            <label className="form-label">Terms &amp; Conditions</label>
                                            <textarea className="form-control" defaultValue={""} />
                                        </div>
                                        <div className="tab-pane fade" id="bank" role="tabpanel">
                                            <label className="form-label">Account</label>
                                            <select className="select">
                                                <option>Select</option>
                                                <option>Andrew - 5225655545555454 (Swiss Bank)</option>
                                                <option>Mark Salween - 4654145644566 (International Bank)</option>
                                                <option>Sophia Martinez - 7890123456789012 (Global Finance)</option>
                                                <option>David Chen - 2345678901234567 (National Bank)</option>
                                                <option>Emily Johnson - 3456789012345678 (Community Credit Union)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{/* end col */}
                        <div className="col-md-5">
                            <ul className="mb-0 ps-0 list-unstyled">
                                <li className="mb-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="fw-semibold fs-14 text-gray-9 mb-0">Amount</p>
                                        <h6 className="fs-14">$ 565</h6>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="fw-semibold fs-14 text-gray-9 mb-0">CGST (9%)</p>
                                        <h6 className="fs-14">$18</h6>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="fw-semibold fs-14 text-gray-9 mb-0">SGST (9%)</p>
                                        <h6 className="fs-14">$18</h6>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <a href="javascript:void(0);" className="d-flex align-items-center "><i className="isax isax-add-circle5 text-primary me-1" />Add Additional Charges</a>
                                </li>
                                <li className="mb-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="fw-semibold fs-14 text-gray-9 mb-0">Discount</p>
                                        <div>
                                            <select className="select">
                                                <option>Select</option>
                                                <option>0 %</option>
                                                <option>1 %</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li className="pb-2 border-gray border-bottom">
                                    <div className="p-2 d-flex justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <div className="form-check form-switch me-4">
                                                <input className="form-check-input" type="checkbox" role="switch" id="enabe_tax1" defaultChecked />
                                                <label className="form-check-label" htmlFor="enabe_tax1">Round Off Total</label>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="fs-14">$596</h6>
                                        </div>
                                    </div>
                                </li>
                                <li className="mt-3 pb-3 border-bottom border-gray">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6>Total (USD)</h6>
                                        <h6>$ 596</h6>
                                    </div>
                                </li>
                                <li className="mt-3 pb-3 border-bottom border-gray">
                                    <h6 className="fs-14 fw-semibold">Total In Words</h6>
                                    <p>Five Hundred &amp; Ninety Six Dollars</p>
                                </li>
                                <li className="mt-3 mb-3">
                                    <div>
                                        <select className="select">
                                            <option>Select Signature</option>
                                            <option>Adrian</option>
                                        </select>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <div className="d-flex align-items-center justify-content-center">
                                        OR
                                    </div>
                                </li>
                                <li className="mb-2">
                                    <div className="mb-3">
                                        <label className="form-label">Signature Name</label>
                                        <input type="text" className="form-control" defaultValue="Adrian" />
                                    </div>
                                </li>
                                <li>
                                    <div className="singnature-upload bg-light d-flex align-items-center justify-content-center">
                                        <div className="drag-upload-btn bg-light position-relative mb-2 fs-14 fw-normal text-gray-5">
                                            <i className="isax isax-image me-1 text-primary" />Upload Image
                                            <input type="file" className="form-control image-sign" multiple />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>{/* end col */}
                    </div>
                    {/* end row */}
                </div>
            </div>{/* end card body */}
            <div className=" card-footer d-flex align-items-center justify-content-between">
                <button type="button" className="btn btn-outline-white">Cancel</button>
                <button type="submit" className="btn btn-primary">Create New</button>
            </div>{/* end card footer */}
        </div>{/* end card */}
    </div>{/* end col */}
</div>