import { useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"

function Navbar({toggleSidebar} ) {
  const navigate = useNavigate()
  const userName = localStorage.getItem("user") 

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
        <button onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      <h3 className="text-lg font-semibold text-black">
        Welcome {userName}
      </h3>

    </div>
  )
}

export default Navbar