import axiosInstance from "./axiosInstance"

export async function logWorkout(workoutData, token) {
    const response = await axiosInstance.post("/workouts/", workoutData, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

export async function getWorkouts(token) {
    const response = await axiosInstance.get("/workouts/", {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}
