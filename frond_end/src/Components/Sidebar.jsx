import {useState} from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Users, User, LogOut, GraduationCap  } from "lucide-react"
import toast from "react-hot-toast"

const menuItems = [
  { name: "Student Management", path: "/api/students", icon: <GraduationCap size={20} /> },
  { name: "Staff Management", path: "/api/staff", icon: <Users size={20} /> },
]

function Sidebar({ isOpen }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    navigate("/")
    toast.success("Logout successfully",{duration:2000})
  }

  return (
    <div
      className={`h-screen bg-gray-800 text-white p-5 transition-all duration-300 
      flex flex-col justify-between
      ${isOpen ? "w-64" : "w-30"}`}
    >

      <div>
        <NavLink
          to="/api/dashboard"
          className="font-bold text-xl mb-6 flex items-center gap-2 hover:text-gray-300"
        >
          {isOpen ? "Dashboard" : "DB"}
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
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 p-2 rounded hover:bg-red-600 transition-all duration-200"
          >
            <LogOut size={20} />
            {isOpen && <span></span>}
          </button>
        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white text-black p-6 rounded-lg w-80">
      <h2 className="text-lg font-semibold mb-4">
        Are you sure you want to logout?
      </h2>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setShowModal(false)
            handleLogout()
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default Sidebar