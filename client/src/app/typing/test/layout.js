import Link from 'next/link';
import '../../styles/test-page.css'

export default function TestLayout({ children }) {
  return (
    <>
      <nav>
        <Link href={"/typing/prompt"}>Go back</Link>
      </nav>
      {children}
    </>
  );
}
