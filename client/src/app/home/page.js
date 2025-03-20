"use client"
import { useRouter } from 'next/navigation'


export default function homePage() {

    const router = useRouter();
    return (
        <div className="container">
            <h2>Welcome back.</h2>
            <div onClick={ () => {router.push('/typing/prompt');}}>
                <h4>Start typing</h4>
                <p>Generate new text or use a previous one.</p>
            </div>
            <div onClick={ () => {router.push('/profile/user');}}>
                <h4>Profile</h4>
            </div>
        </div>
    );
}