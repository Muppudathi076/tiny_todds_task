import { Pencil, Trash2, Eye } from "lucide-react"
import { useState,useEffect } from "react"
import { StudentEditApi,StudentGetApi,StudentDeleteApi,StudentPostApi } from "../auth/authapi"
import toast from "react-hot-toast"

function StudentView(){
    const [data, setData] = useState([])
    const token =localStorage.getItem('data.access_token')
    const [showModal, setShowModal] = useState(false)
    const [editModal, setEditModel] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const [newStudent, setNewStudent] = useState({
        name: "",
        age: "",
        study: "",
        Phone_No: "",
        Address: "",
        Father_Name: "",
        Mother_Name: "",
    })
    const [editStudent, setEditStudent] = useState({
        id:"",
        name: "",
        age: "",
        study: "",
        Phone_No: "",
        Address: "",
        Father_Name: "",
        Mother_Name: "",
    })
    const fetchdata = async()=>{
        const response = await StudentGetApi(token)
        setData(response.data)
    }

    useEffect(()=>{
        fetchdata()
    },[])

    const handleDelete = async (id)=>{
        try{
            await StudentDeleteApi(id,token)
            toast.success("Delete success",{duration:2000})
            fetchdata()
        }catch(e){
            toast.error("Something is wrong")
        }
    }

    const handleEdit = (student)=>{
        setEditStudent(student)
        setEditModel(true)

        console.log("edit button workin",student)
    }
    const handleUpdate =async()=>{
        try{
            await  StudentEditApi(
                editStudent.id,
                {
                    name:editStudent.name,
                    age:editStudent.age,
                    study:editStudent.study,
                    Phone_No:editStudent.Phone_No,
                    Address:editStudent.Address,
                    Father_Name:editStudent.Father_Name,
                    Mother_Name:editStudent.Mother_Name,
                }
            )
            setEditModel(false)
            fetchdata()
            toast.success("Update the Data",{duration:2000})
        }catch(e){
            toast.error("Something is wrong",{duration:2000})
        }
    }
    const handleCreate = async () => {
        try{
            await StudentPostApi(newStudent, token)
            setShowModal(false)
            setNewStudent({ name: "", age: "", study: "" ,phone: "" ,address: "" })
            fetchdata()
            toast.success("New Data is Create",{duration:2000})
        }catch(e){
            toast.error("Something is wrong",{duration:2000})
        }
    }
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.study.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.age.toString().includes(searchTerm)
        )
    return(
        <div className="">
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search by Name, Age, Study..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="w-full mt-0 flex items-center p-3 justify-between">
                <div>
                    <h2 className="text-2xl text-black font-bold mb-5 text-start">Student Details</h2>
                </div>
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setShowModal(true)}>Add Student</button>
                </div>
            </div>
            <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {filteredData.map((datas) => (
                <div
                key={datas.id}
                className="bg-white shadow-md rounded-xl p-5 border hover:shadow-blue-400 hover:shadow-lg transition"
                >
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {datas.name}
                </h2>

                <p className="text-gray-600">
                    <span className="font-semibold">Age:</span> {datas.age}
                </p>

                <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Study:</span> {datas.study}
                </p>
                <div className="flex justify-start space-x-2">
                    <button
                    onClick={() => handleEdit(datas)}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                    >
                    <Pencil size={18} />
                    </button>

                    <button
                    onClick={() => handleDelete(datas.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                    <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                            setSelectedStudent(datas)
                            setIsOpen(true)
                        }}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                    <Eye size={18} />
                    </button>
                </div>
                </div>
            ))}
            </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-lg w-96">

                        <h2 className="text-xl text-black font-bold mb-4">Add Student</h2>

                        <input
                            type="text"
                            placeholder="Name"
                            value={newStudent.name}
                            onChange={(e) =>
                                setNewStudent({ ...newStudent, name: e.target.value })
                            }
                            className="w-full border p-2 mb-3"
                        />

                        <input
                            type="number"
                            placeholder="Age"
                            value={newStudent.age}
                            onChange={(e) =>
                                setNewStudent({ ...newStudent, age: e.target.value })
                            }
                            className="w-full border p-2 mb-3"
                        />

                        <input
                            type="text"
                            placeholder="Study"
                            value={newStudent.study}
                            onChange={(e) =>
                                setNewStudent({ ...newStudent, study: e.target.value })
                            }
                            className="w-full border p-2 mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Father Name"
                            value={newStudent.Father_Name}
                            onChange={(e) =>
                                setNewStudent({ ...newStudent, Father_Name: e.target.value })
                            }
                            className="w-full border p-2 mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Mother Name"
                            value={newStudent.Mother_Name}
                            onChange={(e) =>
                                setNewStudent({ ...newStudent, Mother_Name: e.target.value })
                            }
                            className="w-full border p-2 mb-4"
                        />
                            <input
                                type="text"
                                placeholder="Phone No"
                                value={newStudent.Phone_No}
                                onChange={(e) =>
                                    setNewStudent({ ...newStudent, Phone_No: e.target.value })
                                }
                                className="w-full border p-2 mb-4"
                            />
                        <input
                            type="text"
                            placeholder="Address"
                            value={newStudent.Address}
                            onChange={(e) =>
                                setNewStudent({ ...newStudent, Address: e.target.value })
                            }
                            className="w-full border p-2 mb-4"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleCreate}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}
            {editModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="w-96 bg-white p-6 rounded-lg">
                        <h2 className="text-black text-xl text-center font-bold mb-4">Updated</h2>
                        <div className="mb-4">
                            <input type="text" value={editStudent.name} onChange={(e)=>{
                                setEditStudent({...editStudent, name:e.target.value})
                            }} 
                            className="w-full border p-2 mb-3 rounded-lg"/>
                            <input type="text" value={(editStudent.age)} onChange={(e)=>{
                                setEditStudent({...editStudent, age:e.target.value})
                            }} 
                            className="w-full border p-2 mb-3 rounded-lg"/>
                            <input type="text" value={(editStudent.study)} onChange={(e)=>{
                                setEditStudent({...editStudent, study:e.target.value})
                            }}
                            className="w-full border p-2 mb-3 rounded-lg"/>
                            <input type="text" value={(editStudent.Father_Name)} onChange={(e)=>{
                                setEditStudent({...editStudent, Father_Name:e.target.value})
                            }}
                            className="w-full border p-2 mb-3 rounded-lg"/>
                            <input type="text" value={(editStudent.Mother_Name)} onChange={(e)=>{
                                setEditStudent({...editStudent, Mother_Name:e.target.value})
                            }}
                            className="w-full border p-2 mb-3 rounded-lg"/>
                            <input type="text" value={(editStudent.Phone_No)} onChange={(e)=>{
                                setEditStudent({...editStudent, Phone_No:e.target.value})
                            }}
                            className="w-full border p-2 mb-3 rounded-lg"/>
                            <input type="text" value={(editStudent.Address)} onChange={(e)=>{
                                setEditStudent({...editStudent, Address:e.target.value})
                            }}
                            className="w-full border p-2 mb-3 rounded-lg"/>

                        </div>
                        <div className="mb-0 flex justify-end gap-3">
                            <button onClick={()=>setEditModel(false)}
                            className="bg-red-500 hover:bg-red-600 px-2 py-2 text-white mb-2 rounded-lg">
                                Cancel
                            </button>
                            <button onClick={handleUpdate}
                            className="bg-blue-500 hover:bg-blue-600 px-2 py-2 text-white mb-2 rounded-lg">Update</button>
                        </div>
                    </div>

                </div>
            )}
            {isOpen && selectedStudent && (
                <div className="fixed inset-0 text-black flex items-center justify-center bg-black bg-opacity-50 z-50">
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
                    
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Student Details
                    </h2>

                    <p><strong>Name:</strong> {selectedStudent.name}</p>
                    <p><strong>Age:</strong> {selectedStudent.age}</p>
                    <p><strong>Study:</strong> {selectedStudent.study}</p>
                    <p><strong>Father Name:</strong> {selectedStudent.Father_Name}</p>
                    <p><strong>Mother Name:</strong> {selectedStudent.Mother_Name}</p>
                    <p><strong>Phone No:</strong> {selectedStudent.Phone_No}</p>
                    <p><strong>Address:</strong> {selectedStudent.Address}</p>

                    <div className="mt-6 text-center">
                        <button
                        onClick={() => setIsOpen(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                        Close
                        </button>
                    </div>

                    </div>

                </div>
                )}
        </div>
    )
}
export default StudentView