import React, { useEffect, useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { GrShieldSecurity } from "react-icons/gr";
import { PiGoogleLogoFill } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { TbTool } from "react-icons/tb";
import { SlGraph } from "react-icons/sl";
import { IoBanOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import "./Security.css";
import EmailVerification from "./Emailverification/EmailVerification";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import MobileVerification from "./Emailverification/MobileVerification";
import DeviceManagement from "../../componentsetting28-07-2025/security/DeviceManagement/DeviceManagement.jsx";
import SecurityChangePassword from "./SecurityChangePassword/SecurityChangePassword";
import BASE_URL from "../../../pages/config/config";

const Security = () => {
  const [isOn, setIsOn] = useState(false);
  const [isOnTwo, setIsOnTwo] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  // const userId = localStorage.getItem("userId")
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData._id;
  // console.log("userId from security line 28", userId)

  // state to fetch userprofile info
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      console.log("userData", userData);
      if (!userData?._id) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/user/${userData._id}`);
        console.log("Response from /api/user:", res.data);

        setCurrentUser(res.data);
      } catch (error) {
        console.error("Error fetching current user", error);
      }
    };
    fetchUser();
  }, []);

  // show verifyemail modal state
  const [showOTPModal, setShowOTPModal] = useState(false);
  // show verifymobile modal state
  const [showmobileModal, setShowMobileModal] = useState(false);

  // device management
  const [devicemanage, setDeviceManage] = useState(false);

  // password changed
  const [changePassword, setChangedPassword] = useState(false);

  // function to toggle active and deactive
  const handleToggleStatus = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/user/toggle-status/${userId}`
      );
      const updatedStatus = res.data.status;
      setCurrentUser((prev) => ({
        ...prev,
        status: updatedStatus,
      }));
      alert(
        `Account ${
          updatedStatus === "Active" ? "reactivated" : "deactivated"
        } successfully`
      );
      console.log("Updated isActive:", res.data.status);
    } catch (error) {
      alert("Failed to update account status");
    }
  };

  // handle delete account
  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/user/userDelete/${userId}`
      );
      alert(res.data.message || "Account Deleted");
      localStorage.removeItem("userId");
      window.location.href = "/users";
    } catch (error) {
      console.error("Error while deleting account", error);
    }
  };

  // for two factor authentication
  // fetch register user data here
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/user/${userId}`);
      setTwoFactorEnabled(data.twoFactorEnabled || false);
    };
    fetchUser();
  }, [userId]);

  const toggleTwoFactor = async () => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/user/toggle-2fa/${userId}`
      );
      setTwoFactorEnabled(data.twoFactorEnabled);
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to toggle 2FA");
    }
  };
  return (
    <div>
      <div
        className="security-container"
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          border: "1px solid rgb(211, 211, 211)",
        }}
      >
        <div>
          <h1 className="py-2 px-3" style={{ fontSize: "17px" }}>
            Security
          </h1>
          <hr style={{ margin: "0" }} />
        </div>
        <div className="notification-content px-3">
          <div
            style={{
              borderBottom: "1px solid rgb(211, 211, 211)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
              <div
                style={{
                  backgroundColor: " white",
                  border: "1px solid rgb(211, 211, 211)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FiEyeOff />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "600" }}>Password</span>
                <span style={{ color: "grey" }}>
                  Last Changed{" "}
                  {currentUser?.passwordChangedAt
                    ? new Date(
                        currentUser.passwordChangedAt
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "N/A"}
                </span>
              </div>
            </div>
            <div>
              <button
                onClick={() => setChangedPassword(true)}
                className="security-changepass-btn"
                style={{
                  border: "none",
                  backgroundColor: "#007AFF",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Change Password
              </button>
              <SecurityChangePassword
                isOpen={changePassword}
                onClose={() => setChangedPassword(false)}
              />
            </div>
          </div>
          <div
            style={{
              borderBottom: "1px solid rgb(211, 211, 211)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
              <div
                style={{
                  backgroundColor: " white",
                  border: "1px solid rgb(211, 211, 211)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <GrShieldSecurity />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "600" }}>
                  Two Factor Authentication
                </span>
                <span style={{ color: "grey" }}>
                  Receive codes via Email every time you login
                </span>
              </div>
            </div>
            <div>
              <button
                style={{
                  padding: "8px 16px",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  backgroundColor: twoFactorEnabled ? "#d9534f" : "#5cb85c",
                }}
                onClick={toggleTwoFactor}
              >
                {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>
          </div>
          <div
            style={{
              borderBottom: "1px solid rgb(211, 211, 211)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
              <div
                style={{
                  backgroundColor: " white",
                  border: "1px solid rgb(211, 211, 211)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PiGoogleLogoFill />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "600" }}>Google Authentication</span>
                <span style={{ color: "grey" }}>Connect to Google</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              {/* Google Auth */}
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await axios.post(
                      `${BASE_URL}/api/auth/google`,
                      {
                        token: credentialResponse.credential,
                      }
                    );
                    console.log("Logged in user:", res.data);
                    localStorage.setItem(
                      "userinfoviagoogleauth",
                      JSON.stringify(res.data)
                    );
                  } catch (error) {
                    console.error("Login failed", error);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
          <div
            style={{
              borderBottom: "1px solid rgb(211, 211, 211)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
              <div
                style={{
                  backgroundColor: " white",
                  border: "1px solid rgb(211, 211, 211)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IoCallOutline />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "600" }}>
                  Phone Number Verification
                </span>
                <span style={{ color: "grey" }}>
                  Verified Mobile Number {currentUser?.phone}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {currentUser?.phoneVerified && (
                <span
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IoIosCheckmark />
                </span>
              )}
              <button
                onClick={() => setShowMobileModal(true)}
                className="security-changepass-btn"
                style={{
                  border: "none",
                  backgroundColor: "#007AFF",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Change{" "}
              </button>
              <MobileVerification
                isOpen={showmobileModal}
                onClose={() => setShowMobileModal(false)}
              />
              <button
                className="security-changepass-btn"
                style={{
                  border: "none",
                  backgroundColor: "#81BDff",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Remove
              </button>
            </div>
          </div>
          <div
            style={{
              borderBottom: "1px solid rgb(211, 211, 211)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
              <div
                style={{
                  backgroundColor: " white",
                  border: "1px solid rgb(211, 211, 211)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdOutlineEmail />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "600" }}>Email Verification</span>
                <span style={{ color: "grey" }}>
                  Verified Email: {currentUser?.email || "Not available"}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {currentUser?.emailVerified && (
                <span
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IoIosCheckmark />
                </span>
              )}
              <button
                onClick={() => setShowOTPModal(true)}
                className="security-changepass-btn"
                style={{
                  border: "none",
                  backgroundColor: "#007AFF",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Change{" "}
              </button>
              <EmailVerification
                isOpen={showOTPModal}
                onClose={() => setShowOTPModal(false)}
              />
              <button
                className="security-changepass-btn"
                style={{
                  border: "none",
                  backgroundColor: "#81BDff",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Remove
              </button>
            </div>
          </div>
          <div
            style={{
              borderBottom: "1px solid rgb(211, 211, 211)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
              <div
                style={{
                  backgroundColor: " white",
                  border: "1px solid rgb(211, 211, 211)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TbTool />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "600" }}>Device Management</span>
                <span style={{ color: "grey" }}>
                  Manage device associated with the account{" "}
                </span>
              </div>
            </div>
            <div>
              <button
                onClick={() => setDeviceManage(true)}
                className="security-changepass-btn"
                style={{
                  border: "none",
                  backgroundColor: "#007AFF",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Manage
              </button>
              {devicemanage && (
                <DeviceManagement
                  isOpen={devicemanage}
                  onClose={() => setDeviceManage(false)}
                  userId={userId}
                />
              )}
            </div>
          </div>
          <div
            style={{
              borderBottom: "1px solid rgb(211, 211, 211)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
              <div
                style={{
                  backgroundColor: " white",
                  border: "1px solid rgb(211, 211, 211)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SlGraph />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "600" }}>Account Activity</span>
                <span style={{ color: "grey" }}>
                  Manage activities associated with the account
                </span>
              </div>
            </div>
            <div>
              <button
                onClick={() => setDeviceManage(true)}
                className="security-changepass-btn"
                style={{
                  border: "none",
                  backgroundColor: "#007AFF",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                View
              </button>
            </div>
          </div>
          <div
            style={{
              borderBottom: "1px solid rgb(211, 211, 211)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
              <div
                style={{
                  backgroundColor: " white",
                  border: "1px solid rgb(211, 211, 211)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IoBanOutline />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "600" }}>Deactivate Account</span>
                <span style={{ color: "grey" }}>
                  This will shutdown Your account will be reactive when you sign
                  in again
                </span>
              </div>
            </div>
            <div>
              {currentUser && (
                <button
                  className="security-changepass-btn"
                  style={{
                    border: "none",
                    backgroundColor:
                      currentUser.status === "Active" ? "#d9534f" : "#5cb85c",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  onClick={handleToggleStatus}
                >
                  {currentUser.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
              <div
                style={{
                  backgroundColor: " white",
                  border: "1px solid rgb(211, 211, 211)",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RiDeleteBinLine />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "600" }}>Delete Account</span>
                <span style={{ color: "grey" }}>
                  Your account will be permanently deleted
                </span>
              </div>
            </div>
            <div>
              <button
                onClick={handleDeleteAccount}
                className="security-changepass-btn"
                style={{
                  border: "none",
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
