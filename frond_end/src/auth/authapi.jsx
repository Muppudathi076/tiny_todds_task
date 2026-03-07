import axiosInstance from "./axiosInstance";

export const loginApi = async(Admin_name,Password)=>{
    const response = await axiosInstance.post("/login/",{
        Admin_name,Password
    })
     return response.data
}
export const UpdatedPasswordApi = async(email,new_password,token)=>{
    console.log("enter the api session")
    const response = await axiosInstance.put("/change/password/",{
        email,new_password
    },        
    {headers:{
            Authorization:`Bearer ${token}`
        } } )
     return response.data
}

export const UserGetApi = async(email,token)=>{
    console.log("token"+token)
    console.log("email :"+email)
    const response = await axiosInstance.get(`/user/details/?email=${email}`,
        {headers:{
            Authorization:`Bearer ${token}`
        } }
    )
    return response.data
}

export const StudentPostApi = async(data,token)=>{
    const response = await axiosInstance.post("/students/",data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
     return response.data
}

export const StudentGetApi = async(token)=>{
    const response = await axiosInstance.get("/students/",{
        headers:{
            Authorization:`Bearer ${token}`
        }   
    })
    return response
}

export const StudentEditApi = async(id,updatedData, token)=>{
    const response = await axiosInstance.put(`/students/${id}`,updatedData,{
            headers:{
            Authorization:`Bearer ${token}`
        }
    })
     return response.data
}
export const StudentDeleteApi = async(id,token)=>{
    const response = await axiosInstance.delete(`/students/${id}`,{
            headers:{
            Authorization:`Bearer ${token}`
        }
    })
     return response.data
}
export const RolePostApi = async(paylod,token)=>{
    const response = await axiosInstance.post("/roles/",paylod,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
     return response.data
}

export const RoleGetApi = async(token)=>{
    const response = await axiosInstance.get("/roles/",{
        headers:{
            Authorization:`Bearer ${token}`
        }   
    })
    return response
}

export const RoleEditApi = async(id,updatedData, token)=>{
    const response = await axiosInstance.put(`/roles/${id}`,updatedData,{
            headers:{
            Authorization:`Bearer ${token}`
        }
    })
     return response.data
}
export const RoleDeleteApi = async(id,token)=>{
    const response = await axiosInstance.delete(`/roles/${id}`,{
            headers:{
            Authorization:`Bearer ${token}`
        }
    })
     return response.data
}

export const StaffPostApi = async(data,token)=>{
        const response = await axiosInstance.post("/staffs/",data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
         return response.data
    }

export const StaffGetApi = async(token)=>{
        const response = await axiosInstance.get("/staffs/",{
            headers:{
                Authorization:`Bearer ${token}`
            }   
        })
        return response
    }

export const StaffGetByIdApi = async (id, token) => {
    const response = await axiosInstance.get(`/staffs/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const StaffEditApi = async(id,updatedData, token)=>{
        const response = await axiosInstance.put(`/staffs/${id}`,updatedData,{
                headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    }

export const StaffDeleteApi = async(id,token)=>{
        const response = await axiosInstance.delete(`/staffs/${id}`,{
                headers:{
                Authorization:`Bearer ${token}`
            }
        })
         return response.data
    }

export const DashboardApi = async (token) => {
        const response = await axiosInstance.get(`user/dashboard/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }