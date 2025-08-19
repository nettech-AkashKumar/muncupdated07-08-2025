const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductsByName,
  importProducts,
  getProductStock,

  getPurchaseReturnStock,
} = require("../controllers/productController");


const upload = require("../middleware/Multer/multer"); // ✅ fix double slash
const path = require("path");

// Product stock API
router.get("/stock", getProductStock);
// Purchase return stock API (must be above /:id)


router.post("/create", upload.array("images", 10), createProduct);

// ✅ New route: import products from CSV/Excel
router.post("/import", upload.single("file"), importProducts);

// ✅ Existing routes
router.get("/search", searchProductsByName); // ✅ must come before /products/:id

router.get("/", getAllProducts);         // Read All
router.get("/:id", getProductById);      // Read Single
router.put("/:id", updateProduct);       // Update
router.delete("/:id", deleteProduct);    // Delete





module.exports = router;
