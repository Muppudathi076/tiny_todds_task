import {useState} from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Users, User, LogOut, GraduationCap, Network    } from "lucide-react"
import toast from "react-hot-toast"
import { RxDashboard } from "react-icons/rx";

function Sidebar({ isOpen,openLogout  }) {
  const navigate = useNavigate()
  const role = localStorage.getItem("role")

  
  const adminMenu = [
  { name: "Dashboard", path: "/api/dashboard", icon: <RxDashboard size={20} /> },
  { name: "Student Management", path: "/api/students", icon: <GraduationCap size={20} /> },
  { name: "Staff Management", path: "/api/staff", icon: <Users size={20} /> },
  ]
  
  const SuperMenu = [
    { name: "Staff List", path: "/api/staff", icon: <Users size={20} /> },
    { name: "Role", path: "/api/rolepage", icon: <Network   size={20} /> }
  ]
  
  const studentMenu = [
  { name: "Dashboard", path: "/api/dashboard", icon: <GraduationCap size={20} /> },
  { name: "My Profile", path: "/api/profile", icon: <User size={20} /> },
  ]

let menuItems = []

if (role === "admin") {
  menuItems = adminMenu
} else if (role === "super_admin") {
  menuItems = SuperMenu
} else if (role === "student") {
  menuItems = studentMenu
}
  return (
    <div
      className={`h-screen bg-gray-800 text-white p-5 transition-all duration-300 
      fixed top-0 left-0 z-40 flex flex-col justify-between
      ${isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"}`}
    >

      <div>
        <NavLink
          className="font-bold text-xl mb-6 flex items-center gap-2 hover:text-gray-300"
        >
          {isOpen ? "Tiny Todds" : "TT"}
        </NavLink>

        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded transition-all duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="space-y-2 flex justify-between">
        <div>
          <NavLink
            to="/api/profile"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
          >
            <User size={20} />
            {isOpen && <span>Profile</span>}
          </NavLink>
        </div>
        <div>
          <button
            onClick={openLogout}
            className="flex items-center gap-3 p-2 rounded hover:bg-red-600 transition-all duration-200"
          >
            <LogOut size={20} />
            {isOpen && <span></span>}
          </button>
        </div>
      </div>

    </div>
  )
}

export default Sidebar