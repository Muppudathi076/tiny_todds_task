function ReusableForm({ label, value }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center mb-4">

      <div className="md:w-1/3 text-gray-600 font-medium">
        {label}
      </div>

      <div className="md:w-2/3">
        <input
          type="text"
          value={value ?? ""}
          readOnly
          className="w-full border rounded-md px-3 py-2 bg-gray-100"
        />
      </div>

    </div>
  );
}
export default ReusableForm