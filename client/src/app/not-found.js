import React from 'react';
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Quack! 404</h1>
      <p>Page not found or doesn't exist...</p>
      <Link className='' href="/">Go back</Link>
    </div>
  );
};