const database = require("../config/database");
const pool = database.getPool();

class EmployeeModel {
  // Tạo nhân viên mới
  static async create(employeeData) {
    const sql = `
      INSERT INTO employees (ma_nhan_vien, ho_ten, ngay_sinh, gioi_tinh, email, dia_chi)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const params = [
      employeeData.ma_nhan_vien,
      employeeData.ho_ten,
      employeeData.ngay_sinh,
      employeeData.gioi_tinh,
      employeeData.email,
      employeeData.dia_chi,
    ];

    const result = await pool.query(sql, params);
    return result.rows[0];
  }

  // Lấy danh sách nhân viên với phân trang và sắp xếp
  static async findAll({
    page = 1,
    limit = 10,
    sortBy = "ho_ten",
    order = "ASC",
    search = "",
    gender = "",
  }) {
    const offset = (page - 1) * limit;

    let conditions = [];
    let params = [];
    let paramIndex = 1;

    if (search) {
      conditions.push(`(ho_ten ILIKE $${paramIndex} OR email ILIKE $${paramIndex + 1} OR ma_nhan_vien ILIKE $${paramIndex + 2})`);
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      paramIndex += 3;
    }

    if (gender) {
      conditions.push(`gioi_tinh = $${paramIndex}`);
      params.push(gender);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Validate sort column
    const allowedSortColumns = ["ho_ten", "dia_chi", "ngay_sinh", "created_at"];
    const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : "ho_ten";
    const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const countSQL = `SELECT COUNT(*) as total FROM employees ${whereClause}`;
    const dataSQL = `
      SELECT * FROM employees 
      ${whereClause}
      ORDER BY ${sortColumn} ${sortOrder}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const countResult = await pool.query(countSQL, params);
    const dataResult = await pool.query(dataSQL, [...params, limit, offset]);

    return {
      data: dataResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        totalPages: Math.ceil(parseInt(countResult.rows[0].total) / limit),
      },
    };
  }

  // Tìm nhân viên theo ID
  static async findById(id) {
    const sql = `SELECT * FROM employees WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }

  // Cập nhật nhân viên
  static async update(id, employeeData) {
    const sql = `
      UPDATE employees 
      SET ho_ten = $1, ngay_sinh = $2, gioi_tinh = $3, email = $4, dia_chi = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;

    const params = [
      employeeData.ho_ten,
      employeeData.ngay_sinh,
      employeeData.gioi_tinh,
      employeeData.email,
      employeeData.dia_chi,
      id,
    ];

    const result = await pool.query(sql, params);
    return result.rows[0];
  }

  // Xóa nhân viên
  static async delete(id) {
    const sql = `DELETE FROM employees WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return { deletedId: id, affectedRows: result.rowCount };
  }

  // Kiểm tra email đã tồn tại chưa
  static async findByEmail(email, excludeId = null) {
    let sql = `SELECT id FROM employees WHERE email = $1`;
    let params = [email];

    if (excludeId) {
      sql += ` AND id != $2`;
      params.push(excludeId);
    }

    const result = await pool.query(sql, params);
    return result.rows[0];
  }

  // Kiểm tra mã nhân viên đã tồn tại chưa
  static async findByEmployeeCode(code, excludeId = null) {
    let sql = `SELECT id FROM employees WHERE ma_nhan_vien = $1`;
    let params = [code];

    if (excludeId) {
      sql += ` AND id != $2`;
      params.push(excludeId);
    }

    const result = await pool.query(sql, params);
    return result.rows[0];
  }
}

module.exports = EmployeeModel;
