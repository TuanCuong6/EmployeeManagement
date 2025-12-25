const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");

// GET /api/employees - Lấy danh sách nhân viên
router.get("/", EmployeeController.getEmployees);

// GET /api/employees/:id - Lấy thông tin nhân viên
router.get("/:id", EmployeeController.getEmployeeById);

// POST /api/employees - Tạo nhân viên mới
router.post("/", EmployeeController.createEmployee);

// PUT /api/employees/:id - Cập nhật nhân viên
router.put("/:id", EmployeeController.updateEmployee);

// DELETE /api/employees/:id - Xóa nhân viên
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;
