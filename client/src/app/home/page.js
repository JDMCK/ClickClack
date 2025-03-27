"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isLoggedin, setLoggedin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const checkAdmin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate.");
      }

      const authRes = await response.json();
      setIsAdmin(authRes.data.isAdmin);
      setLoggedin(authRes.data.loggedin)
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
      checkAdmin();
  }, []);

  const router = useRouter();
  return (
    <div className="container">
      <h1>Ready for some ducktyping?</h1>
      {/* We should make this be the landing page after M2 submission*/}
      <p>// This really should just be the landing page...</p>
      {/* <button>Log in</button>
      <button>Sign up</button> */}
      <div className='content-box'>
        <div className='content' >
            <h2>Start another run?</h2>
            <p>Generate new text or use a previous one.</p>
            <button onClick={() => { router.push('/typing/prompt'); }}>Start</button>
        </div>
        <div className='content' >
          <h2>{isAdmin ? 'Admin' : 'Profile'}</h2>
          <button onClick={() => {
            if (isLoggedin) {
                router.push('/profile');
            } else {
                router.push('/403')
            }
          }}>Go</button>
        </div>
      </div>
    </div>
  );
}