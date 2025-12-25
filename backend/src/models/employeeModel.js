const db = require("../config/database").getConnection();

class EmployeeModel {
  // Tạo nhân viên mới
  static create(employeeData) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO employees (ma_nhan_vien, ho_ten, ngay_sinh, gioi_tinh, email, dia_chi)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const params = [
        employeeData.ma_nhan_vien,
        employeeData.ho_ten,
        employeeData.ngay_sinh,
        employeeData.gioi_tinh,
        employeeData.email,
        employeeData.dia_chi,
      ];

      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...employeeData });
      });
    });
  }

  // Lấy danh sách nhân viên với phân trang và sắp xếp
  static findAll({
    page = 1,
    limit = 10,
    sortBy = "ho_ten",
    order = "ASC",
    search = "",
    gender = "",
  }) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;

      let conditions = [];
      let params = [];

      if (search) {
        conditions.push(`(ho_ten LIKE ? OR email LIKE ? OR ma_nhan_vien LIKE ?)`);
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      if (gender) {
        conditions.push(`gioi_tinh = ?`);
        params.push(gender);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      // Validate sort column
      const allowedSortColumns = [
        "ho_ten",
        "dia_chi",
        "ngay_sinh",
        "created_at",
      ];
      const sortColumn = allowedSortColumns.includes(sortBy)
        ? sortBy
        : "ho_ten";
      const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

      const countSQL = `SELECT COUNT(*) as total FROM employees ${whereClause}`;
      const dataSQL = `
        SELECT * FROM employees 
        ${whereClause}
        ORDER BY ${sortColumn} ${sortOrder}
        LIMIT ? OFFSET ?
      `;

      db.get(countSQL, params, (err, countResult) => {
        if (err) reject(err);

        db.all(dataSQL, [...params, limit, offset], (err, rows) => {
          if (err) reject(err);

          resolve({
            data: rows,
            pagination: {
              page: parseInt(page),
              limit: parseInt(limit),
              total: countResult.total,
              totalPages: Math.ceil(countResult.total / limit),
            },
          });
        });
      });
    });
  }

  // Tìm nhân viên theo ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM employees WHERE id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // Cập nhật nhân viên
  static update(id, employeeData) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE employees 
        SET ho_ten = ?, ngay_sinh = ?, gioi_tinh = ?, email = ?, dia_chi = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      const params = [
        employeeData.ho_ten,
        employeeData.ngay_sinh,
        employeeData.gioi_tinh,
        employeeData.email,
        employeeData.dia_chi,
        id,
      ];

      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id, ...employeeData });
      });
    });
  }

  // Xóa nhân viên
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM employees WHERE id = ?`;
      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve({ deletedId: id, affectedRows: this.changes });
      });
    });
  }

  // Kiểm tra email đã tồn tại chưa
  static findByEmail(email, excludeId = null) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT id FROM employees WHERE email = ?`;
      let params = [email];

      if (excludeId) {
        sql += ` AND id != ?`;
        params.push(excludeId);
      }

      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // Kiểm tra mã nhân viên đã tồn tại chưa
  static findByEmployeeCode(code, excludeId = null) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT id FROM employees WHERE ma_nhan_vien = ?`;
      let params = [code];

      if (excludeId) {
        sql += ` AND id != ?`;
        params.push(excludeId);
      }

      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = EmployeeModel;
