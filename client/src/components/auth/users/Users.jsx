import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { TbEdit, TbEye, TbSearch, TbTrash } from "react-icons/tb";
import BASE_URL from "../../../pages/config/config";
import Select from "react-select";
import { CiCirclePlus } from "react-icons/ci";
import AddUserModal from "../../../pages/Modal/users/AddUserModal";
import { toast } from "react-toastify";

const Users = () => {
  const [activeRoles, setActiveRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("  ")
  const [selectedStatus, setSelectedStatus] = useState("")  //for active , inactive
  const addFileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const addHandleIconClick = () => {
    if (addFileInputRef.current) {
      addFileInputRef.current.click();
    } else {
      console.warn('addFileInputRef is null');
    }
  };
   const editHandleIconClick = () => {
    if (editFileInputRef.current) {
      editFileInputRef.current.click();
    } else {
      console.warn('editFileInputRef is null');
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

  const [selectedImages, setSelectedImages] = useState([]);
  console.log(users);
  console.log("Uploaded image:", profileImage?.[0]?.url);

  const [editUserId, setEditUserdId] = useState(null);

  const [editUserData, setEditUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: '',
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
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const filteredUsers = useMemo(() => {
    if(!searchTerm || !users.length || !activeRoles.length) return users;
    return users.filter((user) => {
    let roleName = "";

    // Case 1: user.role is a populated object with roleName
    if (typeof user.role === "object" && user.role?.roleName) {
      roleName = user.role.roleName;
    }

    // Case 2: user.role is an ID, look it up from activeRoles
    else if (typeof user.role === "string") {
      const matchedRole = activeRoles.find((r) => String(r.value) === String(user.role));
      roleName = matchedRole?.label || "";
    }

else if (typeof user.role === "object" && user.role?._id) {
  const matchedRole = activeRoles.find((r) => String(r.value) === String(user.role._id));
  roleName = matchedRole?.label || "";

}

const matchesSearch = roleName.toLowerCase().includes(searchTerm.trim().toLowerCase())
const matchesStatus = selectedStatus ? user.status === selectedStatus : true

    return matchesSearch && matchesStatus;
  });
  }, [searchTerm, selectedStatus, users, activeRoles])



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
      formData.append('firstName', editUserData.firstName);
      formData.append('lastName', editUserData.lastName);
      formData.append('email', editUserData.email);
      formData.append('phone', editUserData.phone);

      // Role handling
      if (editUserData.role?.value) {
        formData.append('role', editUserData.role.value);
      } else if (typeof editUserData.role === 'string') {
        formData.append('role', editUserData.role);
      }

      formData.append('status', editUserData.status ? "Active" : "Inactive");

      if (editUserData.profileImage && typeof editUserData.profileImage !== 'string') {
        formData.append('profileImage', editUserData.profileImage);
      }

      await axios.put(`${BASE_URL}/api/user/update/${editUserId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('User updated successfully');
      fetchUsers();
      window.$(`#edit-user`).modal("hide");

    } catch (error) {
      toast.error('Failed to update user');
      console.error(error);
    }
  };


  const handleOpenEditModal = (user) => {
    const getMatchingRole = (roleId) => {
      return activeRoles.find((role) => role.value === roleId)
    }
    const roleId = typeof user.role === "string" ? user.role : user.role?._id || user.role?.value;
    const selectedRole = getMatchingRole(roleId)

    setEditUserdId(user._id);

    // // Find the selected role from activeRoles
    // const selectedRole = activeRoles.find(role => role.value === user.role);

    setEditUserData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      role: selectedRole || { label: 'Unknown Role', value: user.role }, // fallback
      status: user.status ?? true,
      // profileImage: null, // only updated if changed
      profileImage: typeof user.profileImage === "string"
      ? user.profileImage
      : user.profileImage?.url || null

    });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4 className="fw-bold">Users</h4>
              <h6>Manage your users</h6>
            </div>
          </div>
          <div className="table-top-head me-2">
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
          </div>
          <div className="page-btn">
            <a
              href="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add-user"
            >
              <CiCirclePlus className=" me-1" />
              Add User
            </a>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div className="search-set">
              <div className="search-input" style={{position:'relative'}}>
                <span className="btn-searchset position-relative" style={{display:'flex', justifyContent:'space-between'}}>
                  {/* {searchTerm === '' && (
                    <TbSearch
                      className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      size={20}
                      style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none'}}
                    />
                  )} */}
                  <input
                    type="text"
                    placeholder="Search roles..."
                    className="form-control ps-5"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{paddingLeft:'20px'}}
                  />
                </span>
              </div>
            </div>
            <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3" style={{gap:'10px', alignItems:'center'}}>
              <div className="dropdown">
                <button
                  className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                  style={{backgroundColor:'#fff',
                    border:'1px solid #ccc',
                    color:'#333',
                    padding:'8px 12px',
                    borderRadius:'6px',
                    fontSize:'14px'
                  }}
                >
                  {selectedStatus || 'Status'}
                </button>
                <ul className="dropdown-menu  dropdown-menu-end p-3" style={{minWidth:'150px'}}>
                  <li>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => setSelectedStatus("Active")}
                      style={{
                        color:'#333',
                        padding:'6px 10px',
                        backgroundColor:selectedStatus === 'Active' ? '#fofofo' :'transparent'
                      }}
                    >
                      Active
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => setSelectedStatus("Inactive")}
                      style={{
                        color:'#333',
                        padding:'6px 10px',
                        backgroundColor:selectedStatus === 'Active' ? '#fofofo' :'transparent'
                      }}
                    >
                      Inactive
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => setSelectedStatus("")}
                      style={{
                        color:'#333',
                        padding:'6px 10px',
                        backgroundColor:selectedStatus === 'Active' ? '#fofofo' :'transparent'
                      }}
                    >
                      Clear Filter
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table datatable">
                <thead className="thead-light">
                  <tr>
                    <th className="no-sort">
                      <label className="checkboxs">
                        <input type="checkbox" id="select-all" />
                        <span className="checkmarks" />
                      </label>
                    </th>
                    <th>User Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="no-sort" />
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <a
                              href="javascript:void(0);"
                              className="avatar avatar-md me-2"
                            >

                              
                              {user.profileImage &&
                                user.profileImage.url ? (
                                <img
                                  src={user.profileImage.url}
                                  alt="Profile"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "10%",
                                  }}
                                />
                              ) : (
                                <div
                                  className="bg-secondary text-white  d-flex justify-content-center align-items-center"
                                  style={{ width: "40px", height: "40px" }}
                                >
                                  {user.firstName?.charAt(0)}
                                  {user.lastName?.charAt(0)}
                                </div>
                              )}
                            </a>
                            <a>
                              {" "}
                              <td>
                                {user.firstName} {user.lastName}
                              </td>
                            </a>
                          </div>
                        </td>
                        <td>{user.phone}</td>
                        <td>
                          <a className="email">{user.email}</a>
                        </td>
                        <td>{user.role?.roleName}</td>
                        <td>
                          <span
                            className={`badge table-badge fw-medium fs-10 ${user.status === "Active"
                              ? "bg-success"
                              : "bg-danger"
                              }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <a className="me-2 p-2">
                              <TbEye />
                            </a>
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
                      <td colSpan="6" className="text-center text-muted">
                        No Users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* /product list */}

        {/* Add User */}
        <div className="modal " id="add-user">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{width:'500px'}}>
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header">
                    <div className="page-title">
                      <h4>Add User</h4>
                    </div>
                    <button
                      type="button"
                      className="close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={handleAddUser}>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="new-employee-field">
                            <div className="profile-pic-upload mb-2">
                              <div className="profile-pic">
                                {/* <span>
                                  <i
                                    data-feather="plus-circle"
                                    className="plus-down-add"
                                  />
                                  Add Image
                                </span> */}
                                <span>
                                  {selectedImages.length > 0 ? (
                                    <img
                                      src={URL.createObjectURL(
                                        selectedImages[0]
                                      )}
                                      alt="Preview"
                                      style={{height:'120px', width:'120px', borderRadius:'13px'}}
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
                                    style={{ display: 'none' }}
                                    onChange={(e) =>
                                      setSelectedImages(
                                        Array.from(e.target.files)
                                      )
                                    }
                                  />

                                  <div className="image-uploads">
                                    <h4 style={{cursor:'pointer'}} onClick={addHandleIconClick}>Upload Image</h4>
                                  </div>
                                </div>
                                <p className="fs-13 mt-2">
                                  JPEG, PNG up to 2 MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              First Name
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Last Name
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Role<span className="text-danger ms-1">*</span>
                            </label>

                            <Select
                              options={activeRoles}
                              value={selectedRole}
                              onChange={setSelectedRole}
                              placeholder="Search or select a role..."
                              isSearchable
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Email<span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Phone<span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              name="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Password
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <div className="pass-group">
                              <input
                                type="password"
                                className="pass-input form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              {/* <TbEye className="ti ti-eye-off toggle-password" /> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Confirm Password
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <div className="pass-group">
                              <input
                                type="password"
                                className="pass-input form-control"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                              <i className="ti ti-eye-off toggle-password" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                            <span className="status-label">Status</span>
                            <input
                              type="checkbox"
                              id="user1"
                              className="check"
                              checked={status}
                              onChange={(e) => setStatus(e.target.checked)}
                            />
                            <label htmlFor="user1" className="checktoggle">
                              {" "}
                            </label>
                          </div>
                        </div>
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
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{width:'500px'}}>
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header">
                    <div className="page-title">
                      <h4>Edit User</h4>
                    </div>
                    <button
                      type="button"
                      className="close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="edit-user-close-btn"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={handleUpdate}>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="new-employee-field">
                            <div className="profile-pic-upload image-field">
                              <div className="profile-pic p-2">
                                <img
                                  src={
                                    typeof editUserData.profileImage === "string"
                                      ? editUserData.profileImage
                                      : editUserData.profileImage
                                        ? URL.createObjectURL(editUserData.profileImage)  //newly selected file
                                        : 'assets/img/users/user-49.png'
                                  }
                                  className="object-fit-cover h-100 rounded-1"
                                  alt="user"
                                  style={{height:'120px', width:'120px', borderRadius:'13px'}}
                                />
                              </div>
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
                                    <h4 style={{cursor:'pointer'}} onClick={editHandleIconClick}>Change Image</h4>
                                  </div>
                                </div>
                                <p className="mt-2">JPEG, PNG up to 2 MB</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* First Name */}
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">First Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={editUserData.firstName}
                              onChange={(e) =>
                                setEditUserData({ ...editUserData, firstName: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        {/* Last Name */}
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Last Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={editUserData.lastName}
                              onChange={(e) =>
                                setEditUserData({ ...editUserData, lastName: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        {/* Role */}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Role<span className="text-danger ms-1">*</span>
                            </label>
                            <Select
                              options={activeRoles}
                              value={editUserData.role}
                              isDisabled={editUserData.role.label === "Unknown Role"}
                              onChange={(selectedOption) => {
                                
                                setEditUserData({ ...editUserData, role: selectedOption });
                              }}
                              placeholder="Search or select a role..."
                              isSearchable
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Email *</label>
                            <input
                              type="email"
                              className="form-control"
                              value={editUserData.email}
                              onChange={(e) =>
                                setEditUserData({ ...editUserData, email: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Phone *</label>
                            <input
                              type="tel"
                              className="form-control"
                              value={editUserData.phone}
                              onChange={(e) =>
                                setEditUserData({ ...editUserData, phone: e.target.value })
                              }
                            />
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
                                setEditUserData({ ...editUserData, password: e.target.value })
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
                                setEditUserData({ ...editUserData, confirmPassword: e.target.value })
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
                                setEditUserData({ ...editUserData, status: e.target.checked })
                              }
                            />
                            <label htmlFor="user-status" className="checktoggle" />
                          </div>
                        </div>
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
