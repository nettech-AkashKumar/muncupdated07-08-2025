import React, { useEffect, useRef, useState } from "react";
import { LuUser } from "react-icons/lu";
import { CiCirclePlus, CiLocationOn } from "react-icons/ci";
import "./Profile.css";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../../pages/config/config";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();
  const id = user?._id || user?.id;
  const [userData, setUserData] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageFiles, setImageFiles] = useState({ profileImage: null });
  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click(); // programmatically open file dialog
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Try to keep under 1MB
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });
        const preview = URL.createObjectURL(compressedFile);
        setPreviewUrl(preview);
        setImageFiles({ profileImage: compressedFile });
      } catch (error) {
        console.error("Compresseion failed:", error);
      }
    }
  };

  // for country, state, city
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setCountryList(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStateList(State.getStatesOfCountry(selectedCountry));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCityList(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState]);

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        console.log("User ID from URL:", id);
        const userId = id;
        const res = await axios.get(`${BASE_URL}/api/user/${userId}`);
        // console.log("Fetched user:", res.data);
        setUserData(res.data);
        if (res.data.profileImage?.url) {
          setPreviewUrl(res.data.profileImage.url);
        }
      } catch (error) {
        console.error("Error fetching user", error);
        toast.error("Failed to load user");
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFiles) return toast.warn("Please select an image");
    const formData = new FormData();
    formData.append("profileImage", imageFiles.profileImage);
    try {
      const userId = userData._id;
      await axios.put(`${BASE_URL}/api/user/update/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile image updates");
    } catch (error) {
      toast.error("Failed to update image");
    }
  };

  return (
    <div>
      <div
        className="profile-container pb-2"
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          border: "1px solid rgb(211, 211, 211)",
        }}
      >
        <div>
          <h1 className="py-2 px-3" style={{ fontSize: "17px" }}>
            Profile
          </h1>
          <hr style={{ margin: "0" }} />
        </div>
        <div className="basic-information  px-3">
          {userData ? (
            <div>
              <label
                htmlFor=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontWeight: "600",
                  padding: "18px 0",
                }}
              >
                <LuUser style={{ color: "#007AFF" }} />
                <span>Basic Information</span>
              </label>

              <form onSubmit={handleSubmit}>
                <div
                  className="image-uploader"
                  style={{ display: "flex", gap: "15px", alignItems: "center" }}
                >
                  <div
                    className="add-image-circle"
                    style={{
                      border: "1px dotted grey",
                      width: "100px",
                      height: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "grey",
                      cursor: "pointer",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          pointerEvents: "none",
                        }}
                      />
                    ) : (
                      <>
                        <CiCirclePlus style={{ fontSize: "20px" }} />
                        <span style={{ fontSize: "12px", textAlign: "center" }}>
                          Add Image
                        </span>
                      </>
                    )}
                  </div>

                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      onClick={handleIconClick}
                      className="setting-imgupload-btn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        backgroundColor: " #007AFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        width: "150px",
                        height: "45px",
                        cursor: "pointer",
                      }}
                    >
                      Upload Image
                    </span>
                    <p>
                      Upload an image below 2MB, Accepted File format JPG, PNG
                    </p>
                  </div>
                </div>
                <div className="profle-details-form py-4 d-flex flex-column gap-3">
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: "5px",
                      }}
                    >
                      <label style={{ fontWeight: "500" }} htmlFor="">
                        First Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        readOnly
                        style={{
                          border: "1px solid #cbc6c6",
                          padding: "8px 5px",
                        }}
                        type="text"
                        value={userData?.firstName || ""}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: "5px",
                      }}
                    >
                      <label style={{ fontWeight: "500" }} htmlFor="">
                        Last Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        readOnly
                        style={{
                          border: "1px solid #cbc6c6",
                          padding: "8px 5px",
                        }}
                        type="text"
                        value={userData?.lastName || ""}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: "5px",
                      }}
                    >
                      <label style={{ fontWeight: "500" }} htmlFor="">
                        Phone Number <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        readOnly
                        style={{
                          border: "1px solid #cbc6c6",
                          padding: "8px 5px",
                        }}
                        type="text"
                        value={userData?.phone || ""}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "32.2%",
                        gap: "5px",
                      }}
                    >
                      <label style={{ fontWeight: "500" }} htmlFor="">
                        Email <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        readOnly
                        style={{
                          border: "1px solid #cbc6c6",
                          padding: "8px 5px",
                        }}
                        type="email"
                        value={userData?.email || ""}
                      />
                    </div>
                  </div>
                </div>

                <div className="address-information pb-4">
                  <label
                    htmlFor=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontWeight: "600",
                      padding: "18px 0",
                    }}
                  >
                    <CiLocationOn style={{ color: "#007AFF" }} />
                    <span>Address Information</span>
                  </label>
                  <div className="d-flex flex-column gap-3">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <label style={{ fontWeight: "500" }} htmlFor="">
                        Address<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        readOnly
                        style={{
                          border: "1px solid #cbc6c6",
                          padding: "8px 5px",
                        }}
                        type="text"
                        value={userData?.address || ""}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: "5px",
                        }}
                      >
                        <label style={{ fontWeight: "500" }} htmlFor="">
                          Country<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          style={{
                            border: "1px solid #cbc6c6",
                            padding: "8px 5px",
                            borderRadius: "5px",
                          }}
                        >
                          <option value="">Select Country</option>
                          <option value="">India</option>
                          <option value="">Brazil</option>
                          <option value="">Australia</option>
                        </select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: "5px",
                        }}
                      >
                        <label style={{ fontWeight: "500" }} htmlFor="">
                          State<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          style={{
                            border: "1px solid #cbc6c6",
                            padding: "8px 5px",
                            borderRadius: "5px",
                          }}
                        >
                          <option value="">Select State</option>
                          <option value="">Bihar</option>
                          <option value="">Assam</option>
                          <option value="">Jharkhand</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: "5px",
                        }}
                      >
                        <label style={{ fontWeight: "500" }} htmlFor="">
                          City<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          style={{
                            border: "1px solid #cbc6c6",
                            padding: "8px 5px",
                            borderRadius: "5px",
                          }}
                        >
                          <option value="">Select City</option>
                          <option value="">Patna</option>
                          <option value="">Purnia</option>
                          <option value="">Vaishali</option>
                        </select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: "5px",
                        }}
                      >
                        <label style={{ fontWeight: "500" }} htmlFor="">
                          Postal Code<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="number"
                          style={{
                            border: "1px solid #cbc6c6",
                            padding: "8px 5px",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <button
                    className="settingbtn"
                    style={{
                      border: "none",
                      padding: "10px",
                      backgroundColor: "#81BDff",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="settingbtn"
                    style={{
                      border: "none",
                      padding: "10px",
                      backgroundColor: "#007AFF",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p>No Data found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
