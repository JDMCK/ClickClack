"use client"
import { useRouter } from 'next/navigation'
import '../styles/globals.css'
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
            console.log(authRes.data)
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
            <h2>Ready for some ducktyping?</h2>
            <div onClick={() => { router.push('/typing/prompt'); }}>
                <h4>Start typing</h4>
                <p>Generate new text or use a previous one.</p>
            </div>
            <div onClick={() => {
                /*This doesn't work with http only cookie
                const isAdmin = document.cookie.split('; ').find(row => 
                    row.startsWith('is_admin')).split('=')[1] === 'true';
                if (!isAdmin) {
                    alert('You do not have permission to access this page.');
                    return;
                }
                */

                if (isAdmin) {
                    router.push('/profile/admin')
                } else if (isLoggedin) {
                    router.push('/profile/user/');
                } else {
                    router.push('/403')
                }
            }}>
                <h4>Profile</h4>
            </div>
        </div>
    );
}