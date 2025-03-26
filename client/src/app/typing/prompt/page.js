"use client";

import Scoreboard from "@/app/partials/scoreboard";
import "../../../styles/prompt-page.css";
import { useState } from "react";
import Link from "next/link";

export default function PromptPage() {
    const [difficulty, setDifficulty] = useState("easy");
    const [theme, setText] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        const requestData = {
            difficulty: difficulty,
            theme: theme,
        };

        try {
            const res = await fetch("http://localhost:3001/api/v1/ai/generate-test-prompt/", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!res.ok) {
                throw new Error("Failed to generate prompt.");
            }

            const data = await res.json();
            console.log("AI generated text:", data.data);
            setResponse(data.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="prompt-container">
                <h1 className="prompt-title">Generate a Prompt</h1>

                <form className="prompt-form" onSubmit={handleSubmit}>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="prompt-select">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="expert">Expert</option>
                    </select>

                    <textarea placeholder="Enter theme here..." className="prompt-input" value={theme} onChange={(e) => setText(e.target.value)} />

                    <button type="submit" className="prompt-button" disabled={loading}>{loading ? "Generating..." : "Submit"}</button>
                </form>

                {response && (
                    <div className="prompt-response">
                        <h3>Generated Prompt:</h3>
                        <p>{response.text}</p>
                        <Link href={{
                            pathname: '/typing/test',
                            query: {
                                data: btoa(encodeURIComponent(JSON.stringify({
                                            testDuration: 15,
                                            prompt: response.text,
                                            promptid: response.promptid,
                                        })))
                            }
                        }}>Use Prompt</Link>
                    </div>
                )}

                {error && <p className="error-message">{error}</p>}
            </div>
            <Scoreboard />
        </>
    );
}
