import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch, genderFilter, setGenderFilter }) => {
  const [placeholder, setPlaceholder] = useState("");
  const fullText = "Tìm kiếm theo tên, email hoặc mã nhân viên...";

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    
    const type = () => {
      if (!isDeleting) {
        setPlaceholder(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) {
          setTimeout(() => { isDeleting = true; }, 2000);
        }
      } else {
        setPlaceholder(fullText.slice(0, index - 1));
        index--;
        if (index === 0) {
          isDeleting = false;
        }
      }
    };

    const interval = setInterval(type, 100);
    return () => clearInterval(interval);
  }, []);

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
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="input-field pl-9 pr-8 appearance-none cursor-pointer"
          >
            <option value="">Tất cả</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <button type="submit" className="btn-primary px-6 flex items-center gap-2">
          <Search className="h-4 w-4" />
          Tìm Kiếm
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
