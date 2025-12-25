import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow p-6">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email hoặc mã nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary px-6">
          Tìm Kiếm
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
