"use client"

import Scoreboard from '@/app/partials/scoreboard';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getUserProfile } from '../../../utils/api'
import Scoreboard from '@/app/partials/scoreboard'
import 'dotenv/config'


export default function UserProfile() {
  const router = useRouter()
  const [error, setError] = useState(null);
    const [displayName, setDisplayName] = useState(null)
    const [apiTokens, setApiTokens] = useState(0)
    const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO: implement log out req and function to handle in backend

    /**
     * Fetch the Users data for the Admin dash board
     */
    const fetchUsersData = async () =>{
        setLoading(true);
        setError(null);
        try{
            const response = await fetch('http://localhost:3001/api/v1/users/admin/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            });

            if(!response.ok){
                throw new Error("Failed to fectch users' data for admin page!");
            }
            const res = await response.json();
            setUsersData(res.data)
        }catch(error){
            consolel.log("Error fetching data: ", error);
            setError(error);
        }finally{
            setLoading(false);
        }
    }


      useEffect(() =>{
        const fetchProfile = async () => {
          setLoading(true)
          setError(null)
          try {
            const response = await getUserProfile();
            setApiTokens(response.tokenCount);
            setDisplayName(response.displayName);
      
          } catch (error) {
            console.log("Error fetching profile", error);
            setError(error)
          } finally {
            setLoading(false)
          }
        }
        fetchProfile();
        fetchUsersData();
      }, [])


    

    return (
        <>
        <div className="container">
            <h1>You're an Admin Duck, {displayName}!</h1>

            <h2>Users</h2>
            <div className='content-box'>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Tokens Available</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="3">Loading...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan="3">Error loading data</td>
                        </tr>
                    ) : (
                        apiTokens && apiTokens.length > 0 ? (
                            apiTokens.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.tokens}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No data available</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
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
        </>
    )
}