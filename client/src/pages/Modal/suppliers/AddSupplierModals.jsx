import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Select from "react-select";
import { toast } from 'react-toastify';
import BASE_URL from '../../config/config';

const AddSupplierModals = ({ onClose, onSuccess, editSupplier }) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    businessType: '',
    gstin: '',
    email: '',
    phone: '',
    address: '',
    city: null,
    state: null,
    country: null,
    postalCode: '',
    status: true,
    bank: {
      bankName: '',
      branch: '',
      accountHolder: '',
      accountNumber: '',
      ifsc: '',
    },
  });

  useEffect(() => {
    if (editSupplier) {
      setForm({
        firstName: editSupplier.firstName || '',
        lastName: editSupplier.lastName || '',
        businessType: editSupplier.businessType || '',
        gstin: editSupplier.gstin || '',
        email: editSupplier.email || '',
        phone: editSupplier.phone || '',
        address: editSupplier.address || '',
        city: editSupplier.city ? { value: editSupplier.city._id || editSupplier.city, label: editSupplier.city.cityName || editSupplier.city } : null,
        state: editSupplier.state ? { value: editSupplier.state._id || editSupplier.state, label: editSupplier.state.stateName || editSupplier.state } : null,
        country: editSupplier.country ? { value: editSupplier.country._id || editSupplier.country, label: editSupplier.country.name || editSupplier.country } : null,
        postalCode: editSupplier.postalCode || '',
        status: typeof editSupplier.status === 'boolean' ? editSupplier.status : true,
        bank: editSupplier.bank || {
          bankName: '',
          branch: '',
          accountHolder: '',
          accountNumber: '',
          ifsc: '',
        },
      });
    }
  }, [editSupplier]);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gstDetails, setGstDetails] = useState(null);
  const [gstLoading, setGstLoading] = useState(false);
  const [gstError, setGstError] = useState('');

  const businessTypeOptions = [
    { value: 'Manufacturer', label: 'Manufacturer' },
    { value: 'Wholesaler', label: 'Wholesaler' },
    { value: 'Distributor', label: 'Distributor' }
  ];

  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchCities();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/countries`);
      const formatted = res.data.map((c) => ({ value: c._id, label: c.name }));
      setCountries(formatted);
    } catch {
      toast.error("Failed to fetch countries");
    }
  };

  const fetchStates = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/states`);
      setStates(res.data);
    } catch {
      toast.error("Failed to fetch states");
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/city/cities`);
      setCities(res.data);
    } catch {
      toast.error("Failed to fetch cities");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, option) => {
    setForm((prev) => ({ ...prev, [name]: option }));
    if (name === 'country') {
      const filtered = states
        .filter((s) => s.country._id === option.value)
        .map((s) => ({ value: s._id, label: s.stateName }));
      setFilteredStates(filtered);
      setFilteredCities([]);
      setForm((prev) => ({ ...prev, state: null, city: null }));
    }
    if (name === 'state') {
      const filtered = cities
        .filter((c) => c.state._id === option.value)
        .map((c) => ({ value: c._id, label: c.cityName }));
      setFilteredCities(filtered);
      setForm((prev) => ({ ...prev, city: null }));
    }
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, bank: { ...prev.bank, [name]: value } }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleVerifyGSTIN = async () => {
    setGstLoading(true);
    setGstError('');
    try {
      const res = await axios.post(`${BASE_URL}/api/suppliers/verify-gstin`, {
        gstin: form.gstin
      });

      const data = res.data;
      if (data.valid) {
        const businessTypeMatch = businessTypeOptions.find(
          option => option.value.toLowerCase() === data.businessType?.toLowerCase()
        );

        const stateMatch = states.find(
          s => s.stateName.toLowerCase() === data.state?.toLowerCase()
        );
        const matchedState = stateMatch ? { value: stateMatch._id, label: stateMatch.stateName } : null;

        const matchedCities = cities
          .filter(c => c.state._id === stateMatch?._id)
          .map(c => ({ value: c._id, label: c.cityName }));

        setFilteredStates(states
          .filter(s => s.country._id === form.country?.value)
          .map(s => ({ value: s._id, label: s.stateName }))
        );
        setFilteredCities(matchedCities);

        setForm(prev => ({
          ...prev,
          businessType: businessTypeMatch?.value || prev.businessType,
          address: data.address || prev.address,
          state: matchedState || prev.state,
          city: null,
        }));

        setGstDetails({
          name: data.tradeName || data.legalName,
          address: data.address,
          state: data.state,
          businessType: data.businessType,
          valid: true
        });
      }
    } catch (err) {
      setGstError('GSTIN verification failed');
      setGstDetails(null);
    } finally {
      setGstLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        city: form.city?.value || '',
        state: form.state?.value || '',
        country: form.country?.value || '',
      };

      if (selectedImage) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
        formData.append('image', selectedImage);
        if (editSupplier && editSupplier._id) {
          await axios.put(`${BASE_URL}/api/suppliers/${editSupplier._id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } else {
          await axios.post(`${BASE_URL}/api/suppliers`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }
      } else {
        if (editSupplier && editSupplier._id) {
          await axios.put(`${BASE_URL}/api/suppliers/${editSupplier._id}`, payload);
        } else {
          await axios.post(`${BASE_URL}/api/suppliers`, payload);
        }
      }

      toast.success(editSupplier ? 'Supplier updated successfully!' : 'Supplier created successfully!');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      toast.error(editSupplier ? 'Failed to update supplier' : 'Failed to create supplier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show" id="add-supplier" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4>{editSupplier ? 'Edit Supplier' : 'Add Supplier'}</h4>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Upload Section */}
              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <div className="image-uploads" onClick={handleUploadClick} style={{ cursor: 'pointer' }}>
                  <h5>Click to Upload</h5>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First Name</label>
                  <input type="text" name="firstName" className="form-control" value={form.firstName} onChange={handleInputChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Last Name</label>
                  <input type="text" name="lastName" className="form-control" value={form.lastName} onChange={handleInputChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Business Type</label>
                  <Select
                    options={businessTypeOptions}
                    value={businessTypeOptions.find(opt => opt.value === form.businessType)}
                    onChange={option => handleInputChange({ target: { name: 'businessType', value: option.value } })}
                    placeholder="Select Type"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>GSTIN</label>
                  <div className="d-flex gap-2">
                    <input type="text" name="gstin" className="form-control" value={form.gstin} onChange={handleInputChange} />
                    <button type="button" className="btn btn-outline-primary" onClick={handleVerifyGSTIN} disabled={!form.gstin || gstLoading}>
                      {gstLoading ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                  {gstError && <small className="text-danger">{gstError}</small>}
                  {gstDetails?.valid && (
                    <div className="alert alert-success mt-2">
                      <div><strong>Name:</strong> {gstDetails.name}</div>
                      <div><strong>Address:</strong> {gstDetails.address}</div>
                      <div><strong>State:</strong> {gstDetails.state}</div>
                      <div><strong>Business Type:</strong> {gstDetails.businessType}</div>
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input type="email" name="email" className="form-control" value={form.email} onChange={handleInputChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Phone</label>
                  <input type="text" name="phone" className="form-control" value={form.phone} onChange={handleInputChange} />
                </div>
                <div className="col-md-12 mb-3">
                  <label>Address</label>
                  <input type="text" name="address" className="form-control" value={form.address} onChange={handleInputChange} />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Country</label>
                  <Select options={countries} value={form.country} onChange={(opt) => handleSelectChange('country', opt)} />
                </div>
                <div className="col-md-4 mb-3">
                  <label>State</label>
                  <Select options={filteredStates} value={form.state} onChange={(opt) => handleSelectChange('state', opt)} isDisabled={!form.country} />
                </div>
                <div className="col-md-4 mb-3">
                  <label>City</label>
                  <Select options={filteredCities} value={form.city} onChange={(opt) => handleSelectChange('city', opt)} isDisabled={!form.state} />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Postal Code</label>
                  <input type="text" name="postalCode" className="form-control" value={form.postalCode} onChange={handleInputChange} />
                </div>

                <div className="col-12 border-top pt-3 mt-2">
                  <h6>Bank Details</h6>
                </div>

                <div className="col-md-4 mb-3">
                  <label>Bank Name</label>
                  <input type="text" name="bankName" className="form-control" value={form.bank.bankName} onChange={handleBankChange} />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Branch</label>
                  <input type="text" name="branch" className="form-control" value={form.bank.branch} onChange={handleBankChange} />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Account Holder</label>
                  <input type="text" name="accountHolder" className="form-control" value={form.bank.accountHolder} onChange={handleBankChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Account Number</label>
                  <input type="text" name="accountNumber" className="form-control" value={form.bank.accountNumber} onChange={handleBankChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>IFSC</label>
                  <input type="text" name="ifsc" className="form-control" value={form.bank.ifsc} onChange={handleBankChange} />
                </div>
              </div>

              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" checked={form.status} onChange={() => setForm((prev) => ({ ...prev, status: !prev.status }))} />
                <label className="form-check-label">Status</label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : (editSupplier ? 'Update Supplier' : 'Add Supplier')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierModals;



// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import Select from "react-select";
// import { toast } from 'react-toastify';
// import BASE_URL from '../../config/config';

// const AddSupplierModals = ({ onClose, onSuccess }) => {
//   const fileInputRef = useRef(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     businessType: '',
//     gstin: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: null,
//     state: null,
//     country: null,
//     postalCode: '',
//     status: true,
//     bank: {
//       bankName: '',
//       branch: '',
//       accountHolder: '',
//       accountNumber: '',
//       ifsc: '',
//     },
//   });
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [filteredStates, setFilteredStates] = useState([]);
//   const [filteredCities, setFilteredCities] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [gstDetails, setGstDetails] = useState(null);
//   const [gstLoading, setGstLoading] = useState(false);
//   const [gstError, setGstError] = useState('');

//   // Fetch countries, states, cities on mount
  
//   useEffect(() => {
//     fetchCountries();
//     fetchStates();
//     fetchCities();
//   }, []);


  
//   const fetchCountries = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/countries`);
//       const formatted = res.data.map((c) => ({ value: c._id, label: c.name }));
//       setCountries(formatted);
//     } catch {
//       toast.error("Failed to fetch countries");
//     }
//   };
//   const fetchStates = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/states`);
//       setStates(res.data);
//     } catch {
//       toast.error("Failed to fetch states");
//     }
//   };
//   const fetchCities = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/city/cities`);
//       setCities(res.data);
//     } catch {
//       toast.error("Failed to fetch cities");
//     }
//   };
  

//   // Input handlers
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleVerifyGSTIN = async () => {
//     setGstLoading(true);
//     setGstError('');
//     try {
//       const res = await axios.post(`${BASE_URL}/api/suppliers/verify-gstin`, { gstin: form.gstin });
//       setGstDetails(res.data);
//       // Optionally autofill fields
//       if (res.data.valid) {
//         setForm(prev => ({
//           ...prev,
//           businessType: res.data.businessType || prev.businessType,
//           address: res.data.address || prev.address,
//           state: res.data.state ? { value: '', label: res.data.state } : prev.state,
//           // Add more autofill as needed
//         }));
//       }
//     } catch (err) {
//       setGstError('GSTIN verification failed');
//       setGstDetails(null);
//     } finally {
//       setGstLoading(false);
//     }
//   };
//   const handleSelectChange = (name, option) => {
//     setForm((prev) => ({ ...prev, [name]: option }));
//     if (name === 'country') {
//       const filtered = states.filter((s) => s.country._id === option.value).map((s) => ({ value: s._id, label: s.stateName }));
//       setFilteredStates(filtered);
//       setFilteredCities([]);
//       setForm((prev) => ({ ...prev, state: null, city: null }));
//     }
//     if (name === 'state') {
//       const filtered = cities.filter((c) => c.state._id === option.value).map((c) => ({ value: c._id, label: c.cityName }));
//       setFilteredCities(filtered);
//       setForm((prev) => ({ ...prev, city: null }));
//     }
//   };
 


//   const handleBankChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, bank: { ...prev.bank, [name]: value } }));
//   };







//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload = {
//         firstName: form.firstName,
//         lastName: form.lastName,
//         businessType: form.businessType,
//         gstin: form.gstin,
//         email: form.email,
//         phone: form.phone,
//         address: form.address,
//         city: form.city?.value || '',
//         state: form.state?.value || '',
//         country: form.country?.value || '',
//         postalCode: form.postalCode,
//         status: form.status,
//         bank: form.bank,
//       };
//       // If image is selected, use FormData
//       if (selectedImage) {
//         const formData = new FormData();
//         Object.entries(payload).forEach(([key, value]) => {
//           if (typeof value === 'object' && value !== null) {
//             formData.append(key, JSON.stringify(value));
//           } else {
//             formData.append(key, value);
//           }
//         });
//         formData.append('image', selectedImage);
//         await axios.post(`${BASE_URL}/api/suppliers`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//       } else {
//         await axios.post(`${BASE_URL}/api/suppliers`, payload);
//       }
//       toast.success('Supplier created successfully!');
//       if (onSuccess) onSuccess();
//       if (onClose) onClose();
//     } catch (err) {
//       toast.error('Failed to create supplier');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };
//   const handleUploadClick = (e) => {
//     e.preventDefault();
//     if (fileInputRef.current) fileInputRef.current.click();
//   };


//   const businessTypeOptions = [
//   { value: 'Manufacturer', label: 'Manufacturer' },
//   { value: 'Wholesaler', label: 'Wholesaler' },
//   { value: 'Distributor', label: 'Distributor' }
// ];
//   return (
//     <div className="modal fade show" id="add-supplier"
//       tabIndex="-1"
//       style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//       aria-modal="true"
//       role="dialog">
//       <div className="modal-dialog modal-dialog-centere modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <div className="page-title">
//               <h4>Add Supplier</h4>
//             </div>
//             <button type="button" className="close" aria-label="Close" onClick={onClose}>
//               <span aria-hidden="true">×</span>
//             </button>
//           </div>
//       <form onSubmit={handleSubmit}>
//         <div className="modal-body">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="new-employee-field">
//                 <div className="profile-pic-upload mb-2">
//                   <div className="profile-pic">
//                     <span><i data-feather="plus-circle" className="plus-down-add" />Add Image</span>
//                   </div>
//                   <div className="mb-0">
//                     <div className="image-upload mb-2">
//                       <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
//                       <div className="image-uploads" onClick={handleUploadClick} style={{ cursor: 'pointer' }}>
//                         <h4>Upload Image</h4>
//                       </div>
//                     </div>
//                     <p>JPEG, PNG up to 2 MB</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="mb-3">
//                 <label className="form-label">First Name <span className="text-danger">*</span></label>
//                 <input type="text" className="form-control" name="firstName" value={form.firstName} onChange={handleInputChange} />
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="mb-3">
//                 <label className="form-label">Last Name <span className="text-danger">*</span></label>
//                 <input type="text" className="form-control" name="lastName" value={form.lastName} onChange={handleInputChange} />
//               </div>
//             </div>	
//             {/* <div className="col-lg-6">
//               <div className="mb-3">
//                 <label className="form-label">Business Types <span className="text-danger">*</span></label>
//                 <input type="text" className="form-control" name="businessType" value={form.businessType} onChange={handleInputChange} />
//               </div>
              
//             </div>	 */}
//             <div className="col-lg-6">
//   <div className="mb-3">
//     <label className="form-label">
//       Business Types <span className="text-danger">*</span>
//     </label>
//     <Select
//       name="businessType"
//       options={businessTypeOptions}
//       value={businessTypeOptions.find(option => option.value === form.businessType)}
//       onChange={selectedOption =>
//         handleInputChange({
//           target: { name: 'businessType', value: selectedOption.value }
//         })
//       }
//       isSearchable
//       placeholder="Select Business Type"
//     />
//   </div>
// </div>



//             <div className="col-lg-6">
//               <div className="mb-3">
//                 <label className="form-label">GSTIN <span className="text-danger">*</span></label>
//                 <div className="d-flex align-items-center gap-2">
//                   <input type="text" className="form-control" name="gstin" value={form.gstin} onChange={handleInputChange} />
//                   <button type="button" className="btn btn-outline-primary" style={{whiteSpace:'nowrap'}} onClick={handleVerifyGSTIN} disabled={gstLoading || !form.gstin}>
//                     {gstLoading ? 'Verifying...' : 'Verify GST' }
//                   </button>
//                 </div>
//                 {gstError && <div className="text-danger mt-1">{gstError}</div>}
//                 {gstDetails && gstDetails.valid && (
//                   <div className="alert alert-success mt-2 p-2">
//                     <div><strong>Name:</strong> {gstDetails.name}</div>
//                     <div><strong>Address:</strong> {gstDetails.address}</div>
//                     <div><strong>State:</strong> {gstDetails.state}</div>
//                     <div><strong>Business Type:</strong> {gstDetails.businessType}</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="mb-3">
//                 <label className="form-label">Email <span className="text-danger">*</span></label>
//                 <input type="email" className="form-control" name="email" value={form.email} onChange={handleInputChange} />
//               </div>
//             </div>								
//             <div className="col-lg-6">
//               <div className="mb-3">
//                 <label className="form-label">Phone <span className="text-danger">*</span></label>
//                 <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleInputChange} />
//               </div>
//             </div>									
//             <div className="col-lg-12">
//               <div className="mb-3">
//                 <label className="form-label">Address <span className="text-danger">*</span></label>
//                 <input type="text" className="form-control" name="address" value={form.address} onChange={handleInputChange} />
//               </div>
//             </div>
           
//             <div className="col-lg-6 col-sm-10 col-10">
//               <div className="mb-3">
//                 <label className="form-label">Country <span className="text-danger">*</span></label>
//                 <Select options={countries} value={form.country} onChange={option => handleSelectChange('country', option)} placeholder="Select Country" />
//                         </div>
//             </div>
//             <div className="col-lg-6 col-sm-10 col-10">
//               <div className="mb-3">
//                 <label className="form-label">State <span className="text-danger">*</span></label>
//                 <Select options={filteredStates} value={form.state} onChange={option => handleSelectChange('state', option)} isDisabled={!form.country} placeholder="Select State" />
//               </div>
//             </div>
            
//              <div className="col-lg-6 col-sm-10 col-10">
//               <div className="mb-3">
//                 <label className="form-label">City <span className="text-danger">*</span></label>
//                 <Select options={filteredCities} value={form.city} onChange={option => handleSelectChange('city', option)} isDisabled={!form.state} placeholder="Select City" />
//               </div>
//             </div>
//               <div className="col-lg-6">
//               <div className="mb-3">
//                 <label className="form-label">Postal Code <span className="text-danger">*</span></label>
//                 <input type="text" className="form-control" name="postalCode" value={form.postalCode} onChange={handleInputChange} />
//               </div>
//             </div>


//              <div className="border-top my-2">
//         <h6 className="mb-3 pt-4">Banking Details</h6>
//         <div className="row gx-3">
//           <div className="col-lg-4 col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Bank Name</label>
//               <input type="text" className="form-control" name="bankName" value={form.bank.bankName} onChange={handleBankChange} />
//             </div>
//           </div>
//           <div className="col-lg-4 col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Branch</label>
//               <input type="text" className="form-control" name="branch" value={form.bank.branch} onChange={handleBankChange} />
//             </div>
//           </div>
//           <div className="col-lg-4 col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Account Holder</label>
//               <input type="text" className="form-control" name="accountHolder" value={form.bank.accountHolder} onChange={handleBankChange} />
//             </div>
//           </div>
//           <div className="col-lg-4 col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Account Number</label>
//               <input type="text" className="form-control" name="accountNumber" value={form.bank.accountNumber} onChange={handleBankChange} />
//             </div>
//           </div>
//           <div className="col-lg-4 col-md-6">
//             <div className="mb-3">
//               <label className="form-label">IFSC</label>
//               <input type="text" className="form-control" name="ifsc" value={form.bank.ifsc} onChange={handleBankChange} />
//             </div>
//           </div>
//         </div>
//       </div>
          
//             <div className="col-md-12">
//               <div className="mb-0">
//                 <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
//                   <span className="status-label">Status</span>
//                   {/* <input type="checkbox" id="users5" className="check" checked={form.status} onChange={() => setForm(prev => ({ ...prev, status: !prev.status }))} /> */}
//                   {/* <label htmlFor="users5" className="checktoggle mb-0" /> */}
//                    <div className="form-check form-switch">
//   <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked checked={form.status} onChange={() => setForm(prev => ({ ...prev, status: !prev.status }))}/>
// </div>
//                 </div>

//               </div>	
//             </div>
//           </div>
//         </div>
//         <div className="modal-footer">
//           <button type="button" className="btn me-2 btn-secondary" data-bs-dismiss="modal">Cancel</button>
//           <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Add Supplier'}</button>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>

//   )
// }

// export default AddSupplierModals
