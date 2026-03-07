import { useState, } from "react"
import { Outlet,useNavigate } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import Navbar from "../Components/Navbar"
import toast from "react-hot-toast"

function DashboardLayout() {
  const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(true)
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const handleLogout = () => {
      localStorage.removeItem("access_token")
      navigate("/")
      toast.success("Logout successfully",{duration:2000})
    }
  return (
    <div className="h-screen bg-gray-100">

      <Sidebar isOpen={isOpen} openLogout={() => setShowLogoutModal(true)}/>

      <div
        className={`flex flex-col h-full transition-all duration-300 
        ${isOpen ? "ml-64" : "ml-0"}`}
      >        
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)}/>
        <div className="p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
      {showLogoutModal && (
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
                  setShowLogoutModal(false)
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

export default DashboardLayout