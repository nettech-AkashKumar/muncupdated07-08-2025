const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');
const cityRoutes = require('./routes/cityRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const unitsRoutes = require('./routes/unitsRoutes');
const roleRoutes = require('./routes/roleRoutes');
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require("path");
const moduleRoutes = require("./routes/moduleRoutes");
const couponRoutes = require('./routes/CouponsRoute');
const GiftcardRoutes = require("./routes/GiftCardRoutes");
const AddCustomerRoutes = require("./routes/AddCustomersRoutes");
const customerRoutes = require("./routes/customerRoutes");
const conversations = require('./routes/message')
const messages = require('./routes/message')
const purchaseRoutes = require('./routes/purchaseRoutes');
const stockHistoryRoutes = require('./routes/stockHistoryRoutes');
const purchaseSettingsRoutes = require('./routes/purchaseSettingRoutes');
const hsnRoutes = require('./routes/hsnRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const VarientRoutes = require('./routes/variantRoutes');
const WarrantyRoutes = require('./routes/warrantyRoutes');
const debitNoteRoutes = require('./routes/debitNoteRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

const http = require('http');
const { Server } = require('socket.io');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// const corsOptions = {
//   origin: "http://localhost:3000","http://localhost:3001",
//   methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
//   credentials: true,
// };
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};


app.use(express.urlencoded({ extended: true }));

// File uploads path (optional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use(cors(corsOptions));

// Routes
// app.use('/api/users', userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/unit", unitsRoutes);
app.use("/api/modules", moduleRoutes);
app.use('/api/coupons', couponRoutes);
app.use("/api/giftcard", GiftcardRoutes);
// app.use("/api/customers", AddCustomerRoutes);
app.use("/api/customers", customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use("/api/conversations", conversations);
app.use("/api/messages", messages);

app.use("/api/purchases", purchaseRoutes);
app.use("/api/stock-history", stockHistoryRoutes);
app.use("/api/settings", purchaseSettingsRoutes);
app.use('/api/hsn', hsnRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/variant-attributes", VarientRoutes);
app.use("/api/warranty", WarrantyRoutes);
app.use('/api/debit-notes', debitNoteRoutes);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/category", express.static(path.join(__dirname, "category")));


// Create HTTP server for Socket.IO
const server = http.createServer(app);

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // or your frontend origin
    methods: ["GET", "POST"]
  }
});

// Online users map (you can replace this with DB or Redis later)
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
    [...onlineUsers.entries()].forEach(([uid, sid]) => {
      if (sid === socket.id) onlineUsers.delete(uid);
    });
  });
});

// Start server with Socket.IO
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running with Socket.IO on port ${PORT}`));