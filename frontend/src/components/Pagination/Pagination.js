import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination, onPageChange }) => {
  const { page, limit, total, totalPages } = pagination;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">{(page - 1) * limit + 1}</span>{" "}
          đến{" "}
          <span className="font-medium">{Math.min(page * limit, total)}</span>{" "}
          của <span className="font-medium">{total}</span> kết quả
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (page <= 3) {
            pageNum = i + 1;
          } else if (page >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = page - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-lg font-medium ${
                page === pageNum
                  ? "bg-primary-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
