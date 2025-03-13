import "../../styles/login-page.css";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <input type="email" placeholder="Email" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="login-signup-text">
        Don&apos;t have an account? <Link href="/auth/signup" className="login-signup-link">Sign up here</Link>
      </p>
    </div>
  );
}
