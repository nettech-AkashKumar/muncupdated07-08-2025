import React, { useRef, useState } from 'react';
import add1 from '../../../../assets/img/add1.png';
import add2 from '../../../../assets/img/add2.png';
import add3 from '../../../../assets/img/add3.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../../pages/config/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChooseToAddProduct() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedFile(null); // Reset file when changing options
  };


  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);

      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(`${BASE_URL}/api/products/import`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('CSV imported successfully')
        alert('CSV imported successfully')
        console.log('CSV import response:', response.data);
      } catch (error) {
        toast.error('Failed to import CSV')
        console.error('Upload error', error)
      }
    }
  };

  return (
    <div style={{ marginTop: '200px', width: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>How you want to add product?</h2>
      <div className='row' style={{ padding: '0px 250px', marginTop: '24px' }}>
        <div className='col'>
          <div
            style={{
              border: selectedOption === 'manual' ? '2px solid #007bff' : '2px solid #E6E6E6',
              borderRadius: '16px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
            onClick={() => handleOptionClick('manual')}
          >
            <div style={{ margin: '30px 20px' }}>
              <img src={add1} style={{ width: '40px', marginBottom: '50px' }} />
              <h5>Add Product Manually</h5>
              <span style={{ color: '#676767' }}>You can Import the product manually.</span>
            </div>
          </div>
        </div>
        <div className='col'>
          <div
            style={{
              border: selectedOption === 'bulk' ? '2px solid #007bff' : '2px solid #E6E6E6',
              borderRadius: '16px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
            onClick={() => handleOptionClick('bulk')}
          >
            <div style={{ margin: '30px 20px' }}>
              <img src={add2} style={{ width: '40px', marginBottom: '50px' }} />
              <h5>Import Bulk Product</h5>
              <span style={{ color: '#676767' }}>Upload a supported file for bulk upload.</span>
            </div>
          </div>
        </div>
        <div className='col'>
          <div
            style={{
              border: selectedOption === 'scan' ? '2px solid #007bff' : '2px solid #E6E6E6',
              borderRadius: '16px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
            onClick={() => handleOptionClick('scan')}
          >
            <div style={{ margin: '30px 20px' }}>
              <img src={add3} style={{ width: '40px', marginBottom: '25px' }} />
              <h5>Scan To Add</h5>
              <span style={{ color: '#676767' }}>Scan the product to quickly add it to your inventory.</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        {selectedOption === 'bulk' ? (
          <div>
            <button
              onClick={handleClick}
              style={{
                padding: '6px 16px',
                backgroundColor: selectedOption ? '#007bff' : '#E6E6E6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'none'
              }}>
              Continue
            </button>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              style={{
                display: 'none',
              }}
              accept={selectedOption === 'bulk' ? '.csv,.xlsx' : 'image/*'}
            />
          </div>
        ) : selectedOption === 'scan' ? (
           <Link 
      to="/scan-product"
      style={{ 
        padding: '7px 16px', 
        backgroundColor: '#007bff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        fontSize: '14px',
        textDecoration: 'none'
      }}
    >
      Continue
    </Link> 
        ) :
          (
            <div>
              <Link
                to="/add-product"
                style={{
                  padding: '7px 16px',
                  backgroundColor: selectedOption ? '#007bff' : '#E6E6E6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                Continue
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}

export default ChooseToAddProduct;