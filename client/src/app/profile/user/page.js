"use client"

import Scoreboard from '@/app/partials/scoreboard';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'



export default function UserProfile() {
    const router = useRouter()
    const [availableTokens, setAvailableTokens] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // TODO: implement log out req and function to handle in backend
    const logOut = async () => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/tokens", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            });
            const res = await response.json();
            //TODO: tell backend team about this structure
            setAvailableTokens(res.data.availableTokens)
        } catch (error) {
            console.log(error);
            setError(Error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">

            <div className='content-box'>
                <div className='content' >
                    <h4>Start another run?</h4>
                    <p>Generate new text or use a previous one.</p>
                    <button onClick={() => { router.push('/typing/prompt'); }}>Start</button>
                </div>
                <div className='content'>
                    <h4>Control pannel</h4>
                    <p>Remaining tokens:</p>
                    <button type="submit" className="logout-btn" disabled={loading}>{loading ? "Logging out..." : "Logout"}</button>

                </div>
            </div>
            <Scoreboard />
        </div>
    )
}