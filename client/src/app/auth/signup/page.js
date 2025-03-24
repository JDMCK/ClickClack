"use client";

import "../../../styles/signup-page.css";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [display_name, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const userData = {
      display_name,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up.");
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      window.location.href = "/home"

    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Display Name" className="signup-input" value={display_name} onChange={(e) => setDisplayName(e.target.value)} />
        <input type="email" placeholder="Email" className="signup-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="signup-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="signup-button" disabled={loading}>{loading ? "Signing up..." : "Sign Up"} </button>
      </form>

      <p className="signup-login-text">
        Already have an account? <Link href="/auth/login" className="signup-login-link">Login here</Link>
      </p>
    </div>
  );
}
  