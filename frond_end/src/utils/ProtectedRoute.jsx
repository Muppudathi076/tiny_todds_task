import { Navigate } from "react-router-dom"

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const expiryTime = payload.exp * 1000

    return Date.now() > expiryTime
  } catch (error) {
    return true
  }
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token")

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("access_token")
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute