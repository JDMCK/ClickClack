"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getUserProfile } from '../../../utils/api'

export default function UserProfile() {
    const router = useRouter()
    const [error, setError] = useState(null);
    const [apiTokens, setApiTokens] = useState(0)
    const [loading, setLoading] = useState(false);

    // TODO: implement log out req and function to handle in backend

        
      useEffect(() =>{
        const fetchTokens = async () => {
          setLoading(true)
          setError(null)
          try {
            const response = await getUserProfile();
            const trials = response.tokenCount
            console.log("User has ", trials);
            setApiTokens(trials)
      
          } catch (error) {
            console.log("Error fetching the user's trials", error);
            setError(error)
          } finally {
            setLoading(false)
          }
        }
        fetchTokens();
      }, [])
    

    return (
        <>
        <div className="container">
            <h1>You're an Admin Duck!</h1>
            
            <div className='content-box'>
                <div className='content' >
                    <h4>Start another run?</h4>
                    <p>Generate new text or use a previous one.</p>
                    <button onClick={() => { router.push('/typing/prompt'); }}>Start</button>
                </div>
                <div className='content'>
                    <h4>Control pannel</h4>
                    <p>Remaining tokens: {apiTokens}</p>
                    <button type="submit" className="logout-btn" disabled={loading}>{loading ? "Logging out..." : "Logout"}</button>

                </div>
            </div>
            <Scoreboard />
        </div>
        <div>
            
        </div>
        </>
    )
}