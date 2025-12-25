import React from "react";
import { Users, User, ChevronRight } from "lucide-react";

const StatsCards = ({ employees, pagination }) => {
  const maleCount = employees.filter((e) => e.gioi_tinh === "Nam").length;
  const femaleCount = employees.filter((e) => e.gioi_tinh === "Nữ").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Tổng số nhân viên</p>
            <p className="text-3xl font-bold text-gray-900">
              {pagination.total}
            </p>
          </div>
          <Users className="h-10 w-10 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Nam</p>
            <p className="text-3xl font-bold text-gray-900">{maleCount}</p>
          </div>
          <User className="h-10 w-10 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Nữ</p>
            <p className="text-3xl font-bold text-gray-900">{femaleCount}</p>
          </div>
          <User className="h-10 w-10 text-pink-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Trang hiện tại</p>
            <p className="text-3xl font-bold text-gray-900">
              {pagination.page}/{pagination.totalPages}
            </p>
          </div>
          <ChevronRight className="h-10 w-10 text-primary-500" />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
