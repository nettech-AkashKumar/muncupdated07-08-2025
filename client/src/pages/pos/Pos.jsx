import React, { useEffect, useRef, useState } from 'react'
import BASE_URL from "../../pages/config/config";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { SlHandbag } from "react-icons/sl";
import { GoPersonAdd } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";

function Pos() {
  const [popup, setPopup] = useState(false);
  const formRef = useRef(null);

  const handlePopupChange = () => {
    setPopup(!popup);
  }

  const closeForm = () => {
    setPopup(false);
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

  const [products, setProducts] = useState([]);
  
  const [activeTabs, setActiveTabs] = useState({});
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/products`);
          setProducts(res.data);
          console.log("Products right:", res.data);
          // Initialize all to "general"
          const initialTabs = res.data.reduce((acc, product) => {
            acc[product._id] = "general";
            return acc;
          }, {});
          setActiveTabs(initialTabs);
        } catch (err) {
          console.error("Failed to fetch products", err);
        }
      };
      fetchProducts();
    }, []);
  

  return (
    <div style={{marginLeft:'-21px',backgroundColor:'#fff'}}>

      {/* Add CSS for loading animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* search & cart */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid #ccc'}}>

        {/* search bar */}
        <div style={{width:'70%',display:'flex',alignItems:'center',borderRight:'1px solid #ccc',}}>
          <IoSearch style={{fontSize:'24px',color:'#333',marginLeft:'10px',color:'#C2C2C2'}} />
          <input type="text" placeholder="Search by its name, sku, hsn code, mrp, sale price, purchase price..." style={{width:'95%',padding:'8px',fontSize:'16px',border:'none',outline:'none',color:'#C2C2C2'}} />
        </div>

        {/* cart */}
        <div style={{width:'30%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0px 20px',}}>
          <div style={{fontSize:'20px',fontWeight:'600'}}>
            Cart
          </div>
          <div style={{display:'flex',gap:'15px',alignItems:'center'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',borderRight:'1px solid #ccc',paddingRight:'15px'}}>
              <SlHandbag/> 
              <span style={{fontSize:'10px'}}>Add Bag</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',borderRight:'1px solid #ccc',paddingRight:'15px'}} onClick={handlePopupChange}>
              <GoPersonAdd/> 
              <span style={{fontSize:'10px'}} >Customer</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer'}}>
              <RiDeleteBinLine/>
              <span style={{fontSize:'10px'}}>Remove All</span>
            </div>
          </div>
        </div>

      </div>

      {/* products & customer billing */}
      <div style={{display:'flex',justifyContent:'space-between',border:'1px solid white',height:'83vh'}}>
        
        {/* products */}
        <div style={{width:'70%',display:'flex',borderRight:'1px solid #ccc',}}>

            {/* category */}
            <div style={{width:'20%',padding:'20px 50px 0px 20px',}}>

              {/* all items*/}
              <div style={{lineHeight:'30px'}}>
                <span style={{color:'#676767'}}><b>All Items</b></span>
                <div style={{display:'flex',flexDirection:'column',marginLeft:'10px',borderLeft:'1px solid #0051CF',backgroundColor:'#F7F7F7',borderRadius:'8px',padding:'2px 5px',fontWeight:'600'}}>
                  All Items
                </div>
              </div>

              {/* categories */}
              <div style={{lineHeight:'30px',marginTop:'10px'}}>
                <span style={{color:'#676767'}}><b>Categories</b></span>
                <div style={{display:'flex',flexDirection:'column',marginLeft:'10px'}}>
                  <span>Grains & Flour</span>
                  <span>Oil & Ghee</span>
                  <span>Rice</span>
                  <span>Salt & Sugar</span>
                  <span>Milk & Diary</span>
                  <span>Noodles & Pasta</span>
                  <span>Sausage & Ketchup</span>
                  <span>Jams & Spreads</span>
                  <span>Snacks & Chips</span>
                  <span>Biscuits & Cookies</span>
                  <span>Tea & Coffee</span>
                </div>
              </div>
            </div>

            {/* details */}
            <div style={{width:'80%',backgroundColor:'#F1F1F1',height:'100%'}}>
              
              {/* products */}
              <div style={{height:'78vh',marginTop:'20px'}}>
              <div className='row' style={{gap:'30px',marginLeft:'30px',overflowY:'auto',}}>
              {products.length === 0 ? (
                <span>No Product Available</span>
              ) : (
              products.map((product) => (
                <div className='col-2' style={{border:'2px solid #E6E6E6',backgroundColor:'white',borderRadius:'16px',padding:'10px'}}>

                  <div style={{display:'flex',justifyContent:'center',backgroundColor:'white',width:'100%',height:'100px',alignItems:'center'}}>
                    {product.images?.[0] && (
                      <img
                        src={product.images[0].url}
                        alt={product.productName}
                        style={{ height: "100%", width: "100%",objectFit:'contain' }}
                      />
                    )}
                  </div>

                  <div>
                    <span style={{color:'#676767',fontSize:'10px'}}>{product.category?.categoryName}</span>
                  </div>

                  <div>
                    <span style={{fontSize:'14px'}}>{product.productName}</span>
                  </div>

                  <div style={{marginTop:'8px',marginBottom:'8px'}}>
                    <div style={{width:'100%',borderTop:'2px dotted #C2C2C2'}}></div>
                  </div>

                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{fontSize:'14px'}}>{product.quantity}{product.unit}</span>
                    <span style={{fontSize:'14px'}}>₹{product.sellingPrice}</span>
                  </div>

                </div>
              )))}
              </div>
              </div>

              {/* footer */}
              <div style={{position:'relative',bottom:'0px',backgroundColor:'white',padding:'10px',width:'100%',display:'flex',justifyContent:'space-around'}}>
                <span>Hold</span>
                <span>SCAN</span>
                <span>Credit Scale</span>
                <span>Transaction</span>
              </div>
            </div>

        </div>
      
        {/* billing */}
        <div style={{width:'30%',display:'flex',justifyContent:'space-between',padding:'0px 20px',}}>
          Aditya
        </div>

      </div>

      {/* popup */}
      {popup && (
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
          }}
          >
          <div ref={formRef} style={{width:'760px',height:'500px',margin:'auto',marginTop:'80px',marginBottom:'80px',padding:'10px 16px',overflowY:'auto'}}>
            <div style={{display:'flex',alignItems:'center',border:'1px solid #E1E1E1',borderRadius:'8px',backgroundColor:'#fff',marginTop:'50px'}}>
              <IoSearch style={{fontSize:'24px',color:'#333',marginLeft:'10px',color:'#C2C2C2'}} />
              <input type="text" placeholder="Search by its name, email, phone number..." style={{width:'90%',padding:'8px',fontSize:'16px',border:'none',outline:'none',color:'#C2C2C2'}} />
            </div>
            <div style={{display:'flex',alignItems:'center',border:'1px solid #E1E1E1',borderRadius:'8px',backgroundColor:'#fff',marginTop:'10px',padding:'0px 10px',cursor:'pointer'}}>
              <GoPersonAdd style={{fontSize:'24px',color:'#333',marginLeft:'10px',color:'#1368EC'}} />
              <div style={{width:'90%',padding:'8px',fontSize:'16px',border:'none',outline:'none',color:'#1368EC'}}>
                Add New Customer
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Pos