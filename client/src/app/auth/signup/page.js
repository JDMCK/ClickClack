import "../../styles/signup-page.css";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form">
        <input type="text" placeholder="Display Name" className="signup-input" />
        <input type="email" placeholder="Email" className="signup-input" />
        <input type="password" placeholder="Password" className="signup-input" />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <p className="signup-login-text">
        Already have an account? <Link href="/auth/login" className="signup-login-link">Login here</Link>
      </p>
    </div>
  );
}
  