import { useState } from "react"


export default function Scoreboard() {
    const [scores, setScores] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchScores = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/scoreboard?limit=5", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch scores.");
            }
            const fetched = await response.json()
            //TODO: tell backend to implement this endpoint and how structure scores
            setScores(fetchScores.data.scores)
        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="scoreboard container">
            <h3>Scoreboard here...</h3>
            {/* Structure and display scores as a table (styled of course) */}
        </div>
    )
}