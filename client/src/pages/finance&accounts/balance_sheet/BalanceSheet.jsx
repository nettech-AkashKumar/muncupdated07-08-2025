import React, { useState,useRef, useEffect } from 'react';
import balancesheet_y from '../../../assets/img/balacesheet-y.png';
import balancesheet_x from '../../../assets/img/balacesheet-x.png';
import './BalanceSheetToggle.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css

import calendarIcon from "../../../assets/img/date.png"; // Use your calendar icon

const BalanceSheet = () => {
  const [view, setView] = useState("landscape");
   const sheetRef = useRef(null); 

  // Handle PDF Download
  const handleDownload = async () => {
    const element = sheetRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF(view === "landscape" ? "l" : "p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("BalanceSheet.pdf");
  };
   const [showCalendar, setShowCalendar] = useState(false);
    const [range, setRange] = useState([
      {
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-03-31"),
        key: "selection",
      },
    ]);
  
    const handleChange = (item) => {
      setRange([item.selection]);
  
    };
  
    const toggleCalendar = () => {
      setShowCalendar(!showCalendar);
    };
    const [values, setValues] = useState({
    bankBalance: 0,
    accountReceivable: 0,
    cashInHand: 0,
    prepaidExpenses: 0,
    property: 0,
    officeEquipment: 0,
    software: 0,
    deposit: 0,
  });

  const [valuesSecond, setValuesSecond] = useState({
    accountpayable: 0,
    outstanding: 0,
    shorttermLoan: 0,
    longtermLoan: 0,
    lease: 0,
  });

  const [valuesThird, setValuesThird] = useState({
    capital: 0,
    retainedEarnings: 0,
    withdrawl: 0,
  });

  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [totalequities, setTotalEquities] = useState(0);

  // recalc totals
  useEffect(() => {
    setTotalAssets(Object.values(values).reduce((a, b) => a + b, 0));
  }, [values]);

  useEffect(() => {
    setTotalLiabilities(Object.values(valuesSecond).reduce((a, b) => a + b, 0));
  }, [valuesSecond]);

  useEffect(() => {
    setTotalEquities(Object.values(valuesThird).reduce((a, b) => a + b, 0));
  }, [valuesThird]);

  // input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value) || 0;

    if (name in values) {
      setValues((prev) => ({ ...prev, [name]: numericValue }));
    } else if (name in valuesSecond) {
      setValuesSecond((prev) => ({ ...prev, [name]: numericValue }));
    } else if (name in valuesThird) {
      setValuesThird((prev) => ({ ...prev, [name]: numericValue }));
    }
  };

  // ⏳ Debounce save to DB when data changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveToDB();
    }, 800); // wait 0.8s after typing stops

    return () => clearTimeout(timeout);
  }, [values, valuesSecond, valuesThird, totalAssets, totalLiabilities, totalequities]);

  const saveToDB = async () => {
    try {
      const payload = {
        assets: values,
        liabilities: valuesSecond,
        equities: valuesThird,
        totals: {
          totalAssets,
          totalLiabilities,
          totalEquities: totalequities,
        },
      };
      await axios.post("http://localhost:5000/api/balancesheet", payload);
      console.log("✅ Auto-saved:", payload);
    } catch (err) {
      console.error("❌ Auto-save failed", err);
    }
  };
  


  const renderTable = () => (
    <div className={`balance-sheet ${view}`} style={{padding:"5px 16px"}}>
      <div className="columnbalancesheet">
        <div className="boxbalancesheet">
          <h3 style={{fontFamily:'"Roboto", sans-serif', fontWeight:"400",fontSize:"16px", color:"#262626"}}>Assets</h3>
          <div className="section-balancesheet">
            <p style={{borderBottom:"1px solid #E6E6E6", margin:"0"}}><strong style={{fontFamily:'"Roboto", sans-serif', fontWeight:"500", fontSize:"16px", color:"#262626"}}>1. Current Assets</strong></p>
            <ul className='ul-balancesheet' style={{fontFamily:'"Roboto", sans-serif', fontWeight:"400", fontSize:"16px", color:"#262626"}}>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) Inventories (Stock in Hand) <span>xxxx</span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(b) Bank Balance <span><input type="number"  name="bankBalance"
                  onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) Account Receivable <span><input type="number" name="accountReceivable"
                  onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) Cash In Hand <span><input type="number"  name="cashInHand"
                  onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) Prepaid Expenses <span><input type="number" name="prepaidExpenses"  onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) Advance to Suppliers <span>xxxx</span></li>
            </ul>
            <p className='m-0' style={{borderBottom:"1px solid #E6E6E6"}}><strong style={{fontFamily:'"Roboto", sans-serif', fontWeight:"500", fontSize:"16px", color:"#262626"}}>2. Non-Current Assets</strong></p>
            <ul className='ul-balancesheet' style={{fontFamily:'"Roboto", sans-serif', fontWeight:"400", fontSize:"16px", color:"#262626"}}>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) Property, Plant & Equipment <span><input type="number" name='property' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(b) Office Equipment <span><input type="number" name='officeEquipment' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(c) Software License / ERP Cost <span><input type="number" name='software' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(d) Security Deposit <span><input type="number" name='deposit' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
            </ul>
          </div>
          <div className="total-row-balancesheet" style={{fontFamily:'"Roboto", sans-serif', fontWeight:"500", fontSize:"16px", color:"#262626"}}>Total Assets - <span>{totalAssets}</span></div>
        </div>
      </div>

      <div className="columnbalancesheet">
        <div className="boxbalancesheet">
          <h3 style={{fontFamily:'"Roboto", sans-serif', fontWeight:"400",fontSize:"16px", color:"#262626"}}>Liabilities</h3>
          <div className="section-balancesheet">
            <p className='m-0' style={{borderBottom:"1px solid #E6E6E6"}}><strong style={{fontFamily:'"Roboto", sans-serif', fontWeight:"500", fontSize:"16px", color:"#262626"}}>1. Current Liabilities</strong></p>
            <ul className='ul-balancesheet' style={{fontFamily:'"Roboto", sans-serif', fontWeight:"400", fontSize:"16px", color:"#262626"}}>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) Account Payable <span><input type="number" name='accountpayable' onChange={handleInputChange}  placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(b) Outstanding Expenses <span><input type="number" name='outstanding' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) GST Payable <span>xxxx</span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) TDS Payable <span>xxxx</span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) Short-Term Loans <span><input type="number" name='shorttermLoan' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
            </ul>
            <p className='m-0' style={{borderBottom:"1px solid #E6E6E6"}}><strong style={{fontFamily:'"Roboto", sans-serif', fontWeight:"500", fontSize:"16px", color:"#262626"}}>2. Non-Current Liabilities</strong></p>
            <ul className='ul-balancesheet' style={{fontFamily:'"Roboto", sans-serif', fontWeight:"400", fontSize:"16px", color:"#262626"}}>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(a) Long-Term Loan <span><input type="number" name='longtermLoan' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>(b) Lease Liabilities <span><input type="number" name='lease' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
            </ul>
          </div>
          <div className="total-row-balancesheet" style={{fontFamily:'"Roboto", sans-serif', fontWeight:"500", fontSize:"16px", color:"#262626"}}>Total Liabilities - <span>{totalLiabilities}</span></div>
        </div>

        <div className="boxbalancesheet">
          <h3 style={{fontFamily:'"Roboto", sans-serif', fontWeight:"400",fontSize:"16px", color:"#262626"}}>Equity</h3>
          <div className="section-balancesheet">
            <ul className='ul-balancesheet' style={{fontFamily:'"Roboto", sans-serif', fontWeight:"400", fontSize:"16px", color:"#262626"}}>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>1. Capital Invested <span><input type="number" name='capital' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>2. Retained Earnings / Reserves <span><input type="number" name='retainedEarnings' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
              <li className='li-balancesheet' style={{borderBottom:"1px solid #E6E6E6"}}>3. Withdrawal <span><input type="number" name='withdrawl' onChange={handleInputChange} placeholder='---' style={{textAlign:"right",border:"none", outline:"none",  backgroundColor: "transparent"}}/></span></li>
            </ul>
          </div>
          <div className="total-row-balancesheet" style={{fontFamily:'"Roboto", sans-serif', fontWeight:"500", fontSize:"16px", color:"#262626"}}>Total Equity - <span>{totalequities}</span></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='d-flex flex-column gap-4'>
      {/* Date Input */}
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
              <span style={{ fontSize: "14px", color: "#333" }}>
                {format(range[0].startDate, "dd/MM/yyyy")} -{" "}
                {format(range[0].endDate, "dd/MM/yyyy")}
              </span>
              <img src={calendarIcon} alt="calendar" style={{ width: "18px", height: "18px" }} />
            </div>
      
            {showCalendar && (
              <div style={{ position: "absolute", zIndex: 999, marginTop: "10px", }}>
                <DateRange
                  editableDateInputs={true}
                  onChange={handleChange}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  rangeColors={["#1368EC"]}
                />
              </div>
            )}
          </div>

      {/* Balance Sheet Header & Controls */}
      <div className="balance-content" style={{
        backgroundColor: "white",
        border: "1px solid #E6E6E6",
        borderRadius: "8px",
        // padding: "10px 16px"
      }}>
        <div className="balansheet-button-content" style={{borderBottom:"1px solid #E6E6E6"}}>
            <div className='d-flex justify-content-between align-items-center' style={{padding:"16px 16px"}}>
              <span style={{ color: "#262626", fontWeight: "500", fontSize: "18px", fontFamily:'"Roboto", sans-serif', fontWeight:"500", fontSize:"18px"}}>
            Balance sheet
          </span>

          <div className='d-flex align-items-center gap-3' >
            <button
              className={`portrait-btn ${view === "portrait" ? "active" : ""}`}
              onClick={() => setView("portrait")}
              style={{
                border: "1px solid #676767",
                borderRadius: "4px",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "3px"
              }}
            >
              <img src={balancesheet_y} alt="portrait" />
            </button>

            <button
              className={`landscape-btn ${view === "landscape" ? "active" : ""}`}
              onClick={() => setView("landscape")}
              style={{
                border: "1px solid #676767",
                borderRadius: "4px",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "3px"
              }}
            >
              <img src={balancesheet_x} alt="landscape" />
            </button>

            <button 
             onClick={handleDownload}
            style={{
              backgroundColor: '#1368EC',
              color: "white",
              borderRadius: "4px",
              border: "none",
              padding: "5px 10px",
              fontFamily:'"Roboto", sans-serif',
              fontWeight:"400",
              fontSize:"16px"
            }}>
              Download
            </button>
          </div>
            </div>
        </div>

        {/* Only one layout rendered based on view */}
        <div className={`sheet ${view}`} ref={sheetRef}>
          {renderTable()}
        </div>
      </div>
    </div>
  );
}

export default BalanceSheet;
