function ReusableTable({ columns, data, actions, onRowClick }) {
  return (
    <div className="w-full bg-white shadow-md rounded-xl overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] w-full text-sm text-gray-700">

          <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-center"
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-center">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {columns.map((col, index) => (
                    <td
                      key={index}
                      className="px-4 py-3 text-center break-words"
                    >
                      {col.cell ? col.cell(row) : row[col.accessor]}
                    </td>
                  ))}

                  {actions && (
                    <td className="px-4 py-3 text-center">
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
    </div>
  )
}
export default ReusableTable