import { getTests } from "@/utils/api";
import { useState } from "react"



export default function Scoreboard() {
  const [scores, setScores] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/api/v1/tests/get-tests?limit=5", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error("Failed to fetch scores.");
      }
      // const response = await getTests()

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
      <h3>Previous Trials</h3>
      {/* Structure and display scores as a table */}
      <table className="score-table">
        <thead>
          <tr>
            <th>Prompt ID</th>
            <th>Date</th>
            <th>WPM</th>
            <th>AWPM</th>
            <th>Difficulty</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6">Error: {error}</td>
            </tr>
          ) : scores.length === 0 ? (
            <tr>
              <td colSpan="6">No scores available...</td>
            </tr>
          ) : (
            scores.map((score) => (
              <tr key={score.promptId}>
                <td>{score.promptId}</td>
                <td>{new Date(score.date).toLocaleDateString()}</td>
                <td>{score.wpm}</td>
                <td>{score.awpm}</td>
                <td>{score.difficulty}</td>
                <td>{score.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}