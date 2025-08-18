import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import calendar_icon from "../../assets/img/calendar-dash.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import dash_card_icon from "../../assets/img/dahs-card-icon.png";
import line_blue from "../../assets/img/line-blue.png";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
   BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,BarElement, Tooltip, Legend);
import i_icon from "../../assets/img/i.png";
import line_green from "../../assets/img/line-gre.png"
import line_grey from "../../assets/img/line-grey.png"
import time from "../../assets/img/time.png"
import advertisment_dash from "../../assets/img/Advertisement.png"
import line_b from "../../assets/img/line-b.png"
import line_white from "../../assets/img/line-white.png"
import line_yellow from "../../assets/img/line-yellow.png"
import line_yellowlight from "../../assets/img/line-yellowlight.png"
import line_navy from "../../assets/img/line-navy.png"
import line_navylight from "../../assets/img/line-navylight.png"
import { he } from "date-fns/locale";
import p_1 from "../../assets/img/p-1.png"
import p_2 from "../../assets/img/p-2.png"
import p_3 from "../../assets/img/p-3.png"
import p_4 from "../../assets/img/p-4.png"
import p_5 from "../../assets/img/p-5.png"


const styles = {
  card: {
    background: "white",
    border: "1px solid rgb(223 225 227 / 70%)",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    padding: "16px",
    borderRadius: "12px",
    display:"flex",
    flexDirection:"column",
    gap:"20px",
    height:"451px",
    width:"100%"
    
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap:"15px",
    
  },
  title: {
    fontWeight: "600",
    fontSize: "16px",
    color:"#0E101A",
    fontFamily:'"Poppins", sans-serif',
    fontWeight:"600",
    display:"flex",
    alignItems:"center",
    gap:"10px"
  },
  badge: {
    background: "#E5F0FF",
    color: "#1F7FFF",
    padding: "2px 8px",
    borderRadius: "8px",
    fontSize: "12px",
     fontFamily:'"Poppins", sans-serif'
  },
  subtext: {
    fontSize: "14px",
    color: "#6C748C",
    margin: "4px 0 16px 0",
  },
  salesRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  amount: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0",
  },
  currency: {
    fontSize: "12px",
    fontWeight: "400",
    
  },
  label: {
    fontSize: "12px",
    margin: "0",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    fontSize: "12px",
    color: "#666",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontFamily:'"Poppins", sans-serif',
  },
  update: {
     display:"flex",
     alignItems:"center",
     gap:"5px",
     fontFamily:'"Poppins", sans-serif',
  },
};
const Dashboards = () => {
  const products = [
  { id: 1, name: "Product Name", units: "8,987", price: "₹ 78,980", change: "+12.98%", img: p_1},
  { id: 2, name: "Product Name", units: "8,987", price: "₹ 78,980", change: "+12.98%", img: p_2 },
  { id: 3, name: "Product Name", units: "8,987", price: "₹ 78,980", change: "+12.98%", img: p_3 },
  { id: 4, name: "Product Name", units: "8,987", price: "₹ 78,980", change: "+12.98%", img: p_4 },
  { id: 5, name: "Product Name", units: "8,987", price: "₹ 78,980", change: "+12.98%", img: p_5 }
];
    const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Retailer",
        data: [90,50, 150, 60, 120, 70,150, 100], // from your image
        borderColor: "#00a76f",
        backgroundColor: "#00a76f",
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "#00a76f",
        pointBorderWidth: 0
      },
      {
        label: "Wholesaler",
        data: [50,80,30,5,140,170,70], // from your image
        borderColor: "#c4c4c4",
        backgroundColor: "#c4c4c4",
        fill: false,
        pointRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
     
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#6C748C",
          font: { size: 14, family: '"Poppins", sans-serif',weight:500, }
        }
      },
     y: {
  position: "right",
  grid: { display: false },
  min: 0,
  max: 200,
  ticks: {
    stepSize: 50,
    color: "#6C748C",
    font: {
      size: 14,
      weight:500,
      family: '"Poppins", sans-serif'
    },
    callback: (value) => `₹${value}k`
  }
}
    }
  };
   const dataFour = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Stock In",
        data: [90,50, 150, 60, 120, 70,150, 100], // from your image
        borderColor: "#1336AA",
        backgroundColor: "#1336AA",
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "#1336AA",
        pointBorderWidth: 0
      },
      {
        label: "Stock Out",
        data: [50,80,30,5,140,170,70], // from your image
        borderColor: "#c4c4c4",
        backgroundColor: "#c4c4c4",
        fill: false,
        pointRadius: 4,
      }
    ]
  };

  const optionsFour = {
    responsive: true,
    plugins: {
      legend: { display: false },
     
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#6C748C",
          font: { size: 14, family: '"Poppins", sans-serif',weight:500, }
        }
      },
     y: {
  position: "right",
  grid: { display: false },
  min: 0,
  max: 200,
  ticks: {
    stepSize: 50,
    color: "#6C748C",
    font: {
      size: 14,
      weight:500,
      family: '"Poppins", sans-serif'
    },
    callback: (value) => `₹${value}k`
  }
}
    }
  };
   const datas = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Inventory Value",
        data: [90, 160, 180, 110, 100, 150, 60],
        backgroundColor: "#dbeafe", // light blue
        borderRadius: 4,
        
        barPercentage: 0.8,
        categoryPercentage: 0.5
      },
      {
        label: "Inventory",
        data: [140, 10, 50, 100, 200, 190, 150],
        backgroundColor: "#3b82f6", // blue
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.5
      }
    ]
  };

  const optionss= {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false // remove axis border
      },
      ticks: {
        color: "#6C748C",
        font: {
          size: 14,
          weight: 500,
          family: "Poppins, sans-serif"
        }
      }
    },
    y: {
      grid: {
        display: false,
        drawBorder: false // remove axis border
      },
      min: 0,
      max: 200,
      ticks: {
        stepSize: 50,
        color: "#6C748C",
        font: {
          size: 14,
          weight: 500,
          family: "Poppins, sans-serif"
        },
        callback: (value) => `₹${value}k`
      }
    }
  }
};
 const datasThree = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Inventory Value",
        data: [90, 160, 180, 110, 100, 150, 60],
        backgroundColor: "#F9E2D9", 
        borderRadius: 4,
        
        barPercentage: 0.8,
        categoryPercentage: 0.5
      },
      {
        label: "Inventory",
        data: [140, 10, 50, 100, 200, 190, 150],
        backgroundColor: "#FF8F1F", 
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.5
      }
    ]
  };

  const optionssThree= {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false // remove axis border
      },
      ticks: {
        color: "#6C748C",
        font: {
          size: 14,
          weight: 500,
          family: "Poppins, sans-serif"
        }
      }
    },
    y: {
      grid: {
        display: false,
        drawBorder: false // remove axis border
      },
      min: 0,
      max: 200,
      ticks: {
        stepSize: 50,
        color: "#6C748C",
        font: {
          size: 14,
          weight: 500,
          family: "Poppins, sans-serif"
        },
        callback: (value) => `₹${value}k`
      }
    }
  }
};
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <div>
      <DashboardHeader />
      <div
        style={{
          paddingTop: "40px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div
           className="dahsbaord-head-title"
          style={{
            borderBottom: "1px solid #C2C9D1",
            paddingBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <h1
          
            style={{
              color: "#0E101A",
              fontFamily: '"Poppins", sans-serif',
              fontWeight: "500",
              fontSize: "32px",
              padding: "0",
            }}
          >
            Dashboard
          </h1>
          <div className="dahsbaord-select-time-period">
            <div
              style={{
                position: "relative",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              <div
                style={{
                  display: "flex",
                  border: "1px solid #C2C9D1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  fontSize: "14px",
                  color: "#0E101A",
                  cursor: "pointer",
                }}
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                {/* Left */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 12px",
                    gap: "6px",
                    borderRight: "1px solid #C2C9D1",
                  }}
                >
                  <span>
                    {range[0].startDate && range[0].endDate
                      ? "Select Time Period"
                      : "Select Time Period"}
                  </span>
                  <span style={{ fontSize: "16px" }}>
                    <RiArrowDropDownLine />
                  </span>
                </div>

                {/* Right */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 12px",
                    gap: "6px",
                  }}
                >
                  <img src={calendar_icon} alt="" />
                  <span>
                    {format(range[0].startDate, "dd MMM")} -{" "}
                    {format(range[0].endDate, "dd MMM")}
                  </span>
                  <span style={{ fontSize: "16px" }}>
                    <RiArrowDropDownLine />
                  </span>
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
      <div
        className="main-dashboard-container py-5 d-flex flex-column gap-4"
        style={{ paddingRight: "20px", paddingLeft: "20px" }}
      >
        <div className="dashbaord-card-container d-flex flex-column gap-4">
          <div className="d-flex justify-content-between">
            <div
              className="dhasboard-card"
              style={{
                border: "1px solid rgb(223 225 227 / 70%)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: "8px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width:"100%",
                maxWidth: "330px",
                height: "80px",
                padding: "15px 5px",
              }}
            >
              <img src={line_blue} alt="line_blue" />
              <span>
                <p style={{ margin: "0", color: "#727681", fontSize: "14px" }}>
                  Total Inventory Value
                </p>
                <p style={{ margin: "0", color: "#0E101A", fontSize: "22px" }}>
                  21,04,78,980{" "}
                  <span style={{ color: "#0E101A", fontSize: "14px" }}>
                    INR
                  </span>
                </p>
              </span>
              <img
                style={{ width: "24px" }}
                src={dash_card_icon}
                alt="dash_card_icon"
              />
            </div>
            <div
              className="dhasboard-card"
              style={{
                border: "1px solid rgb(223 225 227 / 70%)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: "8px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                 width:"100%",
                maxWidth: "330px",
                height: "80px",
                padding: "15px 5px",
              }}
            >
              <img src={line_blue} alt="line_blue" />
              <span>
                <p style={{ margin: "0", color: "#727681", fontSize: "14px" }}>
                  Total Order
                </p>
                <p style={{ margin: "0", color: "#0E101A", fontSize: "22px" }}>
                  78,980{" "}
                  <span style={{ color: "#0E101A", fontSize: "14px" }}>
                    INR
                  </span>
                </p>
              </span>
              <img
                style={{ width: "24px" }}
                src={dash_card_icon}
                alt="dash_card_icon"
              />
            </div>
            <div
              className="dhasboard-card"
              style={{
                border: "1px solid rgb(223 225 227 / 70%)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: "8px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                 width:"100%",
                maxWidth: "330px",
                height: "80px",
                padding: "15px 5px",
              }}
            >
              <img src={line_blue} alt="line_blue" />
              <span>
                <p style={{ margin: "0", color: "#727681", fontSize: "14px" }}>
                  Average Selling
                </p>
                <p style={{ margin: "0", color: "#0E101A", fontSize: "22px" }}>
                  859,980{" "}
                  <span style={{ color: "#0E101A", fontSize: "14px" }}>
                    INR
                  </span>
                </p>
              </span>
              <img
                style={{ width: "24px" }}
                src={dash_card_icon}
                alt="dash_card_icon"
              />
            </div>
            <div
              className="dhasboard-card"
              style={{
                border: "1px solid rgb(223 225 227 / 70%)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: "8px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                 width:"100%",
                maxWidth: "330px",
                height: "80px",
                padding: "15px 5px",
              }}
            >
              <img src={line_blue} alt="line_blue" />
              <span>
                <p style={{ margin: "0", color: "#727681", fontSize: "14px" }}>
                  Due Payments
                </p>
                <p style={{ margin: "0", color: "#0E101A", fontSize: "22px" }}>
                  978,980{" "}
                  <span style={{ color: "#0E101A", fontSize: "14px" }}>
                    INR
                  </span>
                </p>
              </span>
              <img
                style={{ width: "24px" }}
                src={dash_card_icon}
                alt="dash_card_icon"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div
              className="dhasboard-card"
              style={{
                border: "1px solid rgb(223 225 227 / 70%)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: "8px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                 width:"100%",
                maxWidth: "330px",
                height: "80px",
                padding: "15px 5px",
              }}
            >
              <img src={line_blue} alt="line_blue" />
              <span>
                <p style={{ margin: "0", color: "#727681", fontSize: "14px" }}>
                  Newly Added
                </p>
                <p style={{ margin: "0", color: "#0E101A", fontSize: "22px" }}>
                  106{" "}
                  <span style={{ color: "#0E101A", fontSize: "14px" }}>
                    INR
                  </span>
                </p>
              </span>
              <img
                style={{ width: "24px" }}
                src={dash_card_icon}
                alt="dash_card_icon"
              />
            </div>
            <div
              className="dhasboard-card"
              style={{
                border: "1px solid rgb(223 225 227 / 70%)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: "8px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                 width:"100%",
                maxWidth: "330px",
                height: "80px",
                padding: "15px 5px",
              }}
            >
              <img src={line_blue} alt="line_blue" />
              <span>
                <p style={{ margin: "0", color: "#727681", fontSize: "14px" }}>
                  Low Stocks
                </p>
                <p style={{ margin: "0", color: "#0E101A", fontSize: "22px" }}>
                  107{" "}
                  <span style={{ color: "#0E101A", fontSize: "14px" }}>
                    INR
                  </span>
                </p>
              </span>
              <img
                style={{ width: "24px" }}
                src={dash_card_icon}
                alt="dash_card_icon"
              />
            </div>
            <div
              className="dhasboard-card"
              style={{
                border: "1px solid rgb(223 225 227 / 70%)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: "8px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                 width:"100%",
                maxWidth: "330px",
                height: "80px",
                padding: "15px 5px",
              }}
            >
              <img src={line_blue} alt="line_blue" />
              <span>
                <p style={{ margin: "0", color: "#727681", fontSize: "14px" }}>
                  Out Of Stocks
                </p>
                <p style={{ margin: "0", color: "#0E101A", fontSize: "22px" }}>
                  09{" "}
                  <span style={{ color: "#0E101A", fontSize: "14px" }}>
                    INR
                  </span>
                </p>
              </span>
              <img
                style={{ width: "24px" }}
                src={dash_card_icon}
                alt="dash_card_icon"
              />
            </div>
            <div
              className="dhasboard-card"
              style={{
                border: "1px solid rgb(223 225 227 / 70%)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: "8px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                 width:"100%",
                maxWidth: "330px",
                height: "80px",
                padding: "15px 5px",
              }}
            >
              <img src={line_blue} alt="line_blue" />
              <span>
                <p style={{ margin: "0", color: "#727681", fontSize: "14px" }}>
                  Expiring Soon
                </p>
                <p style={{ margin: "0", color: "#0E101A", fontSize: "22px" }}>
                  21{" "}
                  <span style={{ color: "#0E101A", fontSize: "14px" }}>
                    INR
                  </span>
                </p>
              </span>
              <img
                style={{ width: "24px" }}
                src={dash_card_icon}
                alt="dash_card_icon"
              />
            </div>
          </div>
        </div>
        <div className="graph-container d-flex flex-column gap-3">
          <div className="d-flex justify-content-between">
            <div className="graph-1-dash" style={{width:"100%",maxWidth:"525px",}}>
            <div style={styles.card}>
               <div style={{borderBottom:"1px solid #C2C9D1"}}>
                 <div style={styles.header}>
                <span style={styles.title}>Retail vs Wholesale Sales <img src={i_icon} alt="i_icon"/></span>
                <span style={styles.badge}>+20%</span>
              </div>
              <p style={styles.subtext}>Last 7 days</p>
               </div>

              <div style={styles.salesRow}>
                <div className=" w-100" style={{paddingBottom:"16px",fontFamily:'"Poppins", sans-serif', fontWeight:"500", fontSize:"14px", color:"#727681", borderBottom:"1px solid #C2C9D1"}}>
                 
                     <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center gap-4" >
                       <span className="d-flex align-items-center gap-2"><img src={line_green} alt="line_grey" />Reatailer</span>
                    <span className="d-flex align-items-center gap-2" ><img src={line_grey} alt="line_grey" />Wholesaler</span>
                    </div>
                     <div className="d-flex gap-5" style={{marginLeft:"25px"}}>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                     </div>
                     </div>
                </div>
                <div>
            
                </div>
              </div>

              <div style={{height:"300px", borderBottom:"1px solid rgb(194, 201, 209)", paddingBottom:"15px"}}>
                  <Line data={data}options={{ ...options, maintainAspectRatio: false }}/>
              </div>

              <div style={styles.footer}>
                <a href="/" style={styles.link}>
                  View All
                </a>
                <span style={styles.update}><img src={time} alt="time" />Updated 30 mins ago</span>
              </div>
            </div>
          </div>
           <div className="graph-2-dash"  style={{width:"100%",maxWidth:"525px",}}>
            <div style={styles.card}>
               <div style={{borderBottom:"1px solid #C2C9D1"}}>
                 <div style={styles.header}>
                <span style={styles.title}>Sales Report <img src={i_icon} alt="i_icon"/></span>
                <span style={styles.badge}>+20%</span>
              </div>
              <p style={styles.subtext}>Last 7 days</p>
               </div>

              <div style={styles.salesRow}>
                <div className=" w-100" style={{paddingBottom:"16px",fontFamily:'"Poppins", sans-serif', fontWeight:"500", fontSize:"14px", color:"#727681", borderBottom:"1px solid #C2C9D1"}}>
                 
                     <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center gap-4" >
                       <span className="d-flex align-items-center gap-2"><img src={line_b} alt="line_b" />Inventory Value</span>
                    <span className="d-flex align-items-center gap-2" ><img src={line_white} alt="line_white" />Inventory Value</span>
                    </div>
                     <div className="d-flex gap-5" style={{marginLeft:"25px"}}>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                     </div>
                     </div>
                </div>
                <div>
            
                </div>
              </div>

               <div style={{height:"290px",borderBottom:"1px solid rgb(194, 201, 209)", paddingBottom:"15px"}}>
                 <Bar data={datas} options={{ ...optionss, maintainAspectRatio: false }} />
               </div>

              <div style={styles.footer}>
                <a href="/" style={styles.link}>
                  View All
                </a>
                <span style={styles.update}><img src={time} alt="time" />Updated 30 mins ago</span>
              </div>
            </div>
          </div>
           <div className="image-graph-dash"  style={{width:"100%",maxWidth:"525px",}}>
               <img style={{width:"100%",height:"451px"}}  src={advertisment_dash} alt="advertisment_dash" />
           </div>
          </div>
           <div className="d-flex justify-content-between">
             <div className="graph-3-dash" style={{width:"100%",maxWidth:"525px",}}>
            <div style={styles.card}>
               <div style={{borderBottom:"1px solid #C2C9D1"}}>
                 <div style={styles.header}>
                <span style={styles.title}>Sales Report <img src={i_icon} alt="i_icon"/></span>
                <span style={styles.badge}>+20%</span>
              </div>
              <p style={styles.subtext}>Last 7 days</p>
               </div>

              <div style={styles.salesRow}>
                <div className=" w-100" style={{paddingBottom:"16px",fontFamily:'"Poppins", sans-serif', fontWeight:"500", fontSize:"14px", color:"#727681", borderBottom:"1px solid #C2C9D1"}}>
                 
                     <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center gap-4" >
                       <span className="d-flex align-items-center gap-2"><img src={line_yellow} alt="line_yellow" />Inventory Value</span>
                    <span className="d-flex align-items-center gap-2" ><img src={line_yellowlight} alt="line_yellowlight" />Inventory Value</span>
                    </div>
                     <div className="d-flex gap-5" style={{marginLeft:"25px"}}>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                     </div>
                     </div>
                </div>
                <div>
            
                </div>
              </div>

               <div style={{height:"290px",borderBottom:"1px solid rgb(194, 201, 209)", paddingBottom:"15px"}}>
                 <Bar data={datasThree} options={{ ...optionssThree, maintainAspectRatio: false }} />
               </div>

              <div style={styles.footer}>
                <a href="/" style={styles.link}>
                  View All
                </a>
                <span style={styles.update}><img src={time} alt="time" />Updated 30 mins ago</span>
              </div>
            </div>
          </div>
            <div className="graph-4-dash" style={{width:"100%",maxWidth:"525px",}}>
            <div style={styles.card}>
               <div style={{borderBottom:"1px solid #C2C9D1"}}>
                 <div style={styles.header}>
                <span style={styles.title}>Stock Movement <img src={i_icon} alt="i_icon"/></span>
                <span style={styles.badge}>+20%</span>
              </div>
              <p style={styles.subtext}>Last 7 days</p>
               </div>

              <div style={styles.salesRow}>
                <div className=" w-100" style={{paddingBottom:"16px",fontFamily:'"Poppins", sans-serif', fontWeight:"500", fontSize:"14px", color:"#727681", borderBottom:"1px solid #C2C9D1"}}>
                 
                     <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center gap-4" >
                       <span className="d-flex align-items-center gap-2"><img src={line_navy} alt="linenavy" />Stock In</span>
                    <span className="d-flex align-items-center gap-2" ><img src={line_navylight} alt="line_navylight" />Stock Out</span>
                    </div>
                     <div className="d-flex gap-5" style={{marginLeft:"25px"}}>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                     </div>
                     </div>
                </div>
                <div>
            
                </div>
              </div>

              <div style={{height:"300px", borderBottom:"1px solid rgb(194, 201, 209)", paddingBottom:"15px"}}>
                  <Line data={dataFour}options={{ ...optionsFour, maintainAspectRatio: false }}/>
              </div>

              <div style={styles.footer}>
                <a href="/" style={styles.link}>
                  View All
                </a>
                <span style={styles.update}><img src={time} alt="time" />Updated 30 mins ago</span>
              </div>
            </div>
          </div>
          
            <div className="top-selling-dash" style={{width:"100%",maxWidth:"525px",}}>
            <div style={styles.card}>
               <div >
                 <div style={styles.header}>
                <span style={styles.title}>Top Selling Products <img src={i_icon} alt="i_icon"/></span>
                <span style={styles.badge}>+20%</span>
              </div>
              <p style={styles.subtext}>Last 7 days</p>
               </div>

              {/* <div style={styles.salesRow}>
                <div className=" w-100" style={{paddingBottom:"16px",fontFamily:'"Poppins", sans-serif', fontWeight:"500", fontSize:"14px", color:"#727681", borderBottom:"1px solid #C2C9D1"}}>
                 
                     <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center gap-4" >
                       <span className="d-flex align-items-center gap-2"><img src={line_navy} alt="linenavy" />Stock In</span>
                    <span className="d-flex align-items-center gap-2" ><img src={line_navylight} alt="line_navylight" />Stock Out</span>
                    </div>
                     <div className="d-flex gap-5" style={{marginLeft:"25px"}}>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                      <span style={{color:"#0E101A", fontSize:"20px", fontWeight:"500"}}>78,980 <span style={{fontSize:"14px"}}>INR</span></span>
                     </div>
                     </div>
                </div>
                <div>
            
                </div>
              </div> */}

              {/* <div style={{height:"300px", borderBottom:"1px solid rgb(194, 201, 209)", paddingBottom:"15px"}}>
                  <Line data={dataFour}options={{ ...optionsFour, maintainAspectRatio: false }}/>
              </div> */}
               <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontFamily: "'Poppins', sans-serif" }}>
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px 0px",
            // borderRadius: "8px",
            fontFamily:'"Poppins", sans-serif',
            borderTop:"1px solid rgb(194, 201, 209)"
          }}
        >
          <img
            src={p.img}
            alt={p.name}
            style={{
              width: "40px",
              height: "30px",
              objectFit: "cover",
              borderRadius: "6px",
              marginRight: "12px"
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 400, fontSize: "13px", color: "#0E101A" }}>{p.name}</div>
            <div style={{ fontSize: "12px", fontWeight: 400, color: "#20C300" }}>
              {p.units}{" "}
              <span style={{ color: "#6C748C", fontWeight: 400 }}>Unit sold</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 400, fontSize: "13px" }}>{p.price}</div>
            <div style={{ fontSize: "12px", color: "#20C300", fontWeight: 400 }}>{p.change}</div>
          </div>
        </div>
      ))}
    </div>

              <div style={styles.footer}>
                <a href="/" style={styles.link}>
                  View All
                </a>
                <span style={styles.update}><img src={time} alt="time" />Updated 30 mins ago</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;
