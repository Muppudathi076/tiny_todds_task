import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
  AreaChart, Area,
  ResponsiveContainer
} from "recharts";
import ReusableCard from "../Components/Resubale_Components/ReusableCard"; 
import { DashboardApi } from "../auth/authapi";
function Dashboard() {
  const [Bardata,setBardata] = useState([])
  const [cards, setCards] = useState({
    totalStudents: 0,
    totalStaff: 0,
    activeStaff: 0,
    inactiveStaff: 0
  });

  const [Piedata,setPiedata] = useState([]);
  // { name: "Active", value: 40 },
  // { name: "Inactive", value: 13 },

  const [Areadata,setAreadata] = useState([]);
  const COLORS = ["#00C49F", "#FF8042"];

  const token = localStorage.getItem("access_token")

  const fetching = async()=>{
    const responce = await DashboardApi(token)
    console.log("dashboar api :",responce)
    setBardata(responce.data.barData)
    setAreadata(responce.data.areaData)
    setCards(responce.data.cards);
    const formattedPie = responce.data.pieData.map(item => ({
      ...item,
      name: item.name === true ? "Active"
      : item.name === false ? "Inactive"
      : item.name
    }));
    setPiedata(formattedPie)
  }
  const sortedAreaData = [...Areadata].sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white p-3 shadow-md rounded-md border">
        <p className="text-black font-medium">
          Date: {data.date}
        </p>
        <p className="text-black font-semibold">
          Count: {data.value}
        </p>
      </div>
    );
  }
  return null;
};

useEffect(()=>{
   fetching()
},[])
  return (
    <div style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}>
      
      <h2 style={{ marginBottom: "20px" }} className="text-black text-2xl">Dashboard</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-3 mb-[30px]">

  <ReusableCard
    title="Total Students"
    value={cards.totalStudents}
    color="#4e73df"
  />

  <ReusableCard
    title="Total Staff"
    value={cards.totalStaff}
    color="#1cc88a"
  />

  <ReusableCard
    title="Active Staff"
    value={cards.activeStaff}
    color="#36b9cc"
  />

  <ReusableCard
    title="Inactive Staff"
    value={cards.inactiveStaff}
    color="#e74a3b"
  />

</div>

<div className="flex flex-col md:flex-row gap-5 w-full">

  <div
    className="w-full md:w-2/3 bg-white p-5 rounded-xl"
  >
    <h4 className="mb-4 text-black text-lg font-semibold">
      Department Staff Overview
    </h4>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={Bardata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="staff" fill="#4e73df" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div
    className="w-full md:w-2/4 bg-white p-5 rounded-xl"
  >
    <h4 className="mb-4 text-lg text-black font-semibold">
      Staff Status
    </h4>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={Piedata}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
            label={({ name, percent }) =>
    `${name} (${(percent * 100).toFixed(0)}%)`
  }
        >
          {Piedata.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

</div>

      <div className="bg-white p-20px rounded-lg mt-[20px]">
        <h4 className="mb-4 text-lg text-black font-semibold p-4">Monthly Growth (Sea Wave Chart)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={sortedAreaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1cc88a"
              fill="#1cc88a"
              fillOpacity={0.7}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Dashboard;