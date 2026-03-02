import axios from "axios"

const API_URL = "http://localhost:8000"

export async function logWorkout(workoutData, token) {
    const response = await axios.post(`${API_URL}/workouts/`, workoutData, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

export async function getWorkouts(token) {
    const response = await axios.get(`${API_URL}/workouts/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}
