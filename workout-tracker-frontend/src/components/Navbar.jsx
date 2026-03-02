import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../store/authStore"

function Navbar() {
    const token = useAuthStore((state) => state.token)
    const logout = useAuthStore((state) => state.logout)
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate("/login")
    }

    return (
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/log">Log Workout</Link>
            {token ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    )
}

export default Navbar
