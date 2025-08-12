import React, { useState,useRef,useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { he } from "date-fns/locale";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css

import calendarIcon from "../../../assets/img/date.png"; // Use your calendar icon
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import image from '../../../assets/img/image.png'
import { useNavigate } from 'react-router-dom';


const ExpenseForm = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [file, setFile] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
   const [value, setValue] = useState('');
   
   
    const toggleCalendar = () => {
      setShowCalendar(!showCalendar);
    };
    const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      [{ 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['code-block'],
      ['clean']
    ]
  };
    const [isSaved, setIsSaved] = useState(false); // Tracks if saved
    const navigate = useNavigate();

   const handleSave = () => {
    if (!isSaved) {
      // Your save logic goes here
      setIsSaved(true); // Show "Done"
    } else {
      navigate('/expenseformedit'); // Navigate when already saved
    }
  };

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
   console.log("Selected file:", file)
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    localStorage.setItem("previewImage", imageUrl);
    setFile(file); // Your existing state
  }
};

console.log('njinj uvgb', handleImageUpload)
  


  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline',
    'color', 'background',
    'align',
    'link', 'image', 'video',
    'code-block'
  ];

  const formContainerStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "807px",
    // height:"100vh",
    margin: "10px auto",
    fontFamily: "sans-serif",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    fontFamily:'"Roboto", sans-serif'
  };

  const rowStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "15px",
  };

  const colStyle = {
    flex: 1,
  };

  const formGroupStyle = {
    marginBottom: "15px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    color:"#676767"
  };

  const textAreaStyle = {
    ...inputStyle,
    resize: "none",
    height: "120px",
  };

  const checkboxGroupStyle = {
    display: "flex",
    gap: "15px",
    margin: "8px 0",
  };

  const receiptContainerStyle = {
    marginTop: "20px",
  };

  const uploadBoxStyle = {
    border: "2px dashed #ccc",
    padding: "20px",
    textAlign: "center",
    position: "relative",
    borderRadius: "8px",
    cursor: "pointer",
    width:"100%"
  };

  // const uploadInputStyle = {
  //   position: "absolute",
  //   inset: 0,
  //   opacity: 0,
  //   cursor: "pointer",
  // };

  const uploadContentStyle = {
    zIndex: 2,
  };

  const uploadIconStyle = {
    fontSize: "32px",
    display: "block",
    marginBottom: "10px",
  };

  const browseTextStyle = {
    color: "#007bff",
    cursor: "pointer",
  
  };

  const formActionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  };

  const draftBtnStyle = {
    background: "white",
    border: "none",
    padding: "8px 20px",
    borderRadius: "6px",
    color: "#333",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
  };

  const saveBtnStyle = {
    background: "#262626",
    color: "#fff",
    border: "none",
    padding: "8px 20px",
    borderRadius: "6px",
  };

  return (
    <div>
        <span style={{padding:"0px 10px",}}>
            <Link style={{color:"#676767", fontFamily: '"Roboto", sans-serif',fontWeight:"500", fontSize:"18px", textDecoration:"none"}}>Accounting & Finance</Link>
             <MdOutlineNavigateNext style={{color:"#676767", fontFamily: '"Roboto", sans-serif',fontWeight:"500", fontSize:"18px",}}/>
            <Link  style={{color:"#262626", fontFamily: '"Roboto", sans-serif',fontWeight:"500", fontSize:"18px", textDecoration:"none"}}>Add Expenses</Link>
        </span>
           <div className="succefull-msg" style={{ display: isSaved ? "block" : "none",border:"1px solid #007B42", backgroundColor:"#BAFFDF", padding:"10px 16px", borderRadius:"8px", fontFamily: '"Roboto", sans-serif', margin:"0 auto" ,width:"807px"}}>
            <span>🎉 You Have Successfully Added a new Expense. </span>
           </div>
       
            <div style={formContainerStyle}>
        
      {/* Top Row */}
      <div style={rowStyle}>
        <div style={colStyle}>
          <label style={{color:"#262626", fontSize:"16px", fontWeight:"400"}}>Date</label>
          <div style={checkboxGroupStyle}>
            <label style={{color:"#676767"}}><input type="checkbox" /> Today</label>
            <label style={{color:"#676767"}}><input type="checkbox" /> Yesterday</label>
          </div>
          {/* <input type="date" style={inputStyle} /> */}
          <div style={{ position: "relative", fontFamily: "Arial" }}>
                <div
                  onClick={toggleCalendar}
                  style={{
                    border: "1px solid #E6E6E6",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    width: "250px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    backgroundColor: "white"
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#676767" }}>
                    {/* {format(range[0].startDate, "dd/MM/yyyy")} -{" "}
                    {format(range[0].endDate, "dd/MM/yyyy")} */}
                     End Date
                  </span>
                  <img src={calendarIcon} alt="calendar" style={{ width: "18px", height: "18px" }} />
                </div>
          
                {showCalendar && (
                  <div style={{ position: "absolute", zIndex: 999, marginTop: "10px" }}>
                    <DateRange
                      editableDateInputs={true}
                    //   onChange={handleChange}
                      moveRangeOnFirstSelection={false}
                    //   ranges={range}
                    //   rangeColors={["#1368EC"]}
                    />
                  </div>
                )}
              </div>
        </div>

        <div style={colStyle}>
          <label style={{color:"#262626", fontSize:"16px", fontWeight:"400"}}>Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Expense Title */}
      <div style={formGroupStyle}>
        <label style={{color:"#262626", fontSize:"16px", fontWeight:"400"}}>Expense Title</label>
        <input type="text" placeholder="Product name" style={inputStyle} />
      </div>

      {/* Notes */}
      {/* <div style={formGroupStyle}>
        <label style={{color:"#262626", fontSize:"16px", fontWeight:"400"}}>Notes</label>
        <textarea
          placeholder="Text Here"
          rows={5}
          style={textAreaStyle}
        ></textarea>
      </div> */}
       <div style={{ padding: "10px 0" }}>
      <label  style={{color:"#262626", fontSize:"16px", fontWeight:"400"}}>Notes</label>
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        // fontFamily: "sans-serif",
        backgroundColor: "#fff",
      }}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Text Here"
          style={{height:"230px", border:"none"}}
              
         
        />
      </div>
    </div>

      {/* Payment Mode & Paid To */}
      <div style={rowStyle}>
        <div style={colStyle}>
          <label style={{color:"#262626", fontSize:"16px", fontWeight:"400"}}>Payment Mode</label>
          <input type="text" placeholder="UPI" style={inputStyle} />
        </div>
        <div style={colStyle}>
          <label style={{color:"#262626", fontSize:"16px", fontWeight:"400"}}>Paid To</label>
          <input type="text" placeholder="Shop" style={inputStyle} />
        </div>
      </div>

      {/* Amount */}
      <div style={formGroupStyle}>
        <label style={{color:"#262626", fontSize:"16px", fontWeight:"400"}}>Amount</label>
        <input type="number" placeholder="₹ 0.00" style={inputStyle} />
      </div>

      {/* Receipt Upload */}
      {/* <div style={receiptContainerStyle}>
        <label style={{color:"#262626", fontSize:"16px", fontWeight:"400"}}>Receipt Image</label>
        <div style={uploadBoxStyle}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            // onChange={(e) => setFile(e.target.files[0])}
            onChange={handleImageUpload}
            style={{display:"none"}}
          />
          <div style={uploadContentStyle}>
            <span role="img" aria-label="upload" style={uploadIconStyle}><img src={image} alt="image" /></span>
            <p>Drag your image here, or <span style={browseTextStyle}>browse</span></p>
            <small>Supports JPEG, PNG, JPG</small>
          </div>
        </div>
      </div> */}
      <div style={receiptContainerStyle}>
         <label htmlFor="receipt-upload" style={uploadBoxStyle}>
  <div style={uploadContentStyle}>
    <span role="img" aria-label="upload" style={uploadIconStyle}>
      <img src={image} alt="image" />
    </span>
    <p>Drag your image here, or <span style={browseTextStyle}>browse</span></p>
    <small>Supports JPEG, PNG, JPG</small>
  </div>
</label>

<input
  id="receipt-upload"
  type="file"
  accept="image/png, image/jpeg"
  onChange={handleImageUpload}
  style={{ display: "none" }} // hidden but still functional
/>
      </div>

      {/* Actions */}
      <div style={formActionsStyle}>
          {!isSaved && (
        <button className="draft-btn" style={draftBtnStyle}>Draft</button>
         )}
        <button style={saveBtnStyle} onClick={handleSave}>  {isSaved ? "Done" : "Save"}</button>  
      </div>
    </div>
        </div>
  );
};

export default ExpenseForm;
