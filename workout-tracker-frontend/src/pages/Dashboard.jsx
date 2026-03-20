import { useEffect, useState } from "react"
import { getWorkouts, deleteWorkout } from "../api/workouts"
import useAuthStore from "../store/authStore"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

function Dashboard() {
    const [workouts, setWorkouts] = useState([])
    const [error, setError] = useState(null)
    const [selectedExercise, setSelectedExercise] = useState("")
    const token = useAuthStore((state) => state.token)

    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const data = await getWorkouts(token)
                setWorkouts(data)
                if (data.length > 0) setSelectedExercise(data[0].exercise)
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
        } catch (err) {
            setError("Failed to delete workout.")
        }
    }

    const exercises = [...new Set(workouts.map((w) => w.exercise))]

    const chartData = workouts
        .filter((w) => w.exercise === selectedExercise)
        .map((w) => ({
            date: new Date(w.logged_at).toLocaleDateString(),
            weight: w.weight
        }))

    return (
        <div>
            <h1>Dashboard</h1>
            {error && <p>{error}</p>}

            {workouts.length === 0 ? (
                <p>No workouts logged yet.</p>
            ) : (
                <>
                    <h2>Progress</h2>
                    <select
                        value={selectedExercise}
                        onChange={(e) => setSelectedExercise(e.target.value)}
                    >
                        {exercises.map((ex) => (
                            <option key={ex} value={ex}>{ex}</option>
                        ))}
                    </select>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>

                    <h2>History</h2>
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
                </>
            )}
        </div>
    )
}

export default Dashboard
