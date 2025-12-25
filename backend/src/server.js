const express = require("express");
const cors = require("cors");
require("dotenv").config();

const database = require("./config/database");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    /\.vercel\.app$/ 
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/employees", employeeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Không tìm thấy tài nguyên" });
});

const PORT = process.env.PORT || 5000;

database.initializeTables().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
  });
});
