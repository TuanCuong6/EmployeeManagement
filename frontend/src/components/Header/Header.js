import React from "react";
import { UserPlus, Users } from "lucide-react";

const Header = ({ onAddEmployee }) => {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quản Lý Nhân Viên
              </h1>
              <p className="text-gray-600">
                Quản lý thông tin nhân viên công ty
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
