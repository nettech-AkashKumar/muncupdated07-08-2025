import React, {useState} from 'react'
import DashboardHeader from './DashboardHeader'
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Dashboards = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
   const [showCalendar, setShowCalendar] = useState(false);
  return (
    <div >
        <DashboardHeader/>
         <div style={{paddingTop:"40px", paddingLeft:"20px", paddingRight:"20px"}}>
           <div style={{borderBottom:"1px solid #C2C9D1",paddingBottom:"20px", display:"flex", alignItems:"center", gap:"20px"}}>
           <h1 style={{color:"#0E101A", fontFamily:'"Poppins", sans-serif', fontWeight:"500",fontSize:"32px", padding:"0"}}>Dashboard</h1>
            <div style={{borderBottom:"1px solid #C2C9D1",borderRadius:"8px"}}>
               <div style={{ position: "relative", fontFamily: '"Poppins", sans-serif' }}>
      {/* Main box */}
      <div
        style={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          fontSize: "14px",
          color: "#2E2E2E",
          cursor: "pointer",
        }}
        onClick={() => setShowCalendar((prev) => !prev)}
      >
        {/* Left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            gap: "6px",
            borderRight: "1px solid #ccc",
          }}
        >
          <span>
            {range[0].startDate && range[0].endDate
              ? "Select Time Period"
              : "Select Time Period"}
          </span>
          <span style={{ fontSize: "10px" }}>▼</span>
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            gap: "6px",
          }}
        >
          📅
          <span>
            {format(range[0].startDate, "dd MMM")} -{" "}
            {format(range[0].endDate, "dd MMM")}
          </span>
          <span style={{ fontSize: "10px" }}>▼</span>
        </div>
      </div>

      {/* Calendar */}
      {showCalendar && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            zIndex: 100,
          }}
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
            rangeColors={["#1F7FFF"]}
          />
        </div>
      )}
    </div>
            </div>
         </div>
         </div>
    </div>
  )
}

export default Dashboards