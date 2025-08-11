import React,{useState} from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css
import calendarIcon from "../../../assets/img/date.png";
// import logotable from '../assets/Image/logotable.png' 
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";




const data = [
   { date: "12 Jul 2025", title:"Electricity", notes: "Short Circuit", paymentMode: "UPI", paidTo: "Shop", status: "Pending",amount:"₹3839" },
   { date: "13 Jul 2025", title: "Bulb", notes: "Short Circuit", paymentMode: "UPI", paidTo: "Shop", status: "Paid",amount:"₹3839" },
   { date: "12 Jul 2025", title: "Bulb", notes: "Short Circuit", paymentMode: "UPI", paidTo: "---", status: "Pending",amount:"₹3839" },
   { date: "12 Jul 2025", title: "Bulb", notes: "Short Circuit", paymentMode: "UPI", paidTo: "---", status: "Paid",amount:"₹3839" },
   { date: "1 Jul 2025", title: "Bulb", notes: "Short Circuit", paymentMode: "Cash", paidTo: "Shop", status: "Pending",amount:"₹3839" },
   { date: "14 Jul 2025", title: "Bulb", notes: "Short Circuit", paymentMode: "Cheque", paidTo: "Shop", status: "Paid",amount:"₹3839.4" },
   { date: "15 Jul 2025", title: "Bulb", notes: "Short Circuit", paymentMode: "UPI", paidTo: "Shop", status: "Pending",amount:"₹3839.5" },
   { date: "16 Jul 2025", title: "Bulb", notes: "Short Circuit", paymentMode: "UPI", paidTo: "---", status: "Paid",amount:"5839" },
   { date: "12 Jul 2025", title: "Bulb", notes: "Short Circuit", paymentMode: "UPI", paidTo: "---", status: "Pending",amount:"₹3839" },
   { date: "12 Jul 2025", title: "Bulb", notes: "Short Circuit", paymentMode: "Check", paidTo: "---", status: "Paid",amount:"₹3839" },
];
const ExpenseReport = () => {
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
       const handleExport = () => {
        // Convert JSON data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
      
        // Create workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "OverdueReport");
      
        // Write the workbook and save as Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "OverdueReport.xlsx");
      };
  return (
    <div style={{ backgroundColor: "white", border: "1px solid #E6E6E6" }}>
      <div
        style={{
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{fontFamily: '"Roboto", sans-serif',fontWeight:"500", color:"#262626", fontSize:"18px"}}>Expense Report</span>
        <div style={{display:"flex",gap:"10px"}}>
          <button
            onClick={handleExport}
            style={{
              border: "none",
              backgroundColor: "#FFFFFF",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              borderRadius: "4px",
              padding: "5px 8px",
              color: "#676767",
              fontSize: "16px",
              fontWeight: "400",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Export
          </button>
           <Link to="/add_expenses"><button
            style={{
              border: "1px solid #1450AE",
              backgroundColor: "#1368EC",
              color: "white",
              fontFamily: '"Roboto", sans-serif',
              fontSize: "16px",
              fontWeight: "400",
              borderRadius: "5px",
              padding: "5px 5px",
            }}
          >
            Add Expenses
          </button></Link>
        </div>
      </div>
       <div style={{border:"1px solid #E6E6E6"}}></div>
       <div className="d-flex justify-content-between align-items-center" style={{padding:"15px 20px"}}>
         <div style={{ fontFamily: '"Roboto", sans-serif', fontWeight: "400", fontSize: "16px" }}>
             <button style={{ border: "none", backgroundColor: "#E6E6E6", color: "#262626", padding: "3px 7px" }}>All</button>
               <button style={{ border: "none", backgroundColor: "white", color: "#262626", padding: "3px 7px" }}>Pending</button>
               <button style={{ border: "none", backgroundColor: "white", color: "#262626", padding: "3px 7px" }}>Paid</button>
         </div>
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
                  <div style={{ position: "absolute", zIndex: 999, marginTop: "10px", right:"50px" }}>
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
       </div>
         <div className="table-container">
                   <table className='w-100' >
                      <thead style={{ backgroundColor: "#F1F1F1",color:"#676767", fontFamily: '"Roboto", sans-serif',fontWeight:"400",fontSize:"16px" }}>
                         <tr >
                            <th style={{ padding: "15px 20px" }}><input type="checkbox" /></th>
                            <th style={{ padding: "15px 20px" }}>Date</th>
                            <th style={{ padding: "15px 20px" }}>Title</th>
                            <th style={{ padding: "15px 20px" }}>Notes</th>
                            <th style={{ padding: "15px 20px" }}>Payment Mode</th>
                            <th style={{ padding: "15px 20px" }}>Paid To</th>
                            <th style={{ padding: "15px 20px" }}>Status</th>
                            <th style={{ padding: "15px 20px" }}>Amount</th>
                         </tr>
                      </thead>
                      <tbody style={{color:"#262626", fontFamily: '"Roboto", sans-serif',fontWeight:"400",fontSize:"16px" }}>
                         {data.map((item, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #E6E6E6" }}>
                               <td style={{ padding: "10px 20px" }}><input type="checkbox" /></td>
                               <td style={{ padding: "10px 20px" }}>
                                  {item.date}
                               </td>
                               <td style={{ padding: "10px 20px" }}>{item.title}</td>
                               <td style={{ padding: "10px 20px" }}>{item.notes}</td>
                               <td style={{ padding: "10px 20px" }}>{item.paymentMode}</td>
                               <td style={{ padding: "10px 20px" }}>{item.paidTo}</td>
                               <td style={{ padding: "10px 20px", }}><span style={{ padding:"5px",borderRadius:"5px",
                                  backgroundColor: item.status === "Pending" ? "#FDFFE4" : item.status === "Paid" ? "#DFFFE0" : "",
                                  color: item.status === "Pending" ? "#636D1D" : item.status === "Paid" ? "#1E4921" : ""
                               }}>{item.status}</span></td>
                               <td style={{ padding: "10px 20px" }}>{item.amount}</td>
                            </tr>
                         ))}
       
                      </tbody>
                   </table>
                </div>
                 
                  <div className="d-flex justify-content-end gap-3" style={{ padding: "10px 20px"}}>
                           <span style={{
                             backgroundColor: "white", boxShadow: "rgb(0 0 0 / 4%) 0px 3px 8px",
                             padding: "7px", borderRadius: "5px",border:"1px solid #e4e0e0ff"
                           }}>
                              10 <span style={{color:"grey"}}>per page</span>
                           </span>
                           <span style={{
                             backgroundColor: "white", boxShadow: "rgb(0 0 0 / 4%) 0px 3px 8px",
                             padding: "7px", borderRadius: "5px",border:"1px solid #e4e0e0ff"
                           }}>
                             1-4 <span style={{color:"grey"}}>of 4</span>{" "}
                             <button style={{ border: "none", color: "grey", backgroundColor: "white" }}>
                               <GrFormPrevious />
                             </button>{" "}
                             <button style={{ border: "none", backgroundColor: "white" }}>
                               <MdNavigateNext />
                             </button>
                           </span>
                         </div>
    </div>
      
  );
};

export default ExpenseReport;
