import Link from 'next/link';


export default function Navbar () {
    return (
        <nav className='navbar'>
            <div className='nav-logo'>
                {/* TODO: Add the logo here AND fix the profile Link*/}
                <Link href="/home">ClickClack</Link> 
            </div>
            <div className='nav-profile-btn'>
                <Link href="/profile/user">profile</Link> 
            </div>
        </nav>
    );
};