import axois from "axois"

const API_URL = "http://localhost:8000"

export async function loginUser(username, password) {
    const formData = new URLSearchParams()
    formData.append("username", username)
    formData.append("password", password)

    const response = await axios.post(`${API_URL}/auth/login`, formData)
    return response.data
}

