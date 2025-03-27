"use client"

import Scoreboard from '@/app/partials/scoreboard';
import { useRouter } from 'next/navigation'
import { useState } from 'react'



export default function UserProfile() {
  const router = useRouter()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // TODO: implement log out req and function to handle in backend

  return (
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
          <p>Remaining tokens:</p>
          <button type="submit" className="logout-btn" disabled={loading}>{loading ? "Logging out..." : "Logout"}</button>

        </div>
      </div>
      <Scoreboard />
    </div>
  )
}