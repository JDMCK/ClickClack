import Link from "next/link";
import "./styles/landing-page.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Landing Page</h1>
      <p>Welcome! Choose an option below:</p>
      <div>
        <Link href="/auth/login">
          <button>Go to Login</button>
        </Link>
        <Link href="/auth/signup">
          <button>Go to Sign Up</button>
        </Link>
      </div>
    </div>
  );
}
