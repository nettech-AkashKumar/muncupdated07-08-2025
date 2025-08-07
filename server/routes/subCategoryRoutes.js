// 📁 routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/Multer/multer");
const { addSubcategory,getAllSubcategories,deleteSubcategory ,updateSubcategory,getSubcategoriesByCategory } = require("../controllers/subCategoryController");

router.post("/categories/:categoryId/subcategories", upload.array("images", 5), addSubcategory);
router.get("/subcategories",getAllSubcategories);
router.put("/subcategory/:id", upload.array("images"), updateSubcategory);
router.delete("/subcategories/:id",deleteSubcategory);
// GET /api/subcategory/by-category/:categoryId
router.get('/by-category/:categoryId',getSubcategoriesByCategory);




module.exports = router;