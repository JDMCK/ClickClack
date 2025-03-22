"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'



export default function UserProfile() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    // TODO: implement log out req and function to handle in backend
    
    return (
        <div className="container">
            <h2>Type</h2>
            <div onClick={() => { router.push('/typing/prompt'); }}>
                <h4>Start typing</h4>
                <p>Generate new text or use a previous one.</p>
            </div>
            <div className='container'>
                <h5>Control pannel</h5>
                <p>Remaining tokens:</p>
                <button type="submit" className="logout-button" disabled={loading}>{loading ? "Logging out..." : "Logout"}</button>

            </div>
            <div className='scoreboard container'>
                <h4>Scoreboard</h4>
                <p>Your previous typing runs</p>
                {/* 
                Here we'll display the user's previous runs and metrics
                 */}
            </div>
        </div>)
}