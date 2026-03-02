import { useState,useEffect } from "react"
import { Pencil } from "lucide-react"
import { UpdatedPasswordApi, UserGetApi } from "../auth/authapi"
import toast from "react-hot-toast"

function UserProfile() {
  const [isOpen, setIsOpen] = useState(false)
  const email = localStorage.getItem('email')
  const [formData, setFormData] = useState({
    Admin_name: "",
    password: ""
  })
  const token = localStorage.getItem("access_token")
    
  const fetchdata = async () => {
    const response = await UserGetApi(email,token)
    const user = response[0]   

    setFormData({
      Admin_name: user.Admin_name,
      password: ""
    })
  }
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("updated api ",formData.Admin_name, formData.password)
    try {
      await UpdatedPasswordApi(formData.Admin_name, formData.password,token)
      setIsOpen(false)
      fetchdata()
      toast.success("Password updated successfully", {
      duration: 2000   
    })
    } catch (error) {
          toast.error("Something went wrong", {
      duration: 2000
    })
    }
    
  }
useEffect(()=>{
  fetchdata()
},[])
  return (
    <div className="min-h-screen flex items-start justify-center mt-0 bg-gray-100 p-5">

      <div
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md relative"
      >
        <div className="flex justify-end rounded transition-all duration-200">
          <button onClick={() => setIsOpen(true)}><Pencil size={20}/></button>
        </div>
        <div className="flex justify-center -mt-0 mb-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 hover:shadow-blue-400 shadow-black border-white shadow-lg"
          />
        </div>

        <h2 className="text-2xl text-black font-bold text-center mb-4">
          User Profile
        </h2>

        <div className="mb-0">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData?.Admin_name?.split("@")[0]}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData?.Admin_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Profile
        </button> */}

      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl shadow-xl w-96">

            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>

            <input
              type="text"
              name="Admin_name"
              value={formData?.Admin_name?.split("@")[0]}
              onChange={handleChange}
              placeholder="Name"
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              type="email"
              name="email"
              value={formData?.Admin_name}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full mb-4 px-3 py-2 border rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default UserProfile