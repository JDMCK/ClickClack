"use client"

import Scoreboard from '@/app/partials/scoreboard';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'



export default function UserProfile() {
    const router = useRouter()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // TODO: implement log out req and function to handle in backend

    return (
        <div className="container">
            <div className='content-box'>

                <div className='content' onClick={() => { router.push('/typing/prompt'); }}>
                    <h4>Start typing</h4>
                    <p>Generate new text or use a previous one.</p>
                </div>
                <div className='content'>
                    <h5>Control pannel</h5>
                    <p>Remaining tokens:</p>
                    <button type="submit" className="logout-button" disabled={loading}>{loading ? "Logging out..." : "Logout"}</button>

                </div>
            </div>
            <Scoreboard />
        </div>
    )
}