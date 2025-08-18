import React, {useState} from "react";
import vector from "../../assets/img/Vector.png";
import search_dash_icon from "../../assets/img/search-icon-dash.png";
import settings_dash_icon from "../../assets/img/Icons-dash.png";
import bell_icon_dash from "../../assets/img/bell-dash.png";
import styled from "styled-components";
import { FiSun, FiMoon } from "react-icons/fi"; // Icons
import day_night_icon from "../../assets/img/day-night.png"
import line from "../../assets/img/Rectangle.png"
import CreateModel from "./CreateModel";
import './DashboardHeader.css'


const ToggleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  padding: 4px;
  background: #FFFFFF;
  box-shadow: inset 0 0 4px rgb(68 67 67 / 18%);
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin: 0 8px;
  color: ${(props) => (props.active ? "#1F7FFF" : "#888")};
  transition: color 0.3s ease;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#1F7FFF" : "#333")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  transition: background 0.3s ease;
`;
const DashboardHeader = () => {
     const [isDay, setIsDay] = useState(true);
     const [createModel, setCreateModel] =useState (false)
  return (
    <div className="dashboard-container-main d-flex justify-content-between align-items-center flex-wrap" >
      <div 
       className="dashboard-select-user-box"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          border: "1px solid #C2C9D1",
          borderRadius: "8px",
          padding: "8px 12px",
          fontFamily: '"Poppins", sans-serif',
          color: "#0E101A",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <img style={{ width: "15px" }} src={vector} alt="vector" />
        <select
          name=""
          id=""
          style={{
            border: "none",
            outline: "none",
            padding: "0px 8px",
            color: "#0E101A",
          }}
        >
          <option value="">Alok Ranjan Oraon</option>
          <option value="">Kasim Siddique</option>
          <option value="">Akash Kumar</option>
        </select>
      </div>
      <div
      className="dashboard-search-box"
        style={{
          border: "1px solid #C2C9D1",
          borderRadius: "8px",
          padding: "8px 16px",
          fontFamily: '"Poppins", sans-serif',
          color: "#0E101A",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          display:"flex",
          alignItems:"center",
          gap:"10px",
          width:"465px"
        }}
      >
        <img src={search_dash_icon} alt="search-dash-icon" />
        <input
          type="text"
          placeholder="Search"
          style={{ border: "none", outline: "none", width:"100%" }}
        />
      </div>
        <div className="dashboard-btn-manage d-flex align-items-center gap-4" style={{fontFamily:'"Poppins", sans-serif'}}>
            <img src={settings_dash_icon} alt="settings_dash_icon" />
             <img src={bell_icon_dash} alt="{bell_icon_dash" />

              <div className="d-flex align-items-center gap-3">
                 <img src={line} alt="line" />
                 <ToggleWrapper onClick={() => setIsDay(!isDay)}>
      <Text active={isDay}>{isDay ? "Day" : "Night"}</Text>
      <IconWrapper active={isDay}>
        {isDay ? <img src={day_night_icon} alt="day_night_icon"/> : <FiMoon />}
      </IconWrapper>
    </ToggleWrapper>
    <img src={line} alt="line" />
              </div>
               <button   onClick={() => setCreateModel(prev => !prev)} style={{position:"relative",border:"none", backgroundColor:"#1F7FFF", color:"white", fontFamily:'"Poppins", sans-serif', fontWeight:"500", borderRadius:"8px",boxShadow: "inset 0 0 4px rgb(68 67 67 / 18%)", width:"93px", height:"36px"}}>Create</button>
        </div>
        {createModel &&  <CreateModel/>}
    </div>
  );
};

export default DashboardHeader;
