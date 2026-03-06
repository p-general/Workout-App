import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logWorkout } from "../api/workouts"
import useAuthStore from "../store/authStore"

function LogWorkout() {
    const [exercise, setExercise] = useState("")
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")
    const [weight, setWeight] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const token = useAuthStore((state) => state.token)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        try {
            await logWorkout(
                {
                    exercise,
                    sets: parseInt(sets),
                    reps: parseInt(reps),
                    weight: parseFloat(weight)
                },
                token
            )
            setSuccess(true)
            setExercise("")
            setSets("")
            setReps("")
            setWeight("")
        } catch (err) {
            setError("Failed to log workout. Please try again.")
        }
    }

    return (
        <div>
            <h1>Log Workout</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Exercise</label>
                    <input
                        type="text"
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                    />
                </div>
                <div>
                    <label>Sets</label>
                    <input
                        type="number"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                    />
                </div>
                <div>
                    <label>Reps</label>
                    <input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                    />
                </div>
                <div>
                    <label>Weight (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                {success && <p>Workout logged!</p>}
                <button type="submit">Log Workout</button>
            </form>
        </div>
    )
}

export default LogWorkout
