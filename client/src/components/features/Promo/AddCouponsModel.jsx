import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddCouponModal = ({ show, handleClose, onSave, editCoupon = null, mode }) => {
  const isEditMode = mode === "edit";
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    discount: '',
    limit: '',
    valid: '',
    validStatus: '',
    oncePerCustomer: false,
    status: true
  });

  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editCoupon) {
      setFormData({
        name: editCoupon.name || '',
        code: editCoupon.code || '',
        type: editCoupon.type || '',
        discount: editCoupon.discount || '',
        limit: editCoupon.limit || '',
        valid: editCoupon.valid?.split('T')[0] || '',
        validStatus: editCoupon.validStatus || '',
        oncePerCustomer: editCoupon.oncePerCustomer || false,
        status: editCoupon.status ?? true
      });
      setDescription(editCoupon.description || '');
    } else {
      setFormData({
        name: '',
        code: '',
        type: '',
        discount: '',
        limit: '',
        valid: '',
        validStatus: '',
        oncePerCustomer: false,
        status: true
      });
      setDescription('');
    }
  }, [editCoupon, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    const plainDescription = description.replace(/<[^>]*>?/gm, '');
    const finalData = {
      ...formData,
      description: plainDescription
    };
   
    const requiredFields = ['name', 'code', 'type', 'discount', 'limit', 'valid', 'validStatus'];
    const isValid = requiredFields.every(field => finalData[field] && finalData[field].toString().trim() !== '');
    if (!isValid) {
      alert("Please fill all required fields marked with * before submitting.");
      return;
    }

    try {
      const url = editCoupon
        ? `http://localhost:5000/api/coupons/${editCoupon._id}`
        : `http://localhost:5000/api/coupons/`;

      const method = editCoupon ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`Error: ${result.message || 'Failed to save coupon'}`);
        return;
      }

      onSave(); // refresh table
      handleClose();
    } catch (err) {
      console.error("Coupon submission error:", err);
      alert("Something went wrong while saving the coupon.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header className="d-flex justify-content-between align-items-center border-0 pb-0">
        <Modal.Title className="fw-bold">{isEditMode ? "Edit Coupon" : "Add Coupon"}</Modal.Title>
        <Button
          variant="link"
          onClick={handleClose}
          className="fs-4 p-0 m-0"
          style={{
            lineHeight: "1",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            height: "30px",
            width: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <IoMdClose />
        </Button>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Label>Coupon Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter coupon name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <Form.Label>Coupon Code <span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="code"
                type="text"
                placeholder="Enter coupon code"
                value={formData.code}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>Type <span className="text-danger">*</span></Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Choose Type</option>
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </Form.Select>
            </div>

            <div className="col-md-6">
              <Form.Label>Discount <span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="discount"
                type="text"
                placeholder="e.g. 20% or ₹100"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12">
              <Form.Label>Limit <span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="limit"
                type="text"
                placeholder="Enter usage limit"
                value={formData.limit}
                onChange={handleChange}
              />
              <small className="text-muted">Enter 0 for Unlimited</small>
            </div>

            <div className="col-md-6">
              <Form.Label>Valid Until <span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="valid"
                type="date"
                value={formData.valid}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <Form.Label>Status <span className="text-danger">*</span></Form.Label>
              <Form.Select name="validStatus" value={formData.validStatus} onChange={handleChange}>
                <option value="">Choose Type</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </div>

            <div className="col-md-12">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Type the message"
                style={{ height: "120px" }}
              />
            </div>
            <div className="col-md-12 d-flex align-items-center justify-content-between pt-3">
              <Form.Label className="mb-0">Active Status</Form.Label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input bg-success"
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="primary" onClick={handleSave}>
          {isEditMode ? "Edit & Save" : "Add & Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCouponModal;
