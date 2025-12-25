import React from "react";
import {
  Edit,
  Trash2,
  Calendar,
  Mail,
  MapPin,
  User,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { formatDate, calculateAge } from "../../utils/helpers";

const EmployeeTable = ({
  employees,
  loading,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
  page,
  limit,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="table-header">STT</th>
            <th className="table-header">
              <button
                onClick={() => onSort("ho_ten")}
                className="flex items-center space-x-1 hover:text-primary-600"
              >
                <span>Họ và Tên</span>
                {sortConfig.sortBy === "ho_ten" &&
                  (sortConfig.order === "ASC" ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  ))}
              </button>
            </th>
            <th className="table-header">Mã NV</th>
            <th className="table-header">Ngày Sinh</th>
            <th className="table-header">Tuổi</th>
            <th className="table-header">Giới Tính</th>
            <th className="table-header">Email</th>
            <th className="table-header">
              <button
                onClick={() => onSort("dia_chi")}
                className="flex items-center space-x-1 hover:text-primary-600"
              >
                <span>Địa Chỉ</span>
                {sortConfig.sortBy === "dia_chi" &&
                  (sortConfig.order === "ASC" ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  ))}
              </button>
            </th>
            <th className="table-header">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <tr
              key={employee.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="table-cell font-medium">
                {(page - 1) * limit + index + 1}
              </td>
              <td className="table-cell">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {employee.ho_ten}
                    </div>
                    <div className="text-gray-500">ID: {employee.id}</div>
                  </div>
                </div>
              </td>
              <td className="table-cell font-mono font-medium">
                {employee.ma_nhan_vien}
              </td>
              <td className="table-cell">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  {formatDate(employee.ngay_sinh)}
                </div>
              </td>
              <td className="table-cell font-medium">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                  {calculateAge(employee.ngay_sinh)} tuổi
                </span>
              </td>
              <td className="table-cell">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    employee.gioi_tinh === "Nam"
                      ? "bg-blue-100 text-blue-800"
                      : employee.gioi_tinh === "Nữ"
                      ? "bg-pink-100 text-pink-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {employee.gioi_tinh}
                </span>
              </td>
              <td className="table-cell">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <a
                    href={`mailto:${employee.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {employee.email}
                  </a>
                </div>
              </td>
              <td className="table-cell">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <span className="truncate max-w-xs">{employee.dia_chi}</span>
                </div>
              </td>
              <td className="table-cell">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(employee)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Chỉnh sửa"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(employee)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
