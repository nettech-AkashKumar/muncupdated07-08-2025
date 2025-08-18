import React from 'react'
import { IoSearch } from "react-icons/io5";
import { SlHandbag } from "react-icons/sl";
import { GoPersonAdd } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";

function Pos() {
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

        <div style={{width:'70%',display:'flex',alignItems:'center',borderRight:'1px solid #ccc',}}>
          <IoSearch style={{fontSize:'24px',color:'#333',marginLeft:'10px',color:'#C2C2C2'}} />
          <input type="text" placeholder="Search by its name, sku, hsn code, mrp, sale price, purchase price..." style={{width:'95%',padding:'8px',fontSize:'16px',border:'none',outline:'none',color:'#C2C2C2'}} />
        </div>

        <div style={{width:'30%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0px 20px',}}>
          <div style={{}}>
            Cart
          </div>
          <div style={{display:'flex',gap:'15px',alignItems:'center'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',borderRight:'1px solid #ccc',paddingRight:'15px'}}>
              <SlHandbag/> 
              <span style={{fontSize:'10px'}}>Add Bag</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',borderRight:'1px solid #ccc',paddingRight:'15px'}}>
              <GoPersonAdd/> 
              <span style={{fontSize:'10px'}}>Customer</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer'}}>
              <RiDeleteBinLine/>
              <span style={{fontSize:'10px'}}>Remove All</span>
            </div>
          </div>
        </div>

      </div>

      {/* path */}
      <div style={{fontSize:'large',padding:'20px'}}>
        <span className="ap-name">All Items</span>
      </div>

      <div style={{maxWidth:'750px',margin:'auto',padding:'16px 32px',fontFamily:'sans-serif'}}>
      </div>
    </div>
  )
}

export default Pos