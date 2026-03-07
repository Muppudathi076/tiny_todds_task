import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import ReusableTable from "../Components/Resubale_Components/ReusableTable";
import { Pencil,Trash2,X } from "lucide-react";
import ReusablePagination from "../Components/Resubale_Components/ReusablePagination";
import toast from "react-hot-toast"
import { StaffDeleteApi,StaffGetByIdApi, StaffEditApi, StaffGetApi, StaffPostApi, RoleGetApi } from "../auth/authapi";
import { useNavigate } from "react-router-dom";
import ReusableForm from "../Components/Resubale_Components/ReusableForm";

function Staff (){
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedStaff, setSelectedStaff] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [createModel, setCreateModel] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [currentDatas, setCurrentData] = useState([])
    const [roles, setRoles] = useState([]);
    const [newStaff, setNewStaff] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        date_of_birth: "",
        qualification: "",
        experience: "",
        salary: "",
        join_date: "",
        role: "",
        status: true,

    })

    function formatLabel(key) {
    return key
        .replace(/_/g, " ")
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, str => str.toUpperCase());
    }
    const itemsPerPage = 5
    const [staffData, setStaffData] = useState([])
    const role = localStorage.getItem("role")
const handleToggle = async(id, field, currentValue) => {
  const updatedValue = !currentValue

  // setCurrentData(prev =>
  //   prev.map(item =>
  //     item.id === id
  //       ? { ...item, [field]: updatedValue }
  //       : item
  //   )
  // )
  try{
      await StaffEditApi(id,{ [field]: updatedValue }, token)
      fetching()
      toast.success("Updated data successfully",{duration:2000})
  }catch (error) {
    console.error(error)
    toast.error("Update failed")

    // setCurrentData(prev =>
    //   prev.map(item =>
    //     item.id === id
    //       ? { ...item, [field]: currentValue }
    //       : item
    //   )
    // )
  }
}

const columns = [
  { header: "Name", accessor: "full_name" },
  { header: "Email", accessor: "email" },
  { header: "Phone No", accessor: "phone" },
  { header: "Role", accessor: "role" },

  ...(role === "super_admin"
    ? [
        {
          header: "Create",
          accessor: "create_option",
          cell: (row) => {
            const value = row.create_option
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggle(row.id, "create_option", value)
                }}
                className={`relative w-16 h-8 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
                  value ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute text-white text-sm font-bold ${
                    value ? "left-3" : "right-3"
                  }`}
                >
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
        },

        {
          header: "Edit",
          accessor: "edit_option",
          cell: (row) => {
            const value = row.edit_option
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggle(row.id, "edit_option", value)
                }}
                className={`relative w-16 h-8 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
                  value ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute text-white text-sm font-bold ${
                    value ? "left-3" : "right-3"
                  }`}
                >
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
        },

        {
          header: "Delete",
          accessor: "delete_option",
          cell: (row) => {
            const value = row.delete_option
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggle(row.id, "delete_option", value)
                }}
                className={`relative w-16 h-8 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
                  value ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute text-white text-sm font-bold ${
                    value ? "left-3" : "right-3"
                  }`}
                >
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
    : [])
]
    const indexOfLast = currentPage * itemsPerPage
    const indexOfFirst = indexOfLast - itemsPerPage
    const currentData = staffData.slice(indexOfFirst, indexOfLast)
    const token = localStorage.getItem("access_token")

    const handlesubmit = async(e)=>{
        e.preventDefault()
        console.log("enter the handle")
        try{
            if(isEdit){
                console.log("newStaff Id",newStaff.id)
                await StaffEditApi(newStaff.id,newStaff, token)
                toast.success("Updated data successfully",{duration:2000})
            }else{
                console.log("Enter the api:",newStaff)
                await StaffPostApi(newStaff,token)
                toast.success("New Staff Created Successfully",{duration:2000})
            }
            fetching()
            setCreateModel(false)
            setIsEdit(false)
        
            setNewStaff({
                full_name: "",
                email: "",
                phone: "",
                address: "",
                date_of_birth: "",
                qualification: "",
                experience: "",
                salary: "",
                status: true,
                role: "",
                join_date: "",
            })
        }catch (error) {
            console.log("API Error:", error);

            if (error.response && error.response.data) {
                const errorData = error.response.data;

                const firstKey = Object.keys(errorData)[0];
                const message = errorData[firstKey][0];

                toast.error(message, { duration: 3000 });
            } else {
                toast.error("Something went wrong");
            }
            }
    }

    const handleEdit = (staff) => {
        setNewStaff(staff)
        setIsEdit(true)
        setCreateModel(true)
        }
    const confirmDelete = async() => {
        await StaffDeleteApi(deleteId,token)
        fetching()
        setShowDeleteModal(false)
        setDeleteId(null)
        toast.success("Staff deleted successfully")
    }

    const fetching =  async()=>{
        const response = await StaffGetApi(token)
        console.log("staff details :",response.data)
        setStaffData(response.data)
    }

    const handleRowClick = async (row) => {
    try {
        const response = await StaffGetByIdApi(row.id, token)
        setSelectedStaff(response.data)
        setOpenModal(true)
    } catch (error) {
        console.error("Error fetching staff:", error)
    }
}
const close = () => {
  setIsEdit(false);

  setNewStaff({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    qualification: "",
    experience: "",
    salary: "",
    status: true,
    role: "",
    join_date: "",
  });

  setCreateModel(false);
};

  const fetchRoles = async () => {
    try {
      const res = await RoleGetApi(token); 
      console.log("res data:",res.data)
      setRoles(res.data); 
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(()=>{
        fetching()
        fetchRoles()
    },[])
return(
        <div className="min-w-full p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 w-full">  
                    <h2 className="text-black font-bold text-lg sm:text-xl">Staff Details</h2>
                <div className="">
                    <button onClick={()=>{setCreateModel(true)}} 
                    className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        Add Staff
                    </button>
                </div>
            </div>
            <div className="w-full p-2">
                <ReusableTable
                    columns={columns}
                    data={currentData}
                    onRowClick={handleRowClick}
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
                    </div>
                    )}
                />
                <div className="flex justify-center mt-4">
                    <ReusablePagination
                        totalItems={staffData.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
            {createModel && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
                    <div className="bg-white  p-6 rounded-lg max-w-2xl">
                        <div className="flex justify-end">
                            <button onClick={close}
                            className="bg-white text-black border-0 focus:outline-none"><X size={18}/></button>
                        </div>
                            <h2 className="text-black text-2xl font-bold justify-center flex">
                            {isEdit ? "Edit Staff Details" : "New Staff Details"}
                            </h2>                        
                        <div className="flex justify-between">
                            <div>
                                <input 
                                type="text" 
                                placeholder="Full Name"
                                value={newStaff.full_name}
                                onChange={(e)=>{
                                    setNewStaff({...newStaff, full_name:e.target.value})
                                }}
                                className="w-full border p-2 mt-3"/>

                                <input 
                                type="text" 
                                placeholder="Email"
                                value={newStaff.email}
                                onChange={(e)=>{
                                    setNewStaff({...newStaff, email:e.target.value})
                                }}
                                className="w-full border p-2 mt-3"/>

                                <input 
                                type="text" 
                                placeholder="Phone"
                                value={newStaff.phone}
                                onChange={(e)=>{
                                    setNewStaff({...newStaff, phone:e.target.value})
                                }}className="w-full border p-2 mt-3"
                                />

                                <input 
                                type="text"                             
                                value={newStaff.date_of_birth}
                                onChange={(e)=>{
                                    setNewStaff({...newStaff, date_of_birth:e.target.value})
                                }}
                                placeholder="Date of Birth :YYYY-MM-DD"
                                className="w-full border p-2 mt-3"/>

                                <input 
                                type="text"                             
                                value={newStaff.qualification}
                                placeholder="Qualification"
                                onChange={(e)=>{
                                    setNewStaff({...newStaff, qualification:e.target.value})
                                }}
                                className="w-full border p-2 mt-3"/>

                            </div>
                            <div>
                                <input type="text"                             
                                value={newStaff.experience}
                                placeholder="Experience"
                                onChange={(e)=>{
                                    setNewStaff({...newStaff, experience:e.target.value})
                                }}
                                className="w-full border p-2 mt-3"/>

                                <input type="text"                             
                                value={newStaff.salary}
                                placeholder="Salary"
                                onChange={(e)=>{
                                    setNewStaff({...newStaff, salary:e.target.value})
                                }}
                                className="w-full border p-2 mt-3"/>

                                <input type="text"                             
                                value={newStaff.join_date}
                                placeholder="Join_date : YYYY-MM-DD"
                                onChange={(e)=>{
                                    setNewStaff({...newStaff, join_date:e.target.value})
                                }}
                                className="w-full border p-2 mt-3"/>
                                <select
                                  value={newStaff.role}
                                  onChange={(e) =>
                                    setNewStaff({ ...newStaff, role: e.target.value })
                                  }
                                  className="w-full border p-2 mt-3"
                                >
                                  <option value="">Select Role</option>

                                  {roles.map((role) => (
                                    <option key={role.id} value={role.role}>
                                      {role.role}
                                    </option>
                                  ))}
                                </select>
                                <input type="text"                             
                                value={newStaff.address}
                                placeholder="Address"
                                onChange={(e)=>{
                                    setNewStaff({...newStaff, address:e.target.value})
                                }}
                                className="w-full border p-2 mt-3"/>
                            </div>
                        </div>
                                <select
                                value={newStaff.status === true ? "true" : "false"}
                                
                                onChange={(e) =>
                                    setNewStaff({
                                    ...newStaff,
                                    status: e.target.value === "true"  
                                    })
                                }
                                className="w-full border p-2 mt-3"
                                >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                                </select>
                        <div className="flex justify-center mt-4">
                            <button onClick={handlesubmit}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                            >{isEdit ? "Update" : "Submit"}</button>
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
<Dialog
  open={openModal}
  onClose={() => setOpenModal(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle sx={{ fontWeight: 600 }}>
    Staff Details
  </DialogTitle>

  <DialogContent dividers>
    {selectedStaff && (
      <div className="bg-white p-4 rounded-xl">

        {Object.entries(selectedStaff)
          .filter(([key]) => key !== "id")
          .filter(([key]) => key !== "view_option")
          .map(([key, value]) => (
            <ReusableForm
              key={key}
              label={formatLabel(key)}
              value={
                typeof value === "boolean"
                  ? value ? "Active" : "Inactive"
                  : value
              }
            />
        ))}

      </div>
    )}
  </DialogContent>

</Dialog>
        </div>
    )
}
export default Staff