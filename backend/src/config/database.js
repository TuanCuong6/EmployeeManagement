const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class Database {
  constructor() {
    this.dbPath = path.join(__dirname, "../../database/employees.db");
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error("Lỗi kết nối database:", err);
      } else {
        console.log("Kết nối SQLite thành công");
        this.initializeTables();
      }
    });
  }

  initializeTables() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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

    this.db.run(createTableSQL, (err) => {
      if (err) {
        console.error("Lỗi tạo bảng:", err);
      } else {
        console.log("Bảng employees đã sẵn sàng");
        this.seedSampleData();
      }
    });
  }

  seedSampleData() {
    const checkSQL = `SELECT COUNT(*) as count FROM employees`;
    this.db.get(checkSQL, (err, row) => {
      if (err) return;

      if (row.count === 0) {
        const sampleData = [
          [
            "NV001",
            "Nguyễn Văn A",
            "1990-01-15",
            "Nam",
            "nva@company.com",
            "123 Đường Láng, Hà Nội",
          ],
          [
            "NV002",
            "Trần Thị B",
            "1992-05-20",
            "Nữ",
            "ttb@company.com",
            "456 Nguyễn Trãi, TP.HCM",
          ],
          [
            "NV003",
            "Lê Văn C",
            "1988-11-30",
            "Nam",
            "lvc@company.com",
            "789 Hai Bà Trưng, Đà Nẵng",
          ],
        ];

        const insertSQL = `
          INSERT INTO employees (ma_nhan_vien, ho_ten, ngay_sinh, gioi_tinh, email, dia_chi) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        sampleData.forEach((data) => {
          this.db.run(insertSQL, data);
        });
        console.log("Đã thêm dữ liệu mẫu");
      }
    });
  }

  getConnection() {
    return this.db;
  }
}

module.exports = new Database();
