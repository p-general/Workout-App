import { useEffect, useState } from "react"
import { getWorkouts, deleteWorkout } from "../api/workouts"
import useAuthStore from "../store/authStore"

function Dashboard() {
    const [workouts, setWorkouts] = useState([])
    const [error, setError] = useState(null)
    const token = useAuthStore((state) => state.token)

    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const data = await getWorkouts(token)
                setWorkouts(data)
            } catch (err) {
                setError("Failed to load workouts.")
            }
        }
        fetchWorkouts()
    }, [token])

    async function handleDelete(workoutId) {
            try {
                await deleteWorkout(workoutId, token)
                setWorkouts(workouts.filter((w) => w.id !== workoutId))
            }
            catch (err) {
                setError("Failed to delete workout.")
            }
        }

    return (
        <div>
            <h1>Dashboard</h1>
            {error && <p>{error}</p>}
            {workouts.length === 0 ? (
                <p>No workouts logged yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Weight (kg)</th>
                            <th>Date</th>
                            <th>Delete</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((workout) => (
                            <tr key={workout.id}>
                                <td>{workout.exercise}</td>
                                <td>{workout.sets}</td>
                                <td>{workout.reps}</td>
                                <td>{workout.weight}</td>
                                <td>{new Date(workout.logged_at).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleDelete(workout.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Dashboard
