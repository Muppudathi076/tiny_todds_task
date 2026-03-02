function ReusableTable({ columns, data, actions, onRowClick  }) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
      <table className="min-w-full border table-fixed text-sm text-left text-gray-700">

        <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-3 truncate"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-center">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={()=>{onRowClick && onRowClick(row)}}
                className="border-b hover:bg-gray-50 transition"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 truncate"
                  >
                    {col.render
                      ? col.render(row)
                      : row[col.accessor] ?? "-"}
                  </td>
                ))}

                {actions && (
                  <td className="px-6 py-4 text-center">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  )
}

export default ReusableTable