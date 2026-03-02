function ReusableCard ({ title, value, color }) {
  return (
    <div style={{
      background: color,
      color: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
export default ReusableCard