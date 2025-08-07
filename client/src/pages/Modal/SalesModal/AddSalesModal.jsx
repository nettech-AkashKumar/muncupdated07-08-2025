import React from 'react'
import "../../../styles/purchase/purchase.css";
import "../../../styles/sales/sales.css";


const AddSalesModal = () => {
  return (
   <div className="modal fade" id="add-sales-new">
  <div className="modal-dialog add-centered">
    <div className="modal-content">
      <div className="modal-header">
        <div className="page-title">
          <h4> Add Sales</h4>
        </div>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <form action="https://dreamspos.dreamstechnologies.com/html/template/online-orders.html">
        <div className="card border-0">
          <div className="card-body pb-0">
            <div className="table-responsive no-pagination mb-3">
              <table className="table datanew">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Purchase Price($)</th>
                    <th>Discount($)</th>
                    <th>Tax(%)</th>
                    <th>Tax Amount($)</th>
                    <th>Unit Cost($)</th>
                    <th>Total Cost(%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Customer Name<span className="text-danger ms-1">*</span></label>
                  <div className="row">
                    <div className="col-lg-10 col-sm-10 col-10">
                      <select className="select">
                        <option>Select</option>
                        <option>Carl Evans</option>
                        <option>Minerva Rameriz</option>
                        <option>Robert Lamon</option>
                      </select>
                    </div>
                    <div className="col-lg-2 col-sm-2 col-2 ps-0">
                      <div className="add-icon">
                        <a href="#" className="bg-dark text-white p-2 rounded" data-bs-toggle="modal" data-bs-target="#add_customer"><i data-feather="plus-circle" className="plus" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Date<span className="text-danger ms-1">*</span></label>
                  <div className="input-groupicon calender-input">
                    <i data-feather="calendar" className="info-img" />
                    <input type="text" className="datetimepicker form-control" placeholder="Choose" />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Supplier<span className="text-danger ms-1">*</span></label>
                  <select className="select">
                    <option>Select</option>
                    <option>Apex Computers</option>
                    <option>Beats Headphones</option>
                    <option>Dazzle Shoes</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12 col-sm-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Product<span className="text-danger ms-1">*</span></label>
                  <div className="input-groupicon select-code">
                    <input type="text" className="form-control" placeholder="Please type product code and select" />
                    <div className="addonset">
                      <img src="assets/img/icons/qrcode-scan.svg" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ms-auto">
                <div className="total-order w-100 max-widthauto m-auto mb-4">
                  <ul className="border-1 rounded-2">
                    <li className="border-bottom">
                      <h4 className="border-end">Order Tax</h4>
                      <h5>$ 0.00</h5>
                    </li>
                    <li className="border-bottom">
                      <h4 className="border-end">Discount</h4>
                      <h5>$ 0.00</h5>
                    </li>
                    <li className="border-bottom">
                      <h4 className="border-end">Shipping</h4>
                      <h5>$ 0.00</h5>
                    </li>
                    <li className="border-bottom">
                      <h4 className="border-end">Grand Total</h4>
                      <h5>$ 0.00</h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Order Tax<span className="text-danger ms-1">*</span></label>
                  <div className="input-groupicon select-code">
                    <input type="text" defaultValue={0} className="form-control p-2" />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Discount<span className="text-danger ms-1">*</span></label>
                  <div className="input-groupicon select-code">
                    <input type="text" defaultValue={0} className="form-control p-2" />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Shipping<span className="text-danger ms-1">*</span></label>
                  <div className="input-groupicon select-code">
                    <input type="text" defaultValue={0} className="form-control p-2" />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="mb-3 mb-5">
                  <label className="form-label">Status<span className="text-danger ms-1">*</span></label>
                  <select className="select">
                    <option>Select</option>
                    <option>Completed</option>
                    <option>Inprogress</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary add-cancel me-3" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-primary add-sale">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>

  )
}

export default AddSalesModal
