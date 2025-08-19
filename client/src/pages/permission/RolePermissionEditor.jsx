// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Select from "react-select";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../../styles/permissions.css"; // Ensure this includes switch styling
// import BASE_URL from "../config/config";

// const Permission = () => {
//   const [roles, setRoles] = useState([]);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [rolePermissions, setRolePermissions] = useState({});

//   const modules = [
//     "Brand",
//     "Category",
//     "Product",
//     "Purchase",
//     "Purchase Return",
//     "Sales",
//     "Sales Return",
//     "Customer",
//     "Supplier",
//     "User",
//     "Role",
//     "Permission",
//     "Setting",
//   ];

//   const permissionFields = ["Allow All", "View", "Create", "Update", "Delete"];

//   // Fetch roles
//   const fetchRoles = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/role/getRole`);
//       setRoles(res.data);
//     } catch (err) {
//       console.error("Error fetching roles", err);
//     }
//   };

//   // When role selected, fetch its permissions
//   const fetchRolePermissions = async (roleId) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/role/${roleId}`);
//       setRolePermissions(res.data.modulePermissions || {});
//     } catch (err) {
//       console.error("Error fetching role permissions", err);
//     }
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   useEffect(() => {
//     if (selectedRole) {
//       fetchRolePermissions(selectedRole._id);
//     }
//   }, [selectedRole]);

//   const handlePermissionChange = (module, permissionType) => {
//     const key = permissionType === "Allow All" ? "all" : permissionType.toLowerCase();
//     const updatedPermissions = { ...rolePermissions };

//     if (!updatedPermissions[module]) {
//       updatedPermissions[module] = {};
//     }

//     updatedPermissions[module][key] = !updatedPermissions[module][key];

//     // Sync individual permissions if 'all' is toggled
//     if (key === "all") {
//       permissionFields
//         .filter(p => p !== "Allow All")
//         .forEach(p => {
//           updatedPermissions[module][p.toLowerCase()] = updatedPermissions[module][key];
//         });
//     }

//     setRolePermissions(updatedPermissions);
//   };

//   const handleSubmit = async () => {
//     if (!selectedRole) {
//       toast.warn("Please select a role.");
//       return;
//     }

//     try {
//       await axios.put(`${BASE_URL}/api/role/update/${selectedRole._id}`, {
//         modulePermissions: rolePermissions,
//       });
//       toast.success("Permissions updated successfully.");
//     } catch (err) {
//       console.error("Error updating permissions", err);
//       toast.error("Failed to update permissions.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Permission Management</h3>

//       <div className="my-3" style={{ width: 300 }}>
//         <Select
//           options={roles.map(r => ({ value: r._id, label: r.name }))}
//           onChange={selected => {
//             const role = roles.find(r => r._id === selected.value);
//             setSelectedRole(role);
//           }}
//           value={selectedRole ? { value: selectedRole._id, label: selectedRole.name } : null}
//           placeholder="Select Role"
//         />
//       </div>

//       {selectedRole && (
//         <div className="table-responsive mt-4">
//           <table className="table table-bordered text-center">
//             <thead className="table-dark">
//               <tr>
//                 <th>Module</th>
//                 {permissionFields.map(p => (
//                   <th key={p}>{p}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {modules.map(module => {
//                 const perms = rolePermissions[module] || {};
//                 return (
//                   <tr key={module}>
//                     <td>{module}</td>
//                     {permissionFields.map(p => {
//                       const key = p === "Allow All" ? "all" : p.toLowerCase();
//                       return (
//                         <td key={p}>
//                           <label className="switch">
//                             <input
//                               type="checkbox"
//                               checked={!!perms[key]}
//                               onChange={() => handlePermissionChange(module, p)}
//                             />
//                             <span className="slider"></span>
//                           </label>
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           <div className="mt-3 text-end">
//             <button className="btn btn-success" onClick={handleSubmit}>
//               Save Permissions
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Permission;



// final code for RolePermissionEditor.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config/config";
import "../../styles/permissions.css"; // Ensure this includes switch styling
import { useParams } from "react-router-dom";
import { HiMiniChevronUpDown } from "react-icons/hi2";

const modules = ["Brand", "Category", "Product"];
const permissionFields = ["Allow All", "Read", "Write", "Update", "Delete", "Import", "Export"];

const Permission = () => {
  const { roleId } = useParams();
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  // auto select the role if id exists
  useEffect(() => {
    if (roleId && roles.length > 0) {
      const found = roles.find((role) => role._id === roleId);
      if (found) setSelectedRole(found);
    }
  }, [roleId, roles]);

  useEffect(() => {
    if (selectedRole?._id) {
      fetchRolePermissions(selectedRole._id);
    } else {
      setRolePermissions({});
    }
  }, [selectedRole]);

  // const fetchRoles = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/role/getRole`);
  //     setRoles(res.data);

  //     const roleName = localStorage.getItem("selectedRoleName");
  //     if (roleName) {
  //       const matched = res.data.find((role) => role.roleName === roleName);
  //       if (matched) {
  //         setSelectedRole(matched);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error fetching roles", err);
  //   }
  // };


  //   const fetchRoles = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/role/getRole`);
  //     setRoles(res.data);
  //   } catch (err) {
  //     console.error("Error fetching roles", err);
  //   }
  // };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/role/getRole`);
      setRoles(res.data);
    } catch (err) {
      console.error("Error fetching roles", err);
    }
  };

  useEffect(() => {
    if (selectedRole?._id) {
      fetchRolePermissions(selectedRole._id);
    }
  }, [selectedRole]);

  const fetchRolePermissions = async (roleId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/role/roleById/${roleId}`);
      setRolePermissions(res.data?.modulePermissions || {});
    } catch (err) {
      console.error("Error fetching role permissions", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (module, field) => {
    setRolePermissions((prev) => {
      const current = prev[module] || {
        read: false, write: false, update: false, delete: false,
        import: false, export: false, all: false
      };

      if (field === "Allow All") {
        const toggleAll = !current.all;
        return {
          ...prev,
          [module]: {
            read: toggleAll,
            write: toggleAll,
            update: toggleAll,
            delete: toggleAll,
            import: toggleAll,
            export: toggleAll,
            all: toggleAll
          }
        };
      }

      const lowerKey = field.toLowerCase();
      const updated = { ...current, [lowerKey]: !current[lowerKey] };
      updated.all = ["read", "write", "update", "delete", "import", "export"].every(key => updated[key]);

      return { ...prev, [module]: updated };
    });
  };

  const handleSubmit = async () => {
    if (!selectedRole?._id) {
      alert("Please select a role.");
      return;
    }

    try {
      await axios.put(`${BASE_URL}/api/role/update/${selectedRole._id}`, {
        modulePermissions: rolePermissions,
      });
      alert("Permissions updated successfully.");
    } catch (err) {
      console.error("Error updating permissions", err);
      alert("Failed to update permissions.");
    }
  };

  return (
    <div className="container mt-4 mngrepremsson">
      <h4 style={{
        fontFamily: "Roboto, sans-serif",
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '14px',
      }}>Role & Permission</h4>
      <hr style={{ height: '1px', color: '#bbbbbb' }} />

      <div className="slcct-dropdown-container">
        <label className="slcct-dropdown-label">Select Role</label>
        <div className="slcct-dropdown-wrapper">
          <select
            className="slcct-custom-select"
            value={selectedRole?._id || ""}
            onChange={(e) => {
              const selected = roles.find(role => role._id === e.target.value);
              setSelectedRole(selected || null);
            }}
          >
            <option value="">-- Select Role --</option>
            {roles.map(role => (
              <option key={role._id} value={role._id}>
                {role.roleName}
              </option>
            ))}
          </select>
          <span className="slcct-dropdown-icon"><HiMiniChevronUpDown /></span>
        </div>
      </div>


      {loading ? (
        <p>Loading permissions...</p>
      ) : selectedRole ? (
        <>
          <table className="table table-bordered table-hover">
            <thead style={{
              backgroundColor: '#F1F1F1', padding: '24px 24px'
            }}>
              <tr>
                <th style={{
                  color: '#676767',
                  fontFamily: "Roboto, sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '14px',
                }}>Module</th>
                {permissionFields.map(perm => (
                  <th
                    style={{
                      color: '#676767',
                      fontFamily: "Roboto, sans-serif",
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '14px',
                    }}
                    key={perm} className="text-center">{perm}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map(module => {
                const perms = rolePermissions[module] || {};
                return (
                  <tr key={module}>
                    <td
                      style={{
                        color: '#262626',
                        fontFamily: "Roboto, sans-serif",
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '14px',
                      }}
                    >{module}</td>
                    {permissionFields.map(p => {
                      const key = p === "Allow All" ? "all" : p.toLowerCase();
                      return (
                        <td key={p}>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={!!perms[key]}
                              onChange={() => handlePermissionChange(module, p)}
                            />
                            <span className="slider"></span>
                          </label>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            {/* <tbody>
              {modules.map(module => {
                const currentPerm = rolePermissions[module] || {};
                return (
                  <tr key={module}>
                    <td>{module}</td>
                    {permissionFields.map(perm => {
                      const key = perm === "Allow All" ? "all" : perm.toLowerCase();
                      return (
                        <td key={perm} className="text-center">
                          <input
                            type="checkbox"
                            checked={!!currentPerm[key]}
                            onChange={() => handlePermissionChange(module, perm)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody> */}
          </table>
          <div style={{
            display: 'flex', justifyContent: 'end', fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '14px',
          }}>
            <button className="btn btn-primary mt-3"
              style={{
                border: "1px solid #676767",
                borderRadius: '4px',
                padding: "8px",
                backgroundColor: "#262626",
                color: "#FFFFFF",
              }}
              onClick={handleSubmit}>
              Save
            </button>
          </div>
        </>
      ) : (
        <p>Please select a role to edit permissions.</p>
      )}
    </div>
  );
};

export default Permission;


// mid final
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import BASE_URL from "../config/config";

// const modules = ["Brand", "Category", "Product"];

// const permissionFields = [
//   "Allow All",
//   "Read",
//   "Write",
//   "Update",
//   "Delete",
//   "Import",
//   "Export",
// ];


// const Permission = () => {
//   const [selectedRole, setSelectedRole] = useState(null); // Store full role object
//   const [roles, setRoles] = useState([]);
//   const [rolePermissions, setRolePermissions] = useState({});
//   const [loading, setLoading] = useState(false);


//   const { role_id } = useParams();

//   useEffect(() => {
//     fetchRoles();
//   }, []);



//   // Auto-select role if role_id param is present and not already selected
//   useEffect(() => {
//     if (roles.length && role_id && (!selectedRole || selectedRole._id !== role_id)) {
//       const found = roles.find(r => r._id === role_id);
//       if (found) setSelectedRole(found);
//     }
//   }, [roles, role_id, selectedRole]);

//   useEffect(() => {
//     if (selectedRole?._id) {
//       fetchRolePermissions(selectedRole._id);
//     } else {
//       setRolePermissions({});
//     }
//   }, [selectedRole]);


//   const fetchRoles = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/role/getRole`);
//       setRoles(res.data);
//     } catch (err) {
//       console.error("Error fetching roles", err);
//     }
//   };


//   const fetchRolePermissions = async (roleId) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BASE_URL}/api/role/roleById/${roleId}`);
//       setRolePermissions(res.data?.modulePermissions || {});
//     } catch (err) {
//       console.error("Error fetching role permissions", err);
//       alert("Failed to load permissions.");
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handlePermissionChange = (module, field) => {
//     setRolePermissions((prev) => {
//       const current = prev[module] || {
//         read: false,
//         write: false,
//         update: false,
//         delete: false,
//         import: false,
//         export: false,
//         all: false,
//       };

//       if (field === "Allow All") {
//         const isAllEnabled = current.all;
//         const updated = {
//           read: !isAllEnabled,
//           write: !isAllEnabled,
//           update: !isAllEnabled,
//           delete: !isAllEnabled,
//           import: !isAllEnabled,
//           export: !isAllEnabled,
//           all: !isAllEnabled,
//         };
//         return { ...prev, [module]: updated };
//       }

//       const lowerKey = field.toLowerCase();
//       const updated = { ...current, [lowerKey]: !current[lowerKey] };

//       const allKeys = ["read", "write", "update", "delete", "import", "export"];
//       updated.all = allKeys.every((key) => updated[key]);

//       return { ...prev, [module]: updated };
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedRole?._id) {
//       alert("Please select a role.");
//       return;
//     }

//     try {
//       await axios.put(`${BASE_URL}/api/role/update/${selectedRole._id}`, {
//         modulePermissions: rolePermissions,
//       });
//       alert("Permissions updated successfully.");
//     } catch (err) {
//       console.error("Error updating permissions", err);
//       alert("Failed to update permissions.");
//     }
//   };

//   return (
//     <div className="content p-3">
//       <h4 className="mb-3">Role Permission Editor</h4>

//       <div className="mb-4">
//         <label htmlFor="role-select" className="form-label">Select Role:</label>
//         <select
//           id="role-select"
//           className="form-select"
//           value={selectedRole?._id || ""}
//           onChange={(e) => {
//             const selected = roles.find((role) => role._id === e.target.value);
//             setSelectedRole(selected || null);
//           }}
//         >
//           <option value="">-- Select Role --</option>
//           {roles.map((role) => (
//             <option key={role._id} value={role._id}>
//               {role.roleName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {loading ? (
//         <p>Loading permissions...</p>
//       ) : selectedRole ? (
//         <>
//           <table className="table table-bordered table-hover">
//             <thead>
//               <tr>
//                 <th>Module</th>
//                 {permissionFields.map((perm) => (
//                   <th key={perm} className="text-center">{perm}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {modules.map((module) => {
//                 const currentPerm = rolePermissions[module] || {};
//                 return (
//                   <tr key={module}>
//                     <td>{module}</td>
//                     {permissionFields.map((perm) => {
//                       const key = perm === "Allow All" ? "all" : perm.toLowerCase();
//                       return (
//                         <td key={perm} className="text-center">
//                           <input
//                             type="checkbox"
//                             checked={!!currentPerm[key]}
//                             onChange={() => handlePermissionChange(module, perm)}
//                           />
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           <button
//             className="btn btn-primary mt-3"
//             onClick={handleSubmit}
//           >
//             Save Permissions
//           </button>
//         </>
//       ) : (
//         <p className="text-muted">Please select a role to edit permissions.</p>
//       )}

//       <p className="mt-3 text-muted">
//         <strong>Selected Role:</strong> {selectedRole?.roleName || "None"}<br />
//         <strong>Role ID:</strong> {selectedRole?._id || "N/A"}
//       </p>
//     </div>
//   );
// };

// export default Permission;
