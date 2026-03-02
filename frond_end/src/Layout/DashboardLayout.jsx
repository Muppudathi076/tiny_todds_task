import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import Navbar from "../Components/Navbar"

function DashboardLayout() {
    const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar isOpen={isOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)}/>
        <div className="p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout