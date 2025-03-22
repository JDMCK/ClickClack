import React from 'react';
import { Link } from 'react-router-dom';
import './404.css'; // Assuming you have a CSS file for styling


export default function NotFound() {
    return (
        <div className="forbidden">
            <h1>Quack! 403</h1>
            <p>Nuhuh, you quakin', Forbidden!</p>
            <Link className='' to="/">Go back</Link>
        </div>
    );
};