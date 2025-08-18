import React, { useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { MdKeyboardArrowUp, MdOutlineVideoSettings } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { AiOutlineGlobal } from "react-icons/ai";
import { CiMobile2 } from "react-icons/ci";
import { AiOutlineDesktop } from "react-icons/ai";
import { TbSettingsCog } from "react-icons/tb";
import { TbSettings2 } from "react-icons/tb";
import { RxDotFilled } from "react-icons/rx";
import "./Settings.css";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../components/auth/AuthContext.jsx";
import Vector from "../../assets/images/Vector.png";
import Icons from "../../assets/images/Icons.png";
import { RiUserSettingsLine } from "react-icons/ri";


const Settings = () => {
  const [showGeneralSettings, setShowGeneralSettings] = useState(false);
  const [showWebsiteSettings, setShowWebsitelSettings] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState("");
  const [activeMainItem, setActiveMainItem] = useState("");
  const { user } = useAuth();
  const id = user?._id;


  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const toggleInvoiceDropdown = () => {
    setShowInvoice((prev) => !prev)
  }
  const { t } = useTranslation();

  return (
    <div>
      <div className="mainsetting">
        {/* MAIN-COMPONENT? */}
        <div className=" px-4 d-flex gap-4">
          <div
            className="left-setting-sidebar">
            <div>
              <h1 className="settingssh1" style={{ fontSize: "17px" }}>{t("settings")}</h1>
              <hr style={{ color: '#9c9c9cff' }} />
            </div>
            <div className="sidebar-nav-link">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "15px",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => { toggleDropdown("general"); setActiveMainItem("general") }}
              >
                <span className="settingssh1" style={{ backgroundColor: activeMainItem === "general" ? "#E3F3FF" : "", border: activeMainItem === "general" ? "1px solid #BBE1FF" : "none", borderRadius: activeMainItem === "general" ? "5px" : "", padding: "8px", display: "flex", alignItems: 'center', gap: "8px" }}>
                  {" "}
                  <RiUserSettingsLine style={{ color: 'gray', color: activeMainItem === "general" ? "#1368EC" : "", }} /> {t("General Settings")}
                  <RiArrowDropDownLine
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "25px",
                      fontWeight: 300,
                      transition: "transform 0.3s",
                      transform: openDropdown === "general" ? "rotate(360deg)" : "rotate(270deg)",
                      color: activeMainItem === "general" ? "#1368EC" : "",
                    }}
                  />
                </span>
              </div>
              {/* DROPDOWN CONTENT */}
              {openDropdown === "general" && (
                <div
                  style={{
                    paddingBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link to={`profile/${id}`} style={{ textDecoration: "none", color: "black" }}
                    onClick={() => setActiveItem("profile")}
                  >
                    {" "}
                    <span
                      className="settingssh1"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: activeItem === "profile" ? "#1368EC" : "#676767"
                      }}
                    >
                      {" "}
                      {t("profile")}
                    </span>
                  </Link>
                  <Link to="/security-settings" style={{ textDecoration: "none", color: "black" }}
                    onClick={() => setActiveItem("security")}
                  >
                    <span
                      className="settingssh1"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: activeItem === "security" ? "#1368EC" : "#676767"
                      }}
                    >
                      {t("Security")}
                    </span>
                  </Link>
                  {/* <Link to="notification" style={{ textDecoration: "none", color: "black" }}>
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {t("Notification")} <RxDotFilled />
                    </span>
                  </Link>
                  <Link to="connectedapps" style={{ textDecoration: "none", color: "black" }}>
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {t("Connected Apps")} <RxDotFilled />
                    </span>
                  </Link> */}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "15px",
                  cursor: "pointer",
                }}
                onClick={() => { toggleDropdown("website"); setActiveMainItem("website") }}
              >
                <span className="settingssh1" style={{ backgroundColor: activeMainItem === "website" ? "#E3F3FF" : "", border: activeMainItem === "website" ? "1px solid #BBE1FF" : "none", borderRadius: activeMainItem === "website" ? "5px" : "", padding: "8px", display: "flex", alignItems: 'center', gap: "8px" }}>
                  {" "}
                  <MdOutlineVideoSettings style={{ color: activeMainItem === "website" ? "#1368EC" : "" }} /> {t("Website Settings")}
                  <RiArrowDropDownLine
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "25px",
                      fontWeight: 300,
                      transition: "transform 0.3s",
                      transform: openDropdown === "website" ? "rotate(360deg)" : "rotate(270deg)",
                      color: activeMainItem === "website" ? "#1368EC" : "",
                    }}
                  />
                </span>
              </div>
              {/* DROPDOWN CONTENT */}
              {openDropdown === "website" && (
                <div
                  style={{
                    paddingBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* <Link to="system-settings" style={{ textDecoration: "none", color: "black" }}>
                    {" "}
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {t("system settings")} <RxDotFilled />
                    </span>
                  </Link> */}
                  <Link to="company-settings" style={{ textDecoration: "none", color: "black" }} onClick={() => setActiveItem("company-settings")}>
                    <span
                      className="settingssh1"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: activeItem === "company-settings" ? "#1368EC" : "#676767"
                      }}
                    >
                      {t("Company Settings")}
                    </span>
                  </Link>
                  <Link to="/language-settings" style={{ textDecoration: "none", color: "black" }} onClick={() => setActiveItem("language-settings")}>
                    <span
                      className="settingssh1"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: activeItem === "language-settings" ? "#1368EC" : "#676767"
                      }}
                    >
                      {t("localization")}
                    </span>
                  </Link>
                  {/* <Link to="prefixes" style={{ textDecoration: "none", color: "black" }}>
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {t("prefixes")} <RxDotFilled />
                    </span>
                  </Link> */}
                  {/* <Link to="preferance" style={{ textDecoration: "none", color: "black" }}>
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {t("preferance")} <RxDotFilled />
                    </span>
                  </Link> */}
                  {/* <Link to="appearance" style={{ textDecoration: "none", color: "black" }}>
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {t("appearance")} <RxDotFilled />
                    </span>
                  </Link> */}
                  {/* <Link to="socialauth" style={{ textDecoration: "none", color: "black" }}>
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {t("social_auth")} <RxDotFilled />
                    </span>
                  </Link> */}
                  {/* <Link to="language" style={{ textDecoration: "none", color: "black" }}>
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {t("language")} <RxDotFilled />
                    </span>
                  </Link> */}
                </div>
              )}
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "30px",
                  cursor: "pointer"
                }}
                onClick={() => toggleDropdown("appsetting")}
              >
                <span style={{ color: "#212B36", fontSize: "17px" }}>
                  {" "}
                  <CiMobile2 /> {t("App Settings")}
                </span>
                <span>
                  <RiArrowDropDownLine
                    style={{
                      backgroundColor: "#F2F2F2",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      transition: "transfrom 0.3s",
                      transform: openDropdown === "appsetting" ? "rotate(360deg)" : "rotate(270deg)"
                    }}
                  />
                </span>
              </div>
              {openDropdown === "appsetting" && (
                <div
                  style={{ paddingBottom: "20px", display: "flex", flexDirection: "column", }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems:'center', cursor:'pointer', margin:'5px 0' }} onClick={toggleInvoiceDropdown}>

                    <span style={{ color: "#212B36", fontSize: "17px" }}>
                      {" "}
                      <CiMobile2 /> {t("Invoice")}
                    </span>
                    <span>
                      <RiArrowDropDownLine
                        style={{
                          backgroundColor: "#F2F2F2",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          transition: "transfrom 0.3s",
                          transform: showInvoice ? "rotate(360deg)" : "rotate(270deg)"
                        }}
                      />
                    </span>
                  </div>
                  {showInvoice && (
                    <>
                      <Link to="" style={{ textDecoration: "none", color: "black" }}>
                        {" "}
                        <span
                          className="genersettingdropdown"
                          style={{
                            marginLeft: "10px",
                            marginRight: "10px",
                            padding: "10px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          {t("Invoice Settings")} <RxDotFilled />
                        </span>
                      </Link>
                      <Link to="" style={{ textDecoration: "none", color: "black" }}>
                        {" "}
                        <span
                          className="genersettingdropdown"
                          style={{
                            marginLeft: "10px",
                            marginRight: "10px",
                            padding: "10px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          {t("Invoice Templates")} <RxDotFilled />
                        </span>
                      </Link>
                    </>
                  )}
                  <Link to="" style={{ textDecoration: "none", color: "black" }}>
                    {" "}
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {t("Printer")} <RxDotFilled />
                    </span>
                  </Link>
                  <Link to="" style={{ textDecoration: "none", color: "black" }}>
                    {" "}
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {t("POS")} <RxDotFilled />
                    </span>
                  </Link>
                  <Link to="" style={{ textDecoration: "none", color: "black" }}>
                    {" "}
                    <span
                      className="genersettingdropdown"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {t("Custom Fields")} <RxDotFilled />
                    </span>
                  </Link>
                </div>
              )} */}

            </div>
          </div>

          <div className="right-setting-content w-100">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
