import React from 'react';
import { Link } from 'react-router-dom';
import './404.css'; // Assuming you have a CSS file for styling


export default function NotFound() {
    return (
        <div className="not-found">
            <h1>Quack! 404</h1>
            <p>Page not found or doesn't exist...</p>
            <Link className='' to="/">Go back</Link>
        </div>
    );
};