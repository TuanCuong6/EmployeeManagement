import React from "react";
import { UserPlus, Users } from "lucide-react";

const Header = ({ onAddEmployee, totalEmployees }) => {
  return (
    <header className="bg-gradient-to-r from-white via-blue-50 to-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                Quản Lý Nhân Viên Vietapp
              </h1>
              <p className="text-gray-600">
                {totalEmployees} nhân viên
              </p>
            </div>
          </div>
          <button
            onClick={onAddEmployee}
            className="btn-primary flex items-center space-x-2"
          >
            <UserPlus className="h-5 w-5" />
            <span>Thêm Nhân Viên</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
