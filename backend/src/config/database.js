const { Pool } = require("pg");

class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" 
        ? { rejectUnauthorized: false } 
        : false,
    });

    this.pool.on("connect", () => {
      console.log("Kết nối PostgreSQL thành công");
    });

    this.pool.on("error", (err) => {
      console.error("Lỗi kết nối PostgreSQL:", err);
    });
  }

  async initializeTables() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        ma_nhan_vien VARCHAR(50) UNIQUE NOT NULL,
        ho_ten VARCHAR(100) NOT NULL,
        ngay_sinh DATE NOT NULL,
        gioi_tinh VARCHAR(10) CHECK(gioi_tinh IN ('Nam', 'Nữ', 'Khác')) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        dia_chi TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      await this.pool.query(createTableSQL);
      console.log("Bảng employees đã sẵn sàng");
      await this.seedSampleData();
    } catch (err) {
      console.error("Lỗi tạo bảng:", err);
    }
  }

  async seedSampleData() {
    try {
      const checkResult = await this.pool.query("SELECT COUNT(*) as count FROM employees");
      
      if (parseInt(checkResult.rows[0].count) === 0) {
        const sampleData = [
          ["NV001", "Nguyễn Văn A", "1990-01-15", "Nam", "nva@company.com", "123 Đường Láng, Hà Nội"],
          ["NV002", "Trần Thị B", "1992-05-20", "Nữ", "ttb@company.com", "456 Nguyễn Trãi, TP.HCM"],
          ["NV003", "Lê Văn C", "1988-11-30", "Nam", "lvc@company.com", "789 Hai Bà Trưng, Đà Nẵng"],
        ];

        const insertSQL = `
          INSERT INTO employees (ma_nhan_vien, ho_ten, ngay_sinh, gioi_tinh, email, dia_chi) 
          VALUES ($1, $2, $3, $4, $5, $6)
        `;

        for (const data of sampleData) {
          await this.pool.query(insertSQL, data);
        }
        console.log("Đã thêm dữ liệu mẫu");
      }
    } catch (err) {
      // Bỏ qua lỗi nếu data đã tồn tại
      if (!err.message.includes("duplicate")) {
        console.error("Lỗi seed data:", err);
      }
    }
  }

  getPool() {
    return this.pool;
  }
}

const database = new Database();
module.exports = database;
