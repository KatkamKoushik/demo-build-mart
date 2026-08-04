"use client";

import React from "react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-alabaster flex flex-col items-center justify-center pt-24 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center">
        <h1 className="text-2xl font-medium text-charcoal mb-4">User Profile</h1>
        <p className="text-muted mb-8">This is a mock profile page.</p>
        <button 
          className="w-full py-4 bg-charcoal text-white rounded-xl font-medium hover:bg-charcoal-light transition-colors"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
