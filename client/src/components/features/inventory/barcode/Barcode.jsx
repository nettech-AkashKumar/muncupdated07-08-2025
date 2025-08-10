import React, { useEffect, useRef, useState } from 'react'
import JsBarcode from "jsbarcode";
import { IoIosSearch } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import axios from 'axios';
import BASE_URL from '../../../../pages/config/config';
import { toast } from 'react-toastify';

function Barcode() {
  const [product, setProduct] = useState({
    productName: "",
    sku: "",
    price: "",
    expiryDate: "",
    quantity: "",
    barcode: "",
    showProductName: false,
    showSku: false,
    showPrice: false,
    showExpiryDate: false,
    showQuantity: false,
  });

  const [numberOfBarcodes, setNumberOfBarcodes] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const formRef = useRef(null);
  const searchRef = useRef(null);

  // Fetch products based on search query
  const searchProducts = async (query) => {
    if (!query || query.length < 2) {
      setProducts([]);
      setShowDropdown(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/products/search?name=${encodeURIComponent(query)}`);
      setProducts(response.data || []);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Failed to search products');
      setProducts([]);
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchProducts(searchQuery);
      } else {
        setProducts([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle product selection
  const handleProductSelect = (selectedProduct) => {
    setSelectedProduct(selectedProduct);
    setProduct(prev => ({
      ...prev,
      productName: selectedProduct.productName || '',
      sku: selectedProduct.sku || '',
      price: selectedProduct.sellingPrice || selectedProduct.retailPrice || '',
      quantity: selectedProduct.quantity || '',
      expiryDate: selectedProduct.expirationDate || '',
      barcode: selectedProduct.itemBarcode || Math.floor(100000000000 + Math.random() * 900000000000).toString(),
    }));
    setSearchQuery(selectedProduct.productName);
    setShowDropdown(false);
    setProducts([]);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear search and selected product
  const clearSearch = () => {
    setSearchQuery('');
    setSelectedProduct(null);
    setProduct({
      productName: "",
      sku: "",
      price: "",
      expiryDate: "",
      quantity: "",
      barcode: "",
      showProductName: false,
      showSku: false,
      showPrice: false,
      showExpiryDate: false,
      showQuantity: false,
    });
    setProducts([]);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'numberOfBarcodes') {
      setNumberOfBarcodes(parseInt(value));
    } else if (name === 'searchQuery') {
      setSearchQuery(value);
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const generateBarcode = () => {
    if (!selectedProduct) {
      toast.error('Please select a product first');
      return;
    }

    const barcodeValue = product.barcode || selectedProduct.itemBarcode || Math.floor(100000000000 + Math.random() * 900000000000).toString();
    
    setProduct((prev) => ({
      ...prev,
      barcode: barcodeValue,
    }));

    // Generate barcodes for all instances
    setTimeout(() => {
      const barcodeCount = numberOfBarcodes || 1;
      for (let i = 0; i < barcodeCount; i++) {
        const barcodeId = `barcode-svg-${i}`;
        const barcodeElement = document.getElementById(barcodeId);
        if (barcodeElement) {
          JsBarcode(barcodeId, barcodeValue, {
            format: "EAN13",
            lineColor: "#000",
            width: 2,
            height: 60,
            displayValue: true,
          });
        }
      }
    }, 100);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setProduct((prev) => ({ ...prev, barcode: "" }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{margin:'0px',padding:'20px',backgroundColor:'#f8f9fa',fontFamily:'sans-serif'}}>
      {/* Add CSS for loading animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* path */}
      <div style={{fontSize:'large'}}>
        <span className="ap-name">Print Barcode</span>
      </div>

      <div style={{maxWidth:'750px',margin:'auto',padding:'16px 32px',fontFamily:'sans-serif',backgroundColor:'#F7F7F7'}}>
        
        <div className="" style={{backgroundColor:'#fff',border:'1px solid #E1E1E1',borderRadius:'8px',padding:'20px',marginBottom:'24px'}}>
            <strong>Estimate Amount</strong>
            
            <div style={{marginTop:'16px'}}>
                <div>Products</div>
                <div ref={searchRef} style={{position:'relative'}}>
                    <div style={{border:'1px solid #ccc',color: "#999797ff", backgroundColor: "#FBFBFB",padding:'6px',borderRadius:'8px',display:'flex',alignItems:'center'}}>
                        <IoIosSearch style={{fontSize:'25px',marginRight:'8px'}}/>
                        <input 
                        type="text" 
                        name="searchQuery"
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder="Search for products..."
                        style={{border:'none',outline:'none',color: "#999797ff", backgroundColor: "#FBFBFB",flex:1}} />
                        {loading && (
                          <div style={{width:'20px',height:'20px',border:'2px solid #f3f3f3',borderTop:'2px solid #3498db',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div>
                        )}
                    </div>
                    
                    {/* Dropdown for search results */}
                    {showDropdown && (
                      <div style={{
                        position:'absolute',
                        top:'100%',
                        left:0,
                        right:0,
                        backgroundColor:'white',
                        border:'1px solid #ccc',
                        borderRadius:'8px',
                        maxHeight:'200px',
                        overflowY:'auto',
                        zIndex:1000,
                        boxShadow:'0 4px 6px rgba(0,0,0,0.1)'
                      }}>
                        {products.length > 0 ? (
                          products.map((productItem) => (
                            <div
                              key={productItem._id}
                              onClick={() => handleProductSelect(productItem)}
                              style={{
                                padding:'10px 15px',
                                cursor:'pointer',
                                borderBottom:'1px solid #f0f0f0',
                                display:'flex',
                                justifyContent:'space-between',
                                alignItems:'center'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f8f9fa';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                              }}
                            >
                              <div>
                                <div style={{fontWeight:'500',color:'#333'}}>{productItem.productName}</div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{padding:'15px',textAlign:'center',color:'#666',fontStyle:'italic'}}>
                            {loading ? 'Searching...' : 'No products found'}
                          </div>
                        )}
                      </div>
                    )}
                </div>
            </div>

            {/* Selected Product Display */}
            {selectedProduct && (
              <div style={{marginTop:'16px',padding:'15px',backgroundColor:'#f8f9fa',borderRadius:'8px',border:'1px solid #e9ecef'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                  <div style={{fontWeight:'600',color:'#495057'}}>Selected Product:</div>
                  <button
                    onClick={clearSearch}
                    style={{
                      background:'#dc3545',
                      color:'white',
                      border:'none',
                      padding:'4px 8px',
                      borderRadius:'4px',
                      fontSize:'12px',
                      cursor:'pointer'
                    }}
                  >
                    Clear
                  </button>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',fontSize:'14px'}}>
                  <div><strong>Name:</strong> {selectedProduct.productName}</div>
                  <div><strong>SKU:</strong> {selectedProduct.sku}</div>
                  <div><strong>Price:</strong> ₹{selectedProduct.sellingPrice || selectedProduct.retailPrice || '0'}</div>
                  <div><strong>Quantity:</strong> {selectedProduct.quantity || '0'}</div>
                  <div><strong>Expiry:</strong> {selectedProduct.expirationDate
                  ? new Date(selectedProduct.expirationDate).toLocaleDateString()
                  : ""}</div>
                  {selectedProduct.itemBarcode && (
                    <div><strong>Barcode:</strong> {selectedProduct.itemBarcode}</div>
                  )}
                </div>
              </div>
            )}

            {!selectedProduct && (
              <div style={{border:'1px solid #ccc',color: "#999797ff", backgroundColor: "white",padding:'40px',borderRadius:'8px',marginTop:'24px',textAlign:'center' }}>
                <AiFillProduct style={{fontSize:'25px'}}/>
                <br/>
                <span style={{color:'#1368EC'}}>Search Product</span><span> to Generate Barcode</span>
              </div>
            )}
        </div>

        <div style={{backgroundColor:'#fff',border:'1px solid #E1E1E1',borderRadius:'8px',padding:'20px',marginBottom:'24px'
        }} >
            <strong>Set Barcode Details</strong>
            
            <div style={{marginTop:'16px'}}>
                
                <div style={{display:'flex',justifyContent:'space-between',gap:'16px' }}>
                    <div style={{width:'100%'}}>
                        <div>Number of Barcode to print</div>
                        <input 
                        type="number" 
                        name="numberOfBarcodes"
                        value={numberOfBarcodes}
                        onChange={handleChange} 
                        min="1"
                        placeholder='01'
                        style={{border:'1px solid #ccc',color: "#999797ff", backgroundColor: "#FBFBFB",padding:'6px',borderRadius:'8px',width:'100%'  }} />
                    </div>

                    <div style={{width:'100%'}}>
                        <div>Lable Formate</div>
                        <select type="text" style={{border:'1px solid #ccc',color: "#999797ff", backgroundColor: "#FBFBFB",padding:'6px',borderRadius:'8px',width:'100%'  }}>
                            <option>Large</option>
                            <option>Mediam</option>
                            <option>Small</option>
                        </select>
                    </div>

                    <div style={{width:'100%'}}>
                        <div>Page Type & Size</div>
                        <select type="text" style={{border:'1px solid #ccc',color: "#999797ff", backgroundColor: "#FBFBFB",padding:'6px',borderRadius:'8px',width:'100%'  }}>
                            <option>Roll</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style={{marginTop:'16px'}}>
                <div>Barcode Content Options</div>
                <div style={{display:'flex',justifyContent:'space-between',gap:'16px'}}>
                    <div style={{display:'flex',gap:'6px'}}>
                        <input type='checkbox' 
                        name="showProductName"
                        checked={product.showProductName}
                        onChange={handleChange} />
                        <span>Product Name</span>
                    </div>
                    <div style={{display:'flex',gap:'6px'}}>
                        <input type='checkbox' 
                        name="showSku"
                        checked={product.showSku}
                        onChange={handleChange} />
                        <span>SKU</span>
                    </div>
                    <div style={{display:'flex',gap:'6px'}}>
                        <input type='checkbox' 
                        name="showPrice"
                        checked={product.showPrice}
                        onChange={handleChange} />
                        <span>Price</span>
                    </div>
                    <div style={{display:'flex',gap:'6px'}}>
                        <input type='checkbox' 
                        name="showExpiryDate"
                        checked={product.showExpiryDate}
                        onChange={handleChange} />
                        <span>Expiry Date</span>
                    </div>

                    {/* Quantity */}
                    <div style={{display:'flex',gap:'6px'}}>
                        <input type='checkbox' 
                        name="showQuantity"
                        checked={product.showQuantity}
                        onChange={handleChange} />
                        <span>Quantity</span>
                    </div>

                </div>
            </div>
        </div>

        <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "10px",
          maxWidth: "645px",
          margin: "auto",
          marginTop: "16px",
        }}
      >
        <button
          style={{
            padding: "6px 12px",
            borderRadius: "5px",
            border: "1px solid #E6E6E6",
            backgroundColor: "#FFFFFF",
            color: "#333",
            cursor: "pointer",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          Cancel
        </button>
        <button 
          onClick={() => {
            setIsFormOpen(true);
            generateBarcode();
          }}
          disabled={!selectedProduct}
          style={{
            padding: "6px 12px",
            borderRadius: "5px",
            border: "1px solid #E6E6E6",
            backgroundColor: selectedProduct ? "#FFFFFF" : "#f5f5f5",
            color: selectedProduct ? "#333" : "#999",
            cursor: selectedProduct ? "pointer" : "not-allowed",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          {selectedProduct ? "Preview" : "Select Product First"}
        </button>
        
        <button
          disabled={!selectedProduct}
          style={{
            padding: "6px 12px",
            borderRadius: "5px",
            border: "1px solid black",
            backgroundColor: selectedProduct ? "black" : "#f5f5f5",
            color: selectedProduct ? "white" : "#999",
            cursor: selectedProduct ? "pointer" : "not-allowed",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          Print
        </button>
        </div>

        {/* Show Barcode SVG */}
        {isFormOpen && (
            <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(199, 197, 197, 0.4)',
            backdropFilter: 'blur(1px)',
            display: 'flex',
            justifyContent: 'center',
            zIndex: '10',
            overflowY: 'auto',
          }}>
                <div ref={formRef} style={{width:'750px',height:'auto',margin:'auto',marginTop:'80px',marginBottom:'80px',backgroundColor:'white',border:'1px solid #E1E1E1',borderRadius:'8px',padding:'10px 16px',display:'flex',overflowY:'auto'}}>
                    <div className='row'>
                          {Array.from({ length: numberOfBarcodes || 1 }).map((_, index) => (
                            
                            <div key={index} className='col-6' style={{height:'auto'}}>
                            <div style={{ marginTop: "10px",border:'2px solid #E6E6E6',borderRadius:'8px',width:'320px',padding:'16px 24px',height:'auto',marginBottom:'10px' }}>
                                
                                {product.showProductName && product.productName && (
                                    <>
                                      <span style={{fontWeight:'600',color:'#333'}}>Product: {product.productName}</span>
                                    </>
                                )}
                                
                                {product.showSku && product.sku && (
                                    <>
                                      <br/>
                                      <span style={{color:'#666'}}>SKU: {product.sku}</span>
                                    </>
                                )}
                                
                                {product.showPrice && product.price && (
                                    <>
                                      <br/><br/>
                                      <span style={{fontWeight:'500',color:'#333'}}>MRP: ₹{product.price}</span>
                                    </>
                                )}
                                <br/>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    {product.showExpiryDate && (
  <>
    <span style={{color:'#666'}}>
      Expiry: {new Date(product.expiryDate).toLocaleDateString() || ""}
    </span>
  </>
)}
                                    {product.showQuantity && product.quantity && (
                                    <>
                                        <span style={{color:'#666'}}>QTY: {product.quantity}</span>
                                    </>
                                    )}
                                </div>
                                <div style={{marginTop:'10px',textAlign:'center'}}>
                                    <span style={{fontWeight:'600',color:'#333'}}>Barcode: {product.barcode}</span>
                                    <br/>
                                    <svg id={`barcode-svg-${index}`}></svg>
                                </div>
                                
                            </div>
                            </div>
                            
                          ))}
                    </div>
                </div>
            </div>
        )}
          
      </div>
    </div>
  )
}

export default Barcode