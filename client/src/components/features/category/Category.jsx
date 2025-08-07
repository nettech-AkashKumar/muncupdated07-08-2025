import React, { useEffect, useState } from "react";
import BASE_URL from "../../../pages/config/config";
import axios from "axios";
import { TbChevronUp, TbEdit, TbTrash } from "react-icons/tb";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";
import CategoryModal from "../../../pages/Modal/categoryModals/CategoryModal";
import DeleteAlert from "../../../utils/sweetAlert/DeleteAlert";
import Swal from "sweetalert2";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // edit
  const [editingCategories, setEditingCategories] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategorySlug, setEditCategorySlug] = useState("");
  const [, setEditMode] = useState(false);

  // Control modal mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleBulkDelete = async () => {
    const confirmed = await DeleteAlert({});
    if (!confirmed) return;

    try {
      await axios.post(`${BASE_URL}/api/category/categories/bulk-delete`, {
        ids: selectedCategories,
      });
      toast.success("Selected categories deleted");
      setSelectedCategories([]);
      fetchCategories();
    } catch (err) {
      console.log(err);

      toast.error("Bulk delete failed");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/category/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categorySlug) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/category/categories`, {
        categoryName: categoryName,
        categorySlug: categorySlug,
      });

      toast.success("Category created successfully!");

      // Reset form
      setCategoryName("");
      setCategorySlug("");
      // Refresh list
      fetchCategories();
      // Close modal
      // window.$("#categoryModal").modal("hide");
    } catch (err) {
      console.error("Error creating category:", err);
      toast.error(err.response?.data?.message || "Error creating category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${BASE_URL}/api/category/categories/${editingCategories._id}`,
        {
          categoryName: editCategoryName,
          categorySlug: editCategorySlug,
        }
      );
      console.log("Editing Countries ID:", editingCategories?._id);

      toast.success("State updated");
      setEditMode(false);
      setEditingCategories(null);
      setEditCategoryName("");
      setEditCategorySlug("");
      fetchCategories(); // Call state list refresh, not fetchCountries
      window.$(`#categoryModal`).modal("hide");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const filteredCategories = categories.filter(
    (categories) =>
      (categories?.categoryName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (categories?.categorySlug || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedCategories = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleDeleteCategory = async (id, categoryName) => {
    const confirmed = await DeleteAlert({});
    if (!confirmed) return;

    try {
      await axios.delete(`${BASE_URL}/api/category/categories/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories(); // refresh list
      Swal.fire(
        "Deleted!",
        `Category "${categoryName}" has been deleted.`,
        "success"
      );
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4 className="fw-bold">Category</h4>
              <h6>Manage your categories</h6>
            </div>
          </div>
          {/* <ul className="table-top-head">
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img src="assets/img/icons/pdf.svg" alt="img" /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img src="assets/img/icons/excel.svg" alt="img" /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i className="ti ti-refresh" /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i className="ti ti-chevron-up" /></a>
        </li>
      </ul> */}
          <div className="table-top-head me-2">
            <li>
              <button type="button" className="icon-btn" title="Pdf">
                <FaFilePdf />
              </button>
            </li>
            <li>
              <label className="icon-btn m-0" title="Import Excel">
                <input type="file" accept=".xlsx, .xls" hidden />
                <FaFileExcel style={{ color: "green" }} />
              </label>
            </li>
            <li>
              <button type="button" className="icon-btn" title="Export Excel">
                <FaFileExcel />
              </button>
            </li>
          </div>
          <div className="page-btn">
            {/* <a
              href="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#categoryModal  "
              onClick={() => {
                setIsEditMode(false);
                setCategoryName("");
                setCategorySlug("");
                setEditMode(false);
              }}
            >
              <i className="ti ti-circle-plus me-1" />
              Add Category
            </a> */}
            <a
              href="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#categoryModal"
              onClick={() => {
                setIsEditMode(false);
                setCategoryName("");
                setCategorySlug("");
              }}
            >
              <i className="ti ti-circle-plus me-1" />
              Add Category
            </a>
          </div>
        </div>
        {selectedCategories.length > 0 && (
          <div className="mb-3">
            <button className="btn btn-danger" onClick={handleBulkDelete}>
              Delete Selected ({selectedCategories.length})
            </button>
          </div>
        )}
        {/* /product list */}
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div className="search-set">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search country..."
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
              <div className="dropdown">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  Status
                </a>
                <ul className="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item rounded-1"
                    >
                      Active
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item rounded-1"
                    >
                      Inactive
                    </a>
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
                      <input
                        type="checkbox"
                        checked={
                          paginatedCategories.length > 0 &&
                          paginatedCategories.every((cat) =>
                            selectedCategories.includes(cat._id)
                          )
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            const newIds = paginatedCategories.map((cat) => cat._id);
                            setSelectedCategories((prev) => [...new Set([...prev, ...newIds])]);
                          } else {
                            const idsToRemove = paginatedCategories.map((cat) => cat._id);
                            setSelectedCategories((prev) =>
                              prev.filter((id) => !idsToRemove.includes(id))
                            );
                          }
                        }}
                      />
                        <span className="checkmarks" />
                      </label>
                    </th>
                    <th>Category Code</th>
                    <th>Category</th>
                    <th>Category slug</th>
                    <th>Created On</th>
                    <th className="no-sort" />
                  </tr>
                </thead>
                <tbody>
                  {paginatedCategories.length > 0 ? (
                    paginatedCategories.map((category) => (
                      <tr key={category._id}>
                        <td>
                          <label className="checkboxs">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories((prev) => [...prev, category._id]);
                              } else {
                                setSelectedCategories((prev) =>
                                  prev.filter((id) => id !== category._id)
                                );
                              }
                            }}
                          />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>
                          <span className="text-gray-9">
                            {category.categoryCode}
                          </span>
                        </td>
                        <td>
                          <span className="text-gray-9">
                            {category.categoryName}
                          </span>
                        </td>
                        <td>{category.categorySlug}</td>
                        <td>{new Date(category.createdAt).toLocaleString()}</td>

                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            {/* <a
                              className="me-2 p-2"
                              data-bs-toggle="modal"
                              data-bs-target="#categoryModal"
                              onClick={() => {
                                setIsEditMode(true);
                                setEditingCategories(category);
                                setEditCategoryName(category.categoryName);
                                setEditCategorySlug(category.categorySlug);
                              }}
                            >
                              <TbEdit />
                            </a> */}
                            <a
                              className="me-2 p-2"
                              data-bs-toggle="modal"
                              data-bs-target="#categoryModal"
                              onClick={() => {
                                setIsEditMode(true);
                                setEditingCategories(category);
                                setEditCategoryName(category.categoryName);
                                setEditCategorySlug(category.categorySlug);
                              }}
                            >
                              <TbEdit />
                            </a>

                            <a
                              className="p-2"
                              onClick={() =>
                                handleDeleteCategory(
                                  category._id,
                                  category.categoryName
                                )
                              }
                            >
                              <TbTrash />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* pagination */}
            <div className="d-flex justify-content-between align-items-center p-3">
          {/* <div>
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredCategories.length)} of{" "}
            {filteredCategories.length}
          </div> */}
          <div className="d-flex justify-content-end align-items-center">
  <label className="me-2">Items per page:</label>
  <select
    value={itemsPerPage}
    onChange={(e) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(1); // reset to first page
    }}
    className="form-select w-auto"
  >
    <option value={10}>10</option>
    <option value={25}>25</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
  </select>
</div>
          <div>
            <button
              className="btn btn-light btn-sm me-2"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm me-1 ${
                  currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-light btn-sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
          </div>
        </div>
        {/* /product list */}
        
      </div>
      {/* <CategoryModal
        modalId="categoryModal"
        title={isEditMode ? "Edit Category" : "Add Category"}
        categoryName={isEditMode ? editCategoryName : setCategoryName}
        categorySlug={isEditMode ? editCategorySlug : setCategorySlug}
        onCategoryChange={
          isEditMode
            ? (e) => setEditCategoryName(e.target.value)
            : (e) => setCategoryName(e.target.value)
        }
        onSlugChange={
          isEditMode
            ? (e) => setEditCategorySlug(e.target.value)
            : (e) => setCategorySlug(e.target.value)
        }
        onSubmit={isEditMode ? handleUpdate : handleSubmit}
        submitLabel={isEditMode ? "Update" : "Submit"}
      /> */}

      <CategoryModal
        modalId="categoryModal"
        title={isEditMode ? "Edit Category" : "Add Category"}
        isEditMode={isEditMode}
        categoryName={isEditMode ? editCategoryName : categoryName}
        categorySlug={isEditMode ? editCategorySlug : categorySlug}
        onCategoryChange={
          isEditMode
            ? (e) => setEditCategoryName(e.target.value)
            : (e) => setCategoryName(e.target.value)
        }
        onSlugChange={
          isEditMode
            ? (e) => setEditCategorySlug(e.target.value)
            : (e) => setCategorySlug(e.target.value)
        }
        onSubmit={isEditMode ? handleUpdate : handleSubmit}
        submitLabel={isEditMode ? "Update" : "Submit"}
      />

      {/* <CategoryModal
          modalId="add-category"
          title="Add Category"
          categoryName={categoryName}
          categorySlug={categorySlug}
          onCategoryChange={(e) => setCategoryName(e.target.value)}
          onSlugChange={(e) => setCategorySlug(e.target.value)}
          onSubmit={handleSubmit}
          submitLabel="Add Category"
        />
    
        <CategoryModal
          modalId="edit-category"
          title="Edit category"
          editCategoryName={editCategoryName}
          editCategorySlug={editCategorySlug}
          onCategoryChange={(e) => setEditCategoryName(e.target.value)}
          onSlugChange={(e) => setEditCategorySlug(e.target.value)}
          onSubmit={handleUpdate}
          submitLabel="Update Category"
        />
       */}
      {/* /Add Category */}
    </div>
  );
};

export default Category;
