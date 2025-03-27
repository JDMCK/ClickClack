"use client"
import React from 'react';
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className='container'>
        <h1>Quack! 404</h1>
        <img className='not-found-img' src="/duck2.png" alt="404 image" />
        <p style={{fontSize: '1.2rem'}}>Page not found or doesn't exist...</p>
        <button className='go-back' onClick={() => {window.location = '/home'}}>Go back</button>
      </div>
    </div>
  );
};