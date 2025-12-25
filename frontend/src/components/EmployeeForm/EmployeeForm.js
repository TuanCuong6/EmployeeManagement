import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Save, User } from "lucide-react";

const EmployeeForm = ({ employee, isEditing, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: employee || {
      ma_nhan_vien: `NV${Date.now().toString().slice(-6)}`,
      ho_ten: "",
      ngay_sinh: "",
      gioi_tinh: "Nam",
      email: "",
      dia_chi: "",
    },
  });

  useEffect(() => {
    if (employee) {
      reset(employee);
    }
  }, [employee, reset]);

  const onSubmit = (data) => {
    // Validate ngày sinh
    const birthDate = new Date(data.ngay_sinh);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18 || age > 100) {
      alert("Tuổi phải từ 18 đến 100");
      return;
    }

    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
                </h2>
                <p className="text-gray-600">
                  Vui lòng điền đầy đủ thông tin bên dưới
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mã nhân viên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã nhân viên *
                </label>
                <input
                  type="text"
                  {...register("ma_nhan_vien", {
                    required: "Mã nhân viên là bắt buộc",
                  })}
                  className="input-field"
                  disabled={isEditing}
                />
                {errors.ma_nhan_vien && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.ma_nhan_vien.message}
                  </p>
                )}
              </div>

              {/* Họ tên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  {...register("ho_ten", {
                    required: "Họ tên là bắt buộc",
                    minLength: {
                      value: 3,
                      message: "Họ tên phải có ít nhất 3 ký tự",
                    },
                  })}
                  className="input-field"
                />
                {errors.ho_ten && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.ho_ten.message}
                  </p>
                )}
              </div>

              {/* Ngày sinh */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày sinh *
                </label>
                <input
                  type="date"
                  {...register("ngay_sinh", {
                    required: "Ngày sinh là bắt buộc",
                  })}
                  className="input-field"
                />
                {errors.ngay_sinh && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.ngay_sinh.message}
                  </p>
                )}
              </div>

              {/* Giới tính */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới tính *
                </label>
                <select
                  {...register("gioi_tinh", {
                    required: "Giới tính là bắt buộc",
                  })}
                  className="input-field"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
                {errors.gioi_tinh && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.gioi_tinh.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email không hợp lệ",
                    },
                  })}
                  className="input-field"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Địa chỉ */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ *
                </label>
                <textarea
                  {...register("dia_chi", {
                    required: "Địa chỉ là bắt buộc",
                    minLength: {
                      value: 10,
                      message: "Địa chỉ phải có ít nhất 10 ký tự",
                    },
                  })}
                  rows="3"
                  className="input-field"
                />
                {errors.dia_chi && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dia_chi.message}
                  </p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button type="button" onClick={onClose} className="btn-secondary">
                Hủy
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>{isEditing ? "Cập nhật" : "Tạo nhân viên"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
