// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  bulkAssignCategoryCodes,
  bulkDeleteCategories
//   getNextCategoryCode
} = require("../controllers/categoryController");


router.post("/categories", createCategory);        // CREATE
router.get("/categories", getAllCategories);       // READ ALL
router.get("/categories/:id", getCategoryById);    // READ ONE
router.put("/categories/:id", updateCategory);     // UPDATE
router.delete("/categories/:id", deleteCategory);  // DELETE
// router.get("/next-category-code", getNextCategoryCode);
router.post("/bulk-assign-codes", bulkAssignCategoryCodes);
router.post("/categories/bulk-delete", bulkDeleteCategories);

module.exports = router;
