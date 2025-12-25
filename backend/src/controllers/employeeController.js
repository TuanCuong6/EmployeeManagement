const EmployeeModel = require("../models/employeeModel");

class EmployeeController {
  // Lấy danh sách nhân viên
  static async getEmployees(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "ho_ten",
        order = "ASC",
        search = "",
        gender = "",
      } = req.query;

      const result = await EmployeeModel.findAll({
        page: parseInt(page),
        limit: parseInt(limit),
        sortBy,
        order,
        search,
        gender,
      });

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }

  // Lấy thông tin chi tiết nhân viên
  static async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await EmployeeModel.findById(id);

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy nhân viên",
        });
      }

      res.json({
        success: true,
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }

  // Tạo nhân viên mới
  static async createEmployee(req, res) {
    try {
      const employeeData = req.body;

      // Validate dữ liệu
      const errors = [];

      if (!employeeData.ma_nhan_vien) errors.push("Mã nhân viên là bắt buộc");
      if (!employeeData.ho_ten) errors.push("Họ tên là bắt buộc");
      if (!employeeData.ngay_sinh) errors.push("Ngày sinh là bắt buộc");
      if (!employeeData.gioi_tinh) errors.push("Giới tính là bắt buộc");
      if (!employeeData.email) errors.push("Email là bắt buộc");
      if (!employeeData.dia_chi) errors.push("Địa chỉ là bắt buộc");

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (employeeData.email && !emailRegex.test(employeeData.email)) {
        errors.push("Email không hợp lệ");
      }

      // Validate ngày sinh
      if (employeeData.ngay_sinh) {
        const birthDate = new Date(employeeData.ngay_sinh);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || age > 100) {
          errors.push("Tuổi phải từ 18 đến 100");
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Dữ liệu không hợp lệ",
          errors,
        });
      }

      // Kiểm tra email tồn tại
      const existingEmail = await EmployeeModel.findByEmail(employeeData.email);
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email đã tồn tại",
        });
      }

      // Kiểm tra mã nhân viên tồn tại
      const existingCode = await EmployeeModel.findByEmployeeCode(
        employeeData.ma_nhan_vien
      );
      if (existingCode) {
        return res.status(400).json({
          success: false,
          message: "Mã nhân viên đã tồn tại",
        });
      }

      const newEmployee = await EmployeeModel.create(employeeData);

      res.status(201).json({
        success: true,
        message: "Tạo nhân viên thành công",
        data: newEmployee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }

  // Cập nhật nhân viên
  static async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const employeeData = req.body;

      // Kiểm tra nhân viên tồn tại
      const existingEmployee = await EmployeeModel.findById(id);
      if (!existingEmployee) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy nhân viên",
        });
      }

      // Validate dữ liệu
      const errors = [];

      if (!employeeData.ho_ten) errors.push("Họ tên là bắt buộc");
      if (!employeeData.ngay_sinh) errors.push("Ngày sinh là bắt buộc");
      if (!employeeData.gioi_tinh) errors.push("Giới tính là bắt buộc");
      if (!employeeData.email) errors.push("Email là bắt buộc");
      if (!employeeData.dia_chi) errors.push("Địa chỉ là bắt buộc");

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (employeeData.email && !emailRegex.test(employeeData.email)) {
        errors.push("Email không hợp lệ");
      }

      // Validate ngày sinh
      if (employeeData.ngay_sinh) {
        const birthDate = new Date(employeeData.ngay_sinh);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || age > 100) {
          errors.push("Tuổi phải từ 18 đến 100");
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Dữ liệu không hợp lệ",
          errors,
        });
      }

      // Kiểm tra email tồn tại (trừ chính nó)
      const existingEmail = await EmployeeModel.findByEmail(
        employeeData.email,
        id
      );
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email đã tồn tại",
        });
      }

      const updatedEmployee = await EmployeeModel.update(id, employeeData);

      res.json({
        success: true,
        message: "Cập nhật nhân viên thành công",
        data: updatedEmployee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }

  // Xóa nhân viên
  static async deleteEmployee(req, res) {
    try {
      const { id } = req.params;

      // Kiểm tra nhân viên tồn tại
      const existingEmployee = await EmployeeModel.findById(id);
      if (!existingEmployee) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy nhân viên",
        });
      }

      await EmployeeModel.delete(id);

      res.json({
        success: true,
        message: "Xóa nhân viên thành công",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }
}

module.exports = EmployeeController;
