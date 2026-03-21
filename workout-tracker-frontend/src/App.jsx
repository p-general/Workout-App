import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import LogWorkout from "./pages/LogWorkout"
import Login from "./pages/Login"
import useAuthStore from "./store/authStore"
import Register from "./pages/Register"


function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token)
  if (!token) return <Navigate to="/login" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/log" element={
          <ProtectedRoute>
            <LogWorkout />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App