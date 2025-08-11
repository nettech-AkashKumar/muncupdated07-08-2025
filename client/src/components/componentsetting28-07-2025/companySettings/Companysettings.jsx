import React, { useRef, useState, useEffect } from "react";
import { BiBuilding } from "react-icons/bi";
import company_icon from "../../../assets/images/upload.webP";
import { HiOutlineUpload } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import "./Compansettings.css";
import axios from 'axios'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Country, State, City } from "country-state-city";
import BASE_URL from "../../../pages/config/config";


const Companysettings = () => {
  // for country, state, city
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const [countryList, setCountryList] = useState([])
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])

  const [isUpdating, setIsUpdating] = useState(false)


  useEffect(() => {
    setCountryList(Country.getAllCountries())
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStateList(State.getStatesOfCountry(selectedCountry))
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCityList(City.getCitiesOfState(selectedCountry, selectedState))
    }
  }, [selectedState]);
  const [imageFiles, setImageFiles] = useState({
    companyIcon: null,
    companyFavicon: null,
    companyLogo: null,
    companyDarkLogo: null,
  });

  const [formData, setFormData] = useState({
    companyName: "",
    companyemail: "",
    companyphone: "",
    companyfax: "",
    companywebsite: "",
    companyaddress: "",
    companycountry: "",
    companystate: "",
    companycity: "",
    companypostalcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const form = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     form.append(key, value)
  //   });
  //   if (imageFiles.companyIcon) form.append("companyIcon", imageFiles.companyIcon)
  //   if (imageFiles.companyFavicon) form.append("companyFavicon", imageFiles.companyFavicon);
  //   if (imageFiles.companyLogo) form.append("companyLogo", imageFiles.companyLogo);
  //   if (imageFiles.companyDarkLogo) form.append("companyDarkLogo", imageFiles.companyDarkLogo);


  //   try {
  //     const res = await axios.post("http://localhost:5174/api/companyprofile/send", form);
  //     console.log("Form Data", formData)
  //     localStorage.setItem("companyinfo", JSON.stringify(formData))
  //     if (res.status === 201) {
  //       setFormData({
  //         companyName: "",
  //         companyemail: "",
  //         companyphone: "",
  //         companyfax: "",
  //         companywebsite: "",
  //         companyaddress: "",
  //         companycountry: "",
  //         companystate: "",
  //         companycity: "",
  //         companypostalcode: "",
  //       })
  //       toast.success("Data saved successfully", {
  //         position: "top-center"
  //       })
  //     }
  //   } catch (error) {
  //     toast.error("Error while saving company info", error)
  //   }
  // }

  // fetch company profile

  const fetchCompanyProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/companyprofile/get`);
      console.log("Fetched company profile data:", res.data);
      const profile = res.data.data;
      if (profile) {
        setFormData({
          companyName: profile.companyName || "",
          companyemail: profile.companyemail || "",
          companyphone: profile.companyphone || "",
          companyfax: profile.companyfax || "",
          companywebsite: profile.companywebsite || "",
          companyaddress: profile.companyaddress || "",
          companycountry: profile.companycountry || "",
          companystate: profile.companystate || "",
          companycity: profile.companycity || "",
          companypostalcode: profile.companypostalcode || "",
        });
        //set dependent dropdown
        setSelectedCountry(profile.companycountry || "");
        setSelectedState(profile.companystate || "")
        setSelectedCity(profile.companycity || "");

        setIsUpdating(true)
      }
    } catch (error) {
      toast.error("No existing company profile or error fetching it:", error)
    }
  };
  useEffect(() => {
    fetchCompanyProfile();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value)
    });
    if (imageFiles.companyIcon) form.append("companyIcon", imageFiles.companyIcon)
    if (imageFiles.companyFavicon) form.append("companyFavicon", imageFiles.companyFavicon);
    if (imageFiles.companyLogo) form.append("companyLogo", imageFiles.companyLogo);
    if (imageFiles.companyDarkLogo) form.append("companyDarkLogo", imageFiles.companyDarkLogo);


    try {
      const res = await axios.post(`${BASE_URL}/api/companyprofile/send`, form)
      console.log("Form Data", formData)
      localStorage.setItem("companyinfo", JSON.stringify(formData))
      if (res.status === 200 || res.status === 201) {
        toast.success(`Company Profile ${isUpdating ? "updated" : "created"} successfully`, {
          position: "top-center"
        })
        await fetchCompanyProfile();
      }
    } catch (error) {
      toast.error("Error while saving company info", error)
    }
  }




  const companyimageData = [
    {
      field: "companyIcon",
      label: "Company Icon",
      description: "Upload Icon of your Company",
    },
    {
      field: "companyFavicon",
      label: "Favicon",
      description: "Upload Favicon of your Company",
    },
    {
      field: "companyLogo",
      label: "Company Logo",
      description: "Upload Logo of your Company",
    },
    {
      field: "companyDarkLogo",
      label: "Company Dark Logo",
      description: "Upload Dark Logo of your Company",
    },
  ];

  return (
    <div>
      <div
        className="company-settings-container"
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          border: "1px solid rgb(211, 211, 211)",
        }}
      >
        <div>
          <h1 className="py-2 px-3" style={{ fontSize: "17px" }}>
            Company Settings
          </h1>
          <hr style={{ margin: "0" }} />
        </div>

        <div className="comapany-settings content py-3 px-3">
          <form onSubmit={handleSubmit}>
            <div className="company-info pt-1 pb-3">
              <label
                style={{
                  fontWeight: "600",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
                htmlFor=""
              >
                <BiBuilding style={{ color: "#81BDff" }} />
                Company Informations
              </label>
              <div
                className="company-info-input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "10px 0",
                }}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      Company Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      style={{
                        border: "1px solid rgb(203, 198, 198)",
                        padding: "8px 5px",
                        borderRadius: "5px",
                      }}
                      type="text"
                      placeholder="Enter company name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      Company Email Address{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      style={{
                        border: "1px solid rgb(203, 198, 198)",
                        padding: "8px 5px",
                        borderRadius: "5px",
                      }}
                      type="email"
                      placeholder="Enter company email"
                      name="companyemail"
                      value={formData.companyemail}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      Phone Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      style={{
                        border: "1px solid rgb(203, 198, 198)",
                        padding: "8px 5px",
                        borderRadius: "5px",
                      }}
                      type="text"
                      placeholder="Enetr company number"
                      name="companyphone"
                      value={formData.companyphone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      Fax<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      style={{
                        border: "1px solid rgb(203, 198, 198)",
                        padding: "8px 5px",
                        borderRadius: "5px",
                      }}
                      type="text"
                      placeholder="Fax"
                      name="companyfax"
                      value={formData.companyfax}
                      onChange={handleChange}
                      maxLength="10"
                      pattern="\d{10}"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      Website <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      style={{
                        border: "1px solid rgb(203, 198, 198)",
                        padding: "8px 5px",
                        borderRadius: "5px",
                      }}
                      type="url"
                      placeholder="Website"
                      name="companywebsite"
                      value={formData.companywebsite}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="company-images"
              style={{
                borderBottom: "1px solid  rgb(211, 211, 211)",
                borderTop: "1px solid  rgb(211, 211, 211)",
                padding: "10px 0px",
              }}
            >
              <label
                style={{
                  fontWeight: "600",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
                htmlFor=""
              >
                <BiBuilding style={{ color: "#81BDff" }} />
                Company Images
              </label>
              {companyimageData.map((item, index) => (
                <div
                  key={index}
                  className="company-images-content"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "" }}>{item.label}</span>
                    <span style={{ color: "#5c5b5b" }}>{item.description}</span>
                  </div>
                  <div>
                    <label htmlFor={item.field}>
                      <div
                        className="company-images-upload-btn"
                        style={{
                          border: "none",
                          backgroundColor: "#007AFF",
                          color: "white",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <HiOutlineUpload />
                        Upload Image
                      </div>
                    </label>
                    <input
                      id={item.field}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const maxSize = 1 * 1024 * 1024
                          if (file.size > maxSize) {
                            toast.error("File size must be less than or equal to 1MB")
                            return;
                          }
                          setImageFiles((prev) => ({
                            ...prev,
                            [item.field]: file
                          }))
                        }
                      }}
                    />
                  </div>
                  <div
                    style={{
                      border: "1px solid rgb(211, 211, 211)",
                      width: "80px",
                      height: "70px",
                      padding: "5px",
                      borderRadius: "5px",
                      position: "relative"
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      src={imageFiles[item.field] ? URL.createObjectURL(imageFiles[item.field]) : company_icon}
                      alt="company_icon"
                    />
                    <div
                      onClick={() =>
                        setImageFiles((prev) => ({
                          ...prev,
                          [item.field]: null
                        }))
                      }
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "5px",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                        position: "absolute",
                        top: "10%",
                        right: "10%",
                        cursor: "pointer",
                      }}
                    >
                      <RxCross2 />
                    </div>

                  </div>
                </div>
              ))}
            </div>
            <div className="company-info-address py-4">
              <label
                style={{
                  fontWeight: "600",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
                htmlFor=""
              >
                <BiBuilding style={{ color: "#81BDff" }} />
                Address Information
              </label>
              <div
                className="company-info-input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "10px 0",
                }}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      Address <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      style={{
                        border: "1px solid rgb(203, 198, 198)",
                        padding: "8px 5px",
                        borderRadius: "5px",
                      }}
                      type="text"
                      placeholder="Enter company address"
                      name="companyaddress"
                      value={formData.companyaddress}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      Country<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCountry(value);
                        setFormData((prev) => ({
                          ...prev,
                          companycountry: value,
                          companystate: '',
                          companycity: ''
                        }))
                        setSelectedState(''),
                          setSelectedCity('')
                      }}
                      style={{
                        border: "1px solid rgb(203, 198, 198)",
                        padding: "8px 5px",
                        borderRadius: "5px",
                      }}>
                      <option value="">Select Country</option>
                      {countryList.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      State <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedState(value);
                        setFormData((prev) => ({
                          ...prev,
                          companystate: value,
                          companycity: ''
                        }))
                        setSelectedCity('')
                      }}
                      disabled={!selectedCountry}
                      style={{
                        border: "1px solid rgb(203, 198, 198)",
                        padding: "8px 5px",
                        borderRadius: "5px",
                      }}>
                      <option value="">Select State</option>
                      {stateList.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      City<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCity(value)
                        setFormData((prev) => ({
                          ...prev,
                          companycity: value
                        }))
                      }}
                      disabled={!selectedState}
                      style={{
                        border: "1px solid rgb(203, 198, 198)",
                        padding: "8px 5px",
                        borderRadius: "5px",
                      }}>
                      <option value="">Select City</option>
                      {cityList.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="" style={{ fontWeight: "400" }}>
                      Postal Code <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="number" style={{
                      border: "1px solid rgb(203, 198, 198)",
                      padding: "8px 5px",
                      borderRadius: "5px",
                    }} placeholder="Type Pin Code"
                      name="companypostalcode"
                      value={formData.companypostalcode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
              <button type="submit" className="settingbtn" style={{ border: "none", padding: "10px", backgroundColor: "#81BDff", color: "white", borderRadius: "5px" }}>Cancel</button>
              <button type="submit" className="settingbtn" style={{ border: "none", padding: "10px", backgroundColor: "#007AFF", color: "white", borderRadius: "5px" }}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Companysettings;
