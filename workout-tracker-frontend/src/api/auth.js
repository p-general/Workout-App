import axiosInstance from "./axiosInstance"

const API_URL = "http://localhost:8000"

export async function loginUser(username, password) {
    const formData = new URLSearchParams()
    formData.append("username", username)
    formData.append("password", password)

    const response = await axiosInstance.post("/auth/login", formData)
    return response.data
}

export async function registerUser(email, username, password) {
    const response = await axiosInstance.post("/auth/register", {
        email,
        username,
        password
    })
    return response.data
}

