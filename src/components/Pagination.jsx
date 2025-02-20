import React from "react";

export default function PaginationBasic({ nextPage, prevPage, page, setPage, totalPages }) {
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (page >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [page - 2, page - 1, page, page + 1, page + 2];
    }
  };

  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className="flex list-none items-center justify-center text-sm md:gap-1">
        {/* Prev Button */}
        <li>
          <button
            onClick={prevPage}
            disabled={page === 1}
            className={`inline-flex h-10 items-center justify-center px-4 text-sm font-medium transition duration-300 ${
              page === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-peach"
            }`}
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => setPage(pageNumber)}
              className={`h-10 w-10 flex items-center justify-center rounded-full ${
                page === pageNumber
                  ? "bg-beige"
                  : "text-slate-700 hover:bg-peach"
              }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className={`inline-flex h-10 items-center justify-center px-4 text-sm font-medium transition duration-300 ${
              page === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-peach"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
