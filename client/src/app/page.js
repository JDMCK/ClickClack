import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
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
