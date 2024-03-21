import { memo } from "react";

const Pagination = ({ onPageChange, pageIndex, totalPageCount }) => {
  let startPage = Math.max(pageIndex - 2, 1);
  let endPage = Math.min(startPage + 4, totalPageCount);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }
  const canPrevious = pageIndex > 0;
  const canNext = pageIndex < totalPageCount - 1;
  return (
    <div className="max-w-screen-xl mx-auto mb-4 px-4 text-gray-600 md:px-8">
      <div className="hidden justify-center sm:flex" aria-label="Pagination">
        <ul className="flex items-center">
          <li>
            <button
              onClick={() => onPageChange(pageIndex)}
              disabled={!canPrevious}
              className="disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-white hover:text-indigo-600 hover:bg-gray-50 px-2 py-3 border border-r-0 rounded-tl-lg rounded-bl-lg"
            >
              Previous
            </button>
          </li>
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((item) => (
            <li key={item} className="">
              <button
                key={item}
                aria-current={pageIndex + 1 == item ? "page" : false}
                className={`px-4 py-3 border border-l-0 duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${
                  pageIndex + 1 == item
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : ""
                }`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => onPageChange(pageIndex + 2)}
              disabled={!canNext}
              className="disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-white hover:text-indigo-600 hover:bg-gray-50 px-5 py-3 border border-l-0 rounded-tr-lg rounded-br-lg"
            >
              Next
            </button>
          </li>
        </ul>
      </div>
      {/* On mobile version */}
      <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
        <button
          onClick={() => onPageChange(pageIndex)}
          disabled={!canPrevious}
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >
          Previous
        </button>
        <div className="font-medium">
          Page {pageIndex + 1} of {totalPageCount}
        </div>
        <button
          onClick={() => onPageChange(pageIndex + 2)}
          disabled={!canNext}
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default memo(Pagination);
