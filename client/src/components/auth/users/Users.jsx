import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { TbEdit, TbEye, TbSearch, TbTrash } from "react-icons/tb";
import BASE_URL from "../../../pages/config/config";
import Select from "react-select";
import { CiCirclePlus } from "react-icons/ci";
// import AddUserModal from "../../../pages/Modal/users/AddUserModal";
import { toast } from "react-toastify";
import "../../../styles/users.css";
import { BiSearch } from "react-icons/bi";
import { BiChevronDown } from "react-icons/bi";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import Iconss from "../../../assets/images/Iconss.png";

const Users = () => {
  const [activeRoles, setActiveRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("  ");
  const [selectedStatus, setSelectedStatus] = useState(""); //for active , inactive
  const addFileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  // items page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const addHandleIconClick = () => {
    if (addFileInputRef.current) {
      addFileInputRef.current.click();
    } else {
      console.warn("addFileInputRef is null");
    }
  };
  const editHandleIconClick = () => {
    if (editFileInputRef.current) {
      editFileInputRef.current.click();
    } else {
      console.warn("editFileInputRef is null");
    }
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [hover, setHover] = useState(false);
  const [hoveroe, setHoveroe] = useState(false);
  const [hovertw, setHovertw] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  console.log(users);
  console.log("Uploaded image:", profileImage?.[0]?.url);

  const [editUserId, setEditUserdId] = useState(null);

  const [editUserData, setEditUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
    status: true,
    profileImage: null,
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // ⬅️ Get token from localStorage

      const res = await axios.get(`${BASE_URL}/api/user/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
      console.log("usersss", res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchTerm || !users.length || !activeRoles.length) return users;
    return users.filter((user) => {
      let roleName = "";

      // Case 1: user.role is a populated object with roleName
      if (typeof user.role === "object" && user.role?.roleName) {
        roleName = user.role.roleName;
      }

      // Case 2: user.role is an ID, look it up from activeRoles
      else if (typeof user.role === "string") {
        const matchedRole = activeRoles.find(
          (r) => String(r.value) === String(user.role)
        );
        roleName = matchedRole?.label || "";
      } else if (typeof user.role === "object" && user.role?._id) {
        const matchedRole = activeRoles.find(
          (r) => String(r.value) === String(user.role._id)
        );
        roleName = matchedRole?.label || "";
      }

      const matchesSearch = roleName
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesStatus = selectedStatus
        ? user.status === selectedStatus
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus, users, activeRoles]);

  // items per page
  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      return toast.error("Please select a role.");
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("role", selectedRole.value); // Role ID
    formData.append("status", status ? "Active" : "Inactive");

    //  Append image if provided (multiple format, even if only one)
    if (selectedImages.length > 0) {
      selectedImages.forEach((file) => {
        formData.append("profileImage", file); // match backend's `upload.array("profileImage")`
      });
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/user/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("User added successfully!");
      console.log("Created user:", res.data);

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setProfileImage(null);
      setSelectedRole(null);
      setStatus(true);
      setSelectedImages([]);
      fetchUsers();

      window.$(`#add-user`).modal("hide");
    } catch (error) {
      console.error("User creation failed:", error);
      toast.error(error.response?.data?.message || "Failed to add user");
    }
  };

  const fetchActiveRoles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/role/getRole/active`);
      const formattedRoles = res.data.map((role) => ({
        label: role.roleName,
        value: role._id,
      }));
      setActiveRoles(formattedRoles);
    } catch (error) {
      console.error("Error fetching active roles", error);
    }
  };

  useEffect(() => {
    fetchActiveRoles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/user/userDelete/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      console.log(err);

      toast.error("Failed to delete user");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", editUserData.firstName);
      formData.append("lastName", editUserData.lastName);
      formData.append("email", editUserData.email);
      formData.append("phone", editUserData.phone);

      // Role handling
      if (editUserData.role?.value) {
        formData.append("role", editUserData.role.value);
      } else if (typeof editUserData.role === "string") {
        formData.append("role", editUserData.role);
      }

      formData.append("status", editUserData.status ? "Active" : "Inactive");

      if (
        editUserData.profileImage &&
        typeof editUserData.profileImage !== "string"
      ) {
        formData.append("profileImage", editUserData.profileImage);
      }

      await axios.put(`${BASE_URL}/api/user/update/${editUserId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("User updated successfully");
      fetchUsers();
      window.$(`#edit-user`).modal("hide");
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    }
  };

  const handleOpenEditModal = (user) => {
    const getMatchingRole = (roleId) => {
      return activeRoles.find((role) => role.value === roleId);
    };
    const roleId =
      typeof user.role === "string"
        ? user.role
        : user.role?._id || user.role?.value;
    const selectedRole = getMatchingRole(roleId);

    setEditUserdId(user._id);

    // // Find the selected role from activeRoles
    // const selectedRole = activeRoles.find(role => role.value === user.role);

    setEditUserData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      role: selectedRole || { label: "Unknown Role", value: user.role }, // fallback
      status: user.status ?? true,
      // profileImage: null, // only updated if changed
      profileImage:
        typeof user.profileImage === "string"
          ? user.profileImage
          : user.profileImage?.url || null,
    });
  };

  return (
    <div className="page-wrapper user-wrappe">
      <div className="content">
        <div className="page-header" style={{ marginBottom: "20px" }}>
          <div className="add-item d-flex">
            <div className="page-title">
              <h4
                className=""
                style={{
                  color: "#262626",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "14px",
                }}
              >
                User Management
              </h4>
            </div>
          </div>
          {/* <div className="table-top-head me-2">
            <li>
              <button type="button" className="icon-btn" title="Pdf">
                <FaFilePdf />
              </button>
            </li>
            <li>
              <button type="button" className="icon-btn" title="Export Excel">
                <FaFileExcel />
              </button>
            </li>
          </div> */}
          <div
            className="page-btn"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.25)",
              backgroundColor: "#1368EC",
              borderRadius: "4px",
              border: "1px solid #1450AE",
            }}
          >
            <a
              href="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add-user"
              style={{
                padding: "8px",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "14px",
                color: "#FFFFFF",
              }}
            >
              + Add User
            </a>
          </div>
        </div>
        <hr
          style={{
            margin: "0",
            height: "1px",
            color: "#bdbdbdff",
            marginBottom: "20px",
          }}
        />
        {/* /product list */}
        <div className="card" style={{ border: "none" }}>
          <div
            className="card-header d-flex align-items-center justify-content-between flex-wrap"
            style={{ padding: "16px 0px 16px 0px" }}
          >
            <div className="search-set">
              <div className="search-input" style={{ position: "relative" }}>
                <BiSearch
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="search-inputsrch"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: "35px" }}
                />
              </div>
            </div>
            <div
              className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3"
              style={{ gap: "10px", alignItems: "center" }}
            >
              <div
                className="dropdown"
                style={{ boxShadow: "rgba(0, 0, 0, 0.25)" }}
              >
                <button
                  className="dropdown-toggle btn-md d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                  role="button"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#676767",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "14px",
                    borderRadius: "4px",
                    border: "1px solid #E6E6E6",
                    boxShadow: "rgba(0, 0, 0, 0.25)",
                    padding: "10px",
                  }}
                >
                  {selectedStatus || "All"}
                  <BiChevronDown
                    style={{ marginLeft: "10px", fontSize: "20px" }}
                  />
                </button>
                <ul
                  className="dropdown-menu  dropdown-menu-end p-3"
                  style={{ minWidth: "150px" }}
                >
                  <li>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => setSelectedStatus("")}
                      onMouseEnter={() => setHovertw(true)}
                      onMouseLeave={() => setHovertw(false)}
                      style={{
                        color: "#676767",
                        padding: "6px 10px",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "14px",
                        backgroundColor:
                          selectedStatus === "Active"
                            ? "#ffff"
                            : hovertw
                            ? "#e3f3ff"
                            : "transparent",
                      }}
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => setSelectedStatus("Active")}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      style={{
                        color: "#676767",
                        padding: "6px 10px",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "14px",
                        backgroundColor:
                          selectedStatus === "Active"
                            ? "#ffff"
                            : hover
                            ? "#e3f3ff"
                            : "transparent",
                      }}
                    >
                      Active
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => setSelectedStatus("Inactive")}
                      onMouseEnter={() => setHoveroe(true)}
                      onMouseLeave={() => setHoveroe(false)}
                      style={{
                        color: "#676767",
                        padding: "6px 10px",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "14px",
                        backgroundColor:
                          selectedStatus === "Active"
                            ? "#ffff"
                            : hoveroe
                            ? "#e3f3ff"
                            : "transparent",
                      }}
                    >
                      Inactive
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div
              className="table-responsive"
              style={{ border: "1px solid #E6E6E6" }}
            >
              <table className="table">
                <thead
                  className="thead-light"
                  style={{ backgroundColor: "#F1F1F1" }}
                >
                  <tr style={{ textAlign: "start" }}>
                    <th className="no-sort">
                      <label className="">
                        <input
                          type="checkbox"
                          id="select-all"
                          style={{ border: "1px solid #676767" }}
                        />
                        <span className="checkmarks" />
                      </label>
                    </th>
                    <th
                      style={{
                        color: "#676767",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        fontFamily: 'Roboto", sans-serif',
                      }}
                    >
                      User Name
                    </th>
                    <th
                      style={{
                        color: "#676767",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        fontFamily: 'Roboto", sans-serif',
                      }}
                    >
                      Phone
                    </th>
                    <th
                      style={{
                        color: "#676767",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        fontFamily: 'Roboto", sans-serif',
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        color: "#676767",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        fontFamily: 'Roboto", sans-serif',
                      }}
                    >
                      Role
                    </th>
                    <th
                      style={{
                        color: "#676767",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        fontFamily: 'Roboto", sans-serif',
                      }}
                    >
                      Status
                    </th>
                    <th
                      className="no-sort"
                      style={{
                        color: "#676767",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "14px",
                        fontFamily: 'Roboto", sans-serif',
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <tr style={{ textAlign: "start" }}>
                        <td>
                          <label className="">
                            <input
                              type="checkbox"
                              style={{ border: "1px solid #1d1d1dff" }}
                            />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td
                          style={{
                            color: "#262626",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "14px",
                            fontFamily: 'Roboto", sans-serif',
                            textTransform: "capitalize",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <span
                              href="javascript:void(0);"
                              className="avatar avatar-md me-2 no-underline"
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "4px",
                              }}
                            >
                              {user.profileImage && user.profileImage.url ? (
                                <img
                                  src={user.profileImage.url}
                                  alt="Profile"
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "4px",
                                  }}
                                />
                              ) : (
                                <div
                                  className=" text-white  d-flex justify-content-center align-items-center"
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "4px",
                                    border: "1px solid #E6E6E6",
                                    textDecoration: "none",
                                  }}
                                >
                                  {user.firstName?.charAt(0)}
                                  {user.lastName?.charAt(0)}
                                </div>
                              )}
                            </span>
                            <span>
                              {user.firstName} {user.lastName}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            color: "#262626",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "14px",
                            fontFamily: 'Roboto", sans-serif',
                          }}
                        >
                          {user.phone}
                        </td>
                        <td
                          style={{
                            color: "#262626",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "14px",
                            fontFamily: 'Roboto", sans-serif',
                          }}
                        >
                          <span
                            className="email"
                            style={{ textDecoration: "none" }}
                          >
                            {user.email}
                          </span>
                        </td>
                        <td
                          style={{
                            color: "#262626",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "14px",
                            fontFamily: 'Roboto", sans-serif',
                          }}
                        >
                          {user.role?.roleName}
                        </td>
                        <td
                          style={{
                            color: "#262626",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "14px",
                            fontFamily: 'Roboto", sans-serif',
                          }}
                        >
                          {/*  */}
                          <span
                            className={`badge table-badge fw-medium fs-10 ${
                              user.status === "Active" ? "" : ""
                            }`}
                            style={
                              user.status === "Active"
                                ? {
                                    backgroundColor: "#DFFFE0",
                                    color: "#0F5132",
                                    padding: "6px 8px 6px 8px",
                                  }
                                : {
                                    backgroundColor: "#FCE4E6",
                                    color: "#0F5132",
                                    padding: "6px 8px 6px 8px",
                                  }
                            }
                          >
                            {user.status}
                          </span>
                          {/*  */}
                        </td>
                        <td
                          className="action-table-data"
                          style={{
                            color: "#262626",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "14px",
                            fontFamily: 'Roboto", sans-serif',
                          }}
                        >
                          <div className="d-flex">
                            {/* <a className="me-2 p-2">
                              <TbEye />
                            </a> */}
                            <a
                              className="me-2 p-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-user"
                              onClick={() => handleOpenEditModal(user)}
                            >
                              <TbEdit />
                            </a>

                            <a
                              className="p-2"
                              onClick={() => handleDelete(user._id)}
                            >
                              <TbTrash />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        style={{
                          color: "#262626",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "14px",
                          fontFamily: 'Roboto", sans-serif',
                        }}
                        colSpan="6"
                        className="text-center text-muted"
                      >
                        No Users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/*  */}
              <div
                className="d-flex justify-content-end gap-3"
                style={{ padding: "10px 20px" }}
              >
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="form-select w-auto"
                >
                  <option value={10}>10 Per Page</option>
                  <option value={25}>25 Per Page</option>
                  <option value={50}>50 Per Page</option>
                  <option value={100}>100 Per Page</option>
                </select>
                <span
                  style={{
                    backgroundColor: "white",
                    boxShadow: "rgb(0 0 0 / 4%) 0px 3px 8px",
                    padding: "7px",
                    borderRadius: "5px",
                    border: "1px solid #e4e0e0ff",
                    color: "gray",
                  }}
                >
                  {filteredUsers.length === 0
                    ? "0 of 0"
                    : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                        currentPage * itemsPerPage,
                        filteredUsers.length
                      )} of ${filteredUsers.length}`}
                  <button
                    style={{
                      border: "none",
                      color: "grey",
                      backgroundColor: "white",
                    }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <GrFormPrevious />
                  </button>{" "}
                  <button
                    style={{ border: "none", backgroundColor: "white" }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <MdNavigateNext />
                  </button>
                </span>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
        {/* /product list */}

        {/* Add User */}
        <div className="modal" id="add-user">
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "970px", height: "540px" }}
          >
            <div
              className="modal-content"
              style={{
                height: "100%",
                padding: "10px",
              }}
            >
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="">
                    <div className="page-title">
                      <h4
                        style={{
                          color: "#262626",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "14px",
                        }}
                      >
                        Add User
                      </h4>
                    </div>
                    <hr style={{ height: "1px", color: "#bbbbbb" }} />
                  </div>
                  <form
                    onSubmit={handleAddUser}
                    style={{ padding: "0px 20px" }}
                  >
                    {/* immg */}
                    {/* <div className="profile-pic-upload mb-2">
                              <div className="profile-pic">
                                <span>
                                  {selectedImages.length > 0 ? (
                                    <img
                                      src={URL.createObjectURL(
                                        selectedImages[0]
                                      )}
                                      alt="Preview"
                                      style={{
                                        height: "120px",
                                        width: "120px",
                                        borderRadius: "13px",
                                      }}
                                    />
                                  ) : (
                                    <>
                                      <CiCirclePlus className="plus-down-add" />{" "}
                                      Add Image
                                    </>
                                  )}{" "}
                                </span>
                              </div>
                              <div className="mb-0">
                                <div className="image-upload mb-0">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    ref={addFileInputRef}
                                    style={{ display: "none" }}
                                    onChange={(e) =>
                                      setSelectedImages(
                                        Array.from(e.target.files)
                                      )
                                    }
                                  />

                                  <div className="image-uploads">
                                    <h4
                                      style={{ cursor: "pointer" }}
                                      onClick={addHandleIconClick}
                                    >
                                      Upload Image
                                    </h4>
                                  </div>
                                </div>
                                <p className="fs-13 mt-2">
                                  JPEG, PNG up to 2 MB
                                </p>
                              </div>
                            </div> */}
                    {/* immg closed */}
                    {/*  */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "2px dashed #dadadaff",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        className="add-image-circle"
                        style={{
                          display: "flex",
                          border: "2px dashed #dadadaff",
                          width: "100px",
                          height: "100px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "grey",
                          cursor: "pointer",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        {selectedImages.length > 0 ? (
                          <img
                            src={URL.createObjectURL(selectedImages[0])}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              pointerEvents: "none",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <>
                            <span
                              style={{
                                color: "#676767",
                                fontSize: "32px",
                                fontWeight: 400,
                                lineHeight: "18px",
                              }}
                            >
                              +
                            </span>
                          </>
                        )}
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        ref={addFileInputRef}
                        style={{ display: "none" }}
                        onChange={(e) =>
                          setSelectedImages(Array.from(e.target.files))
                        }
                      />

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "5px",
                            textAlign: "center",
                            backgroundColor: " #E3F3FF",
                            color: "#1368EC",
                            border: "1px solid #BBE1FF",
                            borderRadius: "15px",
                            width: "150px",
                            height: "45px",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={Iconss}
                            alt=""
                            style={{ width: "20px", height: "20px" }}
                          />
                          <span
                            onClick={addHandleIconClick}
                            className="setting-imgupload-btn"
                          >
                            Upload Image
                          </span>
                        </div>
                        <p
                          style={{
                            color: "#888888",
                            fontFamily: '"Roboto", sans-serif',
                            fontWeight: 400,
                            fontSize: "12px",
                            marginTop: "10px",
                          }}
                        >
                          Upload an image below 2MB, Accepted File format JPG,
                          PNG
                        </p>
                      </div>

                      <div className="invisible">;lpk</div>
                    </div>
                    {/*  */}

                    <div>
                      {/* fname lname */}
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                              gap: "5px",
                            }}
                          >
                            <label
                              className="ffrrstname"
                              style={{
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "14px",
                              }}
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              className="ffrrstnameinput"
                              name="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Akash"
                            />
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                              gap: "5px",
                            }}
                          >
                            <label
                              className="ffrrstname"
                              style={{
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "14px",
                              }}
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="ffrrstnameinput"
                              name="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Kumar"
                            />
                          </div>
                        </div>
                      </div>
                      {/* fname lname end*/}

                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        <div
                          style={{
                            flex: "0 0 50%",
                            display: "flex",
                            gap: "20px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                              gap: "5px",
                            }}
                          >
                            <label
                              className="ffrrstname"
                              style={{
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "14px",
                              }}
                            >
                              Role
                            </label>

                            <Select
                              options={activeRoles}
                              value={selectedRole}
                              onChange={setSelectedRole}
                              placeholder="select a role..."
                              isSearchable
                              // style={{
                              //   backgroundColor: "#FBFBFB",
                              //   color: "#676767",
                              //   fontSize: "14px",
                              //   fontWeight: 400,
                              //   lineHeight: "18px"
                              // }}
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  backgroundColor: "#FBFBFB",
                                  border: "1px solid #C2C2C2",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  color: "#676767",
                                  outline: "none",
                                }),
                              }}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            flex: "0 0 48%",
                            display: "flex",
                            gap: "20px",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: "5px",
                              }}
                            >
                              <label
                                className="ffrrstname"
                                style={{
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "14px",
                                }}
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="ffrrstnameinput"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="akash@gmail.com"
                              />
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: "5px",
                              }}
                            >
                              <label
                                className="ffrrstname"
                                style={{
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "14px",
                                }}
                              >
                                Phone
                              </label>
                              <input
                                type="tel"
                                className="ffrrstnameinput"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="9876543210"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        <div
                          style={{
                            flex: "0 0 50%",
                            display: "flex",
                            gap: "20px",
                          }}
                        >
                          <div style={{ flex: "1" }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: "5px",
                              }}
                            >
                              <label
                                className="ffrrstname"
                                style={{
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "14px",
                                }}
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                className="ffrrstnameinput"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password@123"
                              />
                            </div>
                          </div>
                          <div style={{ flex: "1" }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: "5px",
                              }}
                            >
                              <label
                                className="ffrrstname"
                                style={{
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "14px",
                                }}
                              >
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                className="ffrrstnameinput"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                placeholder="Password@123"
                              />
                              <i className="ti ti-eye-off toggle-password" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          flex: "0 0 50%",
                          display: "flex",
                          gap: "20px",
                        }}
                      >
                        <div style={{ flex: "1" }}>
                          <label
                            className="ffrrstname"
                            style={{
                              fontWeight: "400",
                              fontSize: "14px",
                              lineHeight: "14px",
                            }}
                          >
                            Status
                          </label>
                          <div className="dropdown">
                            <button
                              className="btn btn-light dropdown-toggle"
                              type="button"
                              id="roleStatus"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {status ? "Active" : "Inactive"}
                              <BiChevronDown />
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="statusDropdown"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  onClick={() => setStatus(true)}
                                >
                                  Active
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  onClick={() => setStatus(false)}
                                >
                                  Inactive
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* <input
                            type="checkbox"
                            id="user1"
                            className="check"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                          />
                          <label htmlFor="user1" className="checktoggle">
                            {" "}
                          </label> */}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "10px",
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "14px",
                      }}
                    >
                      <button
                        data-bs-dismiss="modal"
                        style={{
                          border: "1px solid #E6E6E6",
                          borderRadius: "4px",
                          padding: "8px",
                          backgroundColor: "#FFFFFF",
                          color: "#676767",
                          borderRadius: "5px",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        // className="settingbtn"
                        style={{
                          border: "1px solid #676767",
                          borderRadius: "4px",
                          padding: "8px",
                          backgroundColor: "#262626",
                          color: "#FFFFFF",
                          borderRadius: "5px",
                        }}
                      >
                        Add User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add User Modal Component */}
        {/* <AddUserModal
        activeRoles={activeRoles}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      /> */}

        {/* Edit User */}
        <div className="modal" id="edit-user">
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "970px", height: "540px" }}
          >
            <div
              className="modal-content"
              style={{
                height: "100%",
                padding: "10px",
              }}
            >
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="">
                    <div className="page-title">
                      <h4
                        style={{
                          color: "#262626",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "14px",
                        }}
                      >
                        Edit User
                      </h4>
                    </div>
                    <hr style={{ height: "1px", color: "#bbbbbb" }} />
                    {/* <button
                      type="button"
                      className="close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="edit-user-close-btn"
                    >
                      <span aria-hidden="true">×</span>
                    </button> */}
                  </div>
                  <form onSubmit={handleUpdate} style={{ padding: "0px 20px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "2px dashed #dadadaff",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={
                          typeof editUserData.profileImage === "string"
                            ? editUserData.profileImage
                            : editUserData.profileImage
                            ? URL.createObjectURL(editUserData.profileImage) //newly selected file
                            : "assets/img/users/user-49.png"
                        }
                        className="object-fit-cover h-100 rounded-1"
                        alt="user"
                        style={{
                          height: "120px",
                          width: "120px",
                          borderRadius: "13px",
                        }}
                      />

                      <div className="mb-3">
                        <div className="image-upload mb-0">
                          <input
                            type="file"
                            accept="image/*"
                            ref={editFileInputRef}
                            onChange={(e) =>
                              setEditUserData({
                                ...editUserData,
                                profileImage: e.target.files[0],
                              })
                            }
                          />
                          <div className="image-uploads">
                            <h4
                              style={{ cursor: "pointer" }}
                              onClick={editHandleIconClick}
                            >
                              Change Image
                            </h4>
                          </div>
                        </div>
                        <p className="mt-2">JPEG, PNG up to 2 MB</p>
                      </div>
                    </div>

                    {/* First Name Last Name */}
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: "5px",
                          }}
                        >
                          <label
                            className="ffrrstname"
                            style={{
                              fontWeight: "400",
                              fontSize: "14px",
                              lineHeight: "14px",
                            }}
                          >
                            First Name 
                          </label>
                          <input
                            type="text"
                            className="ffrrstnameinput"
                            value={editUserData.firstName}
                            onChange={(e) =>
                              setEditUserData({
                                ...editUserData,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: "5px",
                          }}
                        >
                          <label
                            className="ffrrstname"
                            style={{
                              fontWeight: "400",
                              fontSize: "14px",
                              lineHeight: "14px",
                            }}
                          >
                            Last Name 
                          </label>
                          <input
                            type="text"
                            className="ffrrstnameinput"
                            value={editUserData.lastName}
                            onChange={(e) =>
                              setEditUserData({
                                ...editUserData,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Role */}
                    <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          marginBottom: "20px",
                        }}
                      >

                      <div
                          style={{
                            flex: "0 0 50%",
                            display: "flex",
                            gap: "20px",
                          }}
                        >
                        <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                              gap: "5px",
                            }}
                          >

                        <label  className="ffrrstname"
                              style={{
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "14px",
                              }}
>
                          Role
                        </label>
                        <Select
                          options={activeRoles}
                          value={editUserData.role}
                          isDisabled={
                            editUserData.role.label === "Unknown Role"
                          }
                          onChange={(selectedOption) => {
                            setEditUserData({
                              ...editUserData,
                              role: selectedOption,
                            });
                          }}
                          placeholder="Search or select a role..."
                          isSearchable
                           styles={{
                                control: (base) => ({
                                  ...base,
                                  backgroundColor: "#FBFBFB",
                                   border: "1px solid #C2C2C2",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  color: "#676767",
                                  outline:"none"
                                }),
                              }}
                        />
                        </div>
                        </div>
                      {/* Email */}
                    <div
                          style={{
                            flex: "0 0 48%",
                            display: "flex",
                            gap: "20px",
                          }}
                        >

                      <div style={{ flex: 1 }}>
                        <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: "5px",
                              }}
                            >

                        <label  className="ffrrstname"
                                style={{
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "14px",
                                }}
>Email </label>
                        <input
                          type="email"
                           className="ffrrstnameinput"
                          value={editUserData.email}
                          onChange={(e) =>
                            setEditUserData({
                              ...editUserData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Phone */}
                     <div style={{ flex: 1 }}>
                     <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: "5px",
                              }}
                            >
                        <label className="ffrrstname"
                                style={{
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "14px",
                                }}
>Phone </label>
                        <input
                          type="tel"
                           className="ffrrstnameinput"
                          value={editUserData.phone}
                          onChange={(e) =>
                            setEditUserData({
                              ...editUserData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Password *</label>
                        <input
                          type="password"
                          className="form-control"
                          value={editUserData.password}
                          onChange={(e) =>
                            setEditUserData({
                              ...editUserData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Confirm Password *</label>
                        <input
                          type="password"
                          className="form-control"
                          value={editUserData.confirmPassword}
                          onChange={(e) =>
                            setEditUserData({
                              ...editUserData,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-lg-12">
                      <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                        <span className="status-label">Status</span>
                        <input
                          type="checkbox"
                          id="user-status"
                          className="check"
                          checked={editUserData.status}
                          onChange={(e) =>
                            setEditUserData({
                              ...editUserData,
                              status: e.target.checked,
                            })
                          }
                        />
                        <label htmlFor="user-status" className="checktoggle" />
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn me-2 btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
