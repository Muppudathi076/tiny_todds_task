import React from "react"

function ReusablePagination({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange 
}) {

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  const pages = [...Array(totalPages).keys()].map(num => num + 1)

  return (
    <div className="flex justify-center items-center mt-6 gap-2">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded text-white bg-gray-500 disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded text-white bg-gray-600 disabled:opacity-60"
      >
        Next
      </button>

    </div>
  )
}

export default ReusablePagination