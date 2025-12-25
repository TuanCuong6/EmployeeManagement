import axios from "axios";

// Đối với development, sử dụng proxy trong package.json
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-url.railway.app/api"
    : "/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Employee API
export const employeeApi = {
  // Lấy danh sách nhân viên
  getEmployees: (params) => api.get("/employees", { params }),

  // Lấy thông tin nhân viên
  getEmployee: (id) => api.get(`/employees/${id}`),

  // Tạo nhân viên mới
  createEmployee: (data) => api.post("/employees", data),

  // Cập nhật nhân viên
  updateEmployee: (id, data) => api.put(`/employees/${id}`, data),

  // Xóa nhân viên
  deleteEmployee: (id) => api.delete(`/employees/${id}`),
};

export default api;
