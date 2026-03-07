import { Route,Routes } from "react-router-dom"
import Login from "./Page/Login"
import StudentView from "./Page/StudentView"
import DashboardLayout from "./Layout/DashboardLayout"
import ProtectedRoute from "./utils/ProtectedRoute"
import UserProfile from "./Page/UserProfile"
import { Toaster } from "react-hot-toast"
import Staff from "./Page/Staff"
import Dashboard from "./Page/Dashboard"
import RolePage from "./Page/RolePage"

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/api' element={
        <ProtectedRoute>
          <DashboardLayout/>
        </ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard/>} /> 
          <Route path="students" element={<StudentView />} /> 
          <Route path="staff" element={<Staff/>} /> 
          <Route path="profile" element={<UserProfile />} />
          <Route path="rolepage" element={<RolePage />} />
        </Route>
    </Routes>
    </>
  )
}

export default App
