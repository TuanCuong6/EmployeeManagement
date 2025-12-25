import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import StatsCards from "../components/StatsCards/StatsCards";
import EmployeeTable from "../components/EmployeeTable/EmployeeTable";
import Pagination from "../components/Pagination/Pagination";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import { employeeApi } from "../services/api";

const HomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Pagination và sort state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [sortConfig, setSortConfig] = useState({
    sortBy: "ho_ten",
    order: "ASC",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        sortBy: sortConfig.sortBy,
        order: sortConfig.order,
        search: searchTerm,
      };

      const response = await employeeApi.getEmployees(params);
      setEmployees(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      alert("Không thể tải dữ liệu nhân viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [pagination.page, sortConfig, searchTerm]);

  // Xử lý sort
  const handleSort = (column) => {
    setSortConfig((prev) => ({
      sortBy: column,
      order: prev.sortBy === column && prev.order === "ASC" ? "DESC" : "ASC",
    }));
  };

  // Xử lý phân trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page }));
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = () => {
    // Reset về trang 1 khi tìm kiếm
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchEmployees();
  };

  // Xử lý tạo/cập nhật nhân viên
  const handleSaveEmployee = async (employeeData) => {
    try {
      if (isEditing && selectedEmployee) {
        await employeeApi.updateEmployee(selectedEmployee.id, employeeData);
        alert("Cập nhật nhân viên thành công!");
      } else {
        await employeeApi.createEmployee(employeeData);
        alert("Tạo nhân viên thành công!");
      }

      setShowForm(false);
      setSelectedEmployee(null);
      setIsEditing(false);
      fetchEmployees();
    } catch (error) {
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      alert(message);
    }
  };

  // Xử lý xóa nhân viên
  const handleDelete = async () => {
    if (!selectedEmployee) return;

    try {
      await employeeApi.deleteEmployee(selectedEmployee.id);
      alert("Xóa nhân viên thành công!");
      setShowDeleteModal(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa nhân viên");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header
        onAddEmployee={() => {
          setSelectedEmployee(null);
          setIsEditing(false);
          setShowForm(true);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        <StatsCards employees={employees} pagination={pagination} />

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <EmployeeTable
            employees={employees}
            loading={loading}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEdit={(employee) => {
              setSelectedEmployee(employee);
              setIsEditing(true);
              setShowForm(true);
            }}
            onDelete={(employee) => {
              setSelectedEmployee(employee);
              setShowDeleteModal(true);
            }}
            page={pagination.page}
            limit={pagination.limit}
          />

          {!loading && employees.length > 0 && (
            <Pination pagination={pagination} onPageChange={handlePageChange} />
          )}
        </div>
      </main>

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          employee={selectedEmployee}
          isEditing={isEditing}
          onSave={handleSaveEmployee}
          onClose={() => {
            setShowForm(false);
            setSelectedEmployee(null);
            setIsEditing(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          title="Xác nhận xóa"
          message={`Bạn có chắc chắn muốn xóa nhân viên "${selectedEmployee?.ho_ten}"? Hành động này không thể hoàn tác.`}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
