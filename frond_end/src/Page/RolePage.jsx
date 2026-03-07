import { useEffect, useState } from "react"
import ReusableTable from "../Components/Resubale_Components/ReusableTable"
import { Plus, X ,Pencil,Trash2} from "lucide-react"
import toast from "react-hot-toast"
import { duration } from "@mui/material"
import { RoleDeleteApi, RoleEditApi, RoleGetApi, RolePostApi, StaffGetApi } from "../auth/authapi"

function RolePage() {
  
  const token = localStorage.getItem("access_token")
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [DeleteId, setDeleteId] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [roleDataForm, setRoleDataForm] = useState({
    role: "",
    status: true
  })

  const [roleData, setRoledata] = useState([])

const fetching = async () => {
  const response = await RoleGetApi(token)
  const staffresponse = await StaffGetApi(token)

  const roles = response.data
  const staff = staffresponse.data

  const table_data = roles.map((roleItem) => {
    const count = staff.filter(
      (emp) => emp.role === roleItem.role
    ).length

    return {
      id:roleItem.id,
      role: roleItem.role,
      status: roleItem.status,
      employee_count: count
    }
  })
  setRoledata(table_data)
}

  const table_data = []

  const handleToggle = async(id,field,currentValue)=>{
      const updatedValue = !currentValue
      try{
        await RoleEditApi(id,{[field]:updatedValue},token)
        fetching()
        toast.success("Updated successfulyy",{duration:2000})
      }catch(e){
        toast.error("Something went wrong")
      }
  }
  const columns = [
    { header: "Role Name", accessor: "role" },
    { header: "Total Employees", accessor: "employee_count" },
  {
    header: "Status",
    accessor: "status",
    cell: (row) => {
      const value = row.status
  
      return (
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggle(row.id, "status", value)
          }}
          className={`relative w-16 h-8 flex items-center rounded-full cursor-pointer transition-all durations-300 ${
            value ? "bg-green-500" : "bg-red-500"
          }`}
        >
            <span className={`absolute text-white text-sm font-bold transition-all duration-30 ${ value ? "left-3":"right-3"}`}>
                {value ? "✓" : "✕"}
            </span>
                  <div
                className={`absolute w-7 h-7 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                    value ? "translate-x-8" : "translate-x-1"
                }`}
                />
        </div>
      )
    }
  }
  ]

const handleCreateRole = async () => {

  console.log("Payload:", roleDataForm)

  try {
    if(editModal){
      await RoleEditApi(roleDataForm.id, roleDataForm, token)
      toast.success("Update successfully",{duration: 2000})
    }
    else{
      await RolePostApi(roleDataForm, token)
      toast.success("Create Role Successfully", { duration: 2000 })
    }

    setShowModal(false)
    setEditModal(false)

    setRoleDataForm({
      role: "",
      status: true
    })
    fetching()
  } catch (e) {
    console.log("API Error:", e)
    toast.error("Something went wrong")
  }
}
const close = ()=>{
  setEditModal(false)
  setRoleDataForm({
    role: "",
    status: true
  })
  setShowModal(false)
}

const handleEdit = (role)=>{
  console.log("Edit row:", role) 
  setRoleDataForm({
    id: role.id,
    role: role.role,
    status: role.status
  })  
  setShowModal(true)
  setEditModal(true)
}
const confirmDelete = async()=>{
  try{
    await RoleDeleteApi(DeleteId,token)
    toast.success("successfully Delete the Data")
    fetching()
  }catch(e){
    toast.error(e.response?.data?.message )
  }
  setShowDeleteModal(false)
}
useEffect(()=>{
  fetching()
},[])

  return (
    <div className="p-4">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-xl text-black font-semibold">
          Role Management
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Create Role
        </button>
      </div>

      <ReusableTable 
      columns={columns}
      data={roleData} 
      actions={(row) => (
      <div className="flex justify-center gap-3">
          <button onClick={(e)=>{e.stopPropagation()
              handleEdit(row)}}className="text-blue-500 bg-white">
          <Pencil size={18} />
          </button>
          <button
          onClick={(e) => {
              e.stopPropagation()
              setDeleteId(row.id)
              setShowDeleteModal(true)
          }}
          className="text-red-500 bg-white ml-3"
          >
          <Trash2 size={18} />
          </button>
      </div>)}/>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] sm:w-96 p-6 rounded-lg shadow-lg relative">

            <button
              onClick={() => close()}
              className="absolute top-3 right-3 bg-white text-gray-500 hover:text-black"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg text-black font-semibold mb-4">
              {editModal ? "Update Role":"Create New Role"}
            </h3>

            <input
              type="text"
              placeholder="Enter role name"
              value={roleDataForm.role}
                onChange={(e) =>
                  setRoleDataForm({
                    ...roleDataForm,
                    role: e.target.value
                  })
                }
              className="w-full border p-2 rounded mb-4"
            />
            {!editModal &&  (<select
              value={roleDataForm.status ? "true" : "false"}
              onChange={(e) =>
                setRoleDataForm({
                  ...roleDataForm,
                  status: e.target.value === "true"
                })
              }
              className="w-full border p-2 rounded mb-4"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>)}

            <div className="flex justify-end gap-3">

              <button
                onClick={handleCreateRole}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
               { editModal ? "Update" : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}
      {showDeleteModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
                <div className="bg-white p-6 rounded-lg w-80 shadow-lg">

                <h2 className="text-lg font-semibold text-center">
                    Confirm Delete
                </h2>

                <p className="text-gray-600 text-center mt-2">
                    Are you sure you want to delete this staff?
                </p>

                <div className="flex justify-center gap-4 mt-5">
                    <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-gray-700 rounded-lg"
                    >
                    Cancel
                    </button>

                    <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                    Delete
                    </button>
                </div>

                </div>
            </div>
            )}
    </div>
  )
}

export default RolePage