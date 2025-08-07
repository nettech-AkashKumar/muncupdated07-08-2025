

const Product = require("../models/productModels");
const cloudinary = require("../utils/cloudinary/cloudinary");


exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      slug,
      sku,
      brand,
      category,
      subcategory,
      supplier,
      itemBarcode,
      store,
      warehouse,
      purchasePrice,
      sellingPrice,
      wholesalePrice,
      retailPrice,
      quantity,
      unit,
      taxType,
      tax,
      discountType,
      discountValue,
      quantityAlert,
      description,
      seoTitle,
      seoDescription,
      // Other
      itemType,
      isAdvanced,
      trackType,
      isReturnable,
      leadTime,
      reorderLevel,
      initialStock,
      serialNumber,
      batchNumber,
      returnable,
      expirationDate,
    } = req.body;

    // Parse variants if provided
    const variants = req.body.variants ? JSON.parse(req.body.variants) : {};

    let images = [];

    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "product_images" })
      );

      const uploadedImages = await Promise.all(imageUploadPromises);
      images = uploadedImages.map((img) => ({
        url: img.secure_url,
        public_id: img.public_id,
      }));
    }

    const newProduct = new Product({
      productName,
      slug,
      sku,
      brand,
      category,
      subcategory,
      supplier,
      itemBarcode,
      store,
      warehouse,
      purchasePrice,
      sellingPrice,
      wholesalePrice,
      retailPrice,
      quantity,
      unit,
      taxType,
      tax,
      discountType,
      discountValue,
      quantityAlert,
      images,
      description,
      seoTitle,
      seoDescription,
      variants,
      itemType,
      isAdvanced,
      trackType,
      isReturnable,
      leadTime,
      reorderLevel,
      initialStock,
      serialNumber,
      batchNumber,
      returnable,
      expirationDate,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("brand")
      .populate("category")
      .populate("subcategory")
      .sort({ createdAt: -1 }); // Optional: latest first
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products/search?name=abc
exports.searchProductsByName = async (req, res) => {
  try {
    const { name } = req.query;
    console.log("Search query received:", name);

    const query = name
      ? { productName: { $regex: name, $options: "i" } } // ✅ Fixed field name
      : {};

    const products = await Product.find(query)
      .populate("brand")
      .populate("category")
      .populate("subcategory")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: err.message });
  }
};



// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const {
      productName,
      slug,
      sku,
      brand,
      category,
      subcategory,
      supplier,
      itemBarcode,
      store,
      warehouse,
      purchasePrice,
      sellingPrice,
      wholesalePrice,
      retailPrice,
      quantity,
      unit,
      taxType,
      tax,
      discountType,
      discountValue,
      quantityAlert,
      images,
      description,
      seoTitle,
      seoDescription,
      variants,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        slug,
        sku,
        brand,
        category,
        subcategory,
        supplier,
        itemBarcode,
        store,
        warehouse,
        purchasePrice,
        sellingPrice,
        wholesalePrice,
        retailPrice,
        quantity,
        unit,
        taxType,
        tax,
        discountType,
        discountValue,
        quantityAlert,
        images,
        description,
        seoTitle,
        seoDescription,
        variants,
      },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.importProducts = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File is required" });

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const importedProducts = [];

    for (const row of data) {
      const product = new Product({
        productName: row.productName,
        slug: row.slug,
        sku: row.sku,
        brand: row.brand, // Make sure this is an ObjectId if using ref
        category: row.category,
        subcategory: row.subcategory,
        supplier: row.supplier,
        itemBarcode: row.itemBarcode,
        store: row.store,
        warehouse: row.warehouse,
        purchasePrice: row.purchasePrice,
        sellingPrice: row.sellingPrice,
        wholesalePrice: row.wholesalePrice,
        retailPrice: row.retailPrice,
        quantity: row.quantity,
        unit: row.unit,
        taxType: row.taxType,
        tax: row.tax,
        discountType: row.discountType,
        discountValue: row.discountValue,
        quantityAlert: row.quantityAlert,
        description: row.description,
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
        variants: row.variants ? JSON.parse(row.variants) : {},
        itemType: row.itemType,
        isAdvanced: row.isAdvanced,
        trackType: row.trackType,
        isReturnable: row.isReturnable,
        leadTime: row.leadTime,
        reorderLevel: row.reorderLevel,
        initialStock: row.initialStock,
        serialNumber: row.serialNumber,
        batchNumber: row.batchNumber,
        returnable: row.returnable,
        expirationDate: row.expirationDate ? new Date(row.expirationDate) : null,
      });
      const saved = await product.save();
      importedProducts.push(saved);
    }

    res.status(201).json({ message: "Products imported", count: importedProducts.length });
  } catch (error) {
    res.status(500).json({ message: "Import failed", error: error.message });
  }
};

// optional
// const Product = require("../models/productModels");

// // Create Product
// const createProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     const saved = await product.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Get All Products
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get Single Product
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update Product
// const updateProduct = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updated) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Delete Product
// const deleteProduct = async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   createProduct,
//   getAllProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// };
