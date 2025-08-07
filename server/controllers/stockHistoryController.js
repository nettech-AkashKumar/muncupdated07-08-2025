const StockHistory = require('../models/stockHistoryModels');
const Product = require('../models/productModels'); // Add this if not already imported

exports.getStockHistory = async (req, res) => {
    try {
        const { productName, startDate, endDate, page = 1, limit = 10 } = req.query;
        const query = {};

        if (startDate || endDate) query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);

        // Filter by product name if provided
        if (productName) {
            const matchingProducts = await Product.find({
                productName: { $regex: productName, $options: 'i' },
            }).select('_id');

            const matchingIds = matchingProducts.map((p) => p._id);
            query.product = { $in: matchingIds };
        }

        const logs = await StockHistory.find(query)
            .populate('product')
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ date: -1 });

        const count = await StockHistory.countDocuments(query);

        res.json({
            success: true,
            logs,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            totalRecords: count,
        });
    } catch (error) {
        console.error("Error fetching stock history:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.updateStockHistory = async (req, res) => {
    try {
        const updatedLog = await StockHistory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('product');

        if (!updatedLog) {
            return res.status(404).json({ success: false, message: "Log not found" });
        }

        res.json({ success: true, message: "Stock history updated", log: updatedLog });
    } catch (error) {
        console.error("Error updating stock history:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deleteStockHistory = async (req, res) => {
    try {
        const deleted = await StockHistory.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Log not found" });
        }

        res.json({ success: true, message: "Stock history deleted" });
    } catch (error) {
        console.error("Error deleting stock history:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// const StockHistory = require('../models/stockHistoryModels');

// exports.getStockHistory = async (req, res) => {
//     try {
//         const { product, startDate, endDate, page = 1, limit = 10 } = req.query;
//         const query = {};

//         if (product) query.product = product;
//         if (startDate || endDate) query.date = {};
//         if (startDate) query.date.$gte = new Date(startDate);
//         if (endDate) query.date.$lte = new Date(endDate);

//         const logs = await StockHistory.find(query)
//             .populate('product')
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit))
//             .sort({ date: -1 });

//         const count = await StockHistory.countDocuments(query);

//         res.json({
//             success: true,
//             logs,
//             totalPages: Math.ceil(count / limit),
//             currentPage: parseInt(page),
//             totalRecords: count,
//         });
//     } catch (error) {
//         console.error("Error fetching stock history:", error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// };
