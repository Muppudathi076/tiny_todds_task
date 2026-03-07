import { Menu } from "lucide-react"

function Navbar({ toggleSidebar }) {
  const userName = localStorage.getItem("user")

  return (
    <div className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      
      <button 
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-gray-100 transition"
      >
        <Menu size={22} />
      </button>

      <h3 className="text-sm sm:text-lg font-semibold text-black truncate max-w-[10px] sm:max-w-none">
        Welcome {userName}
      </h3>

    </div>
  )
}

export default Navbar