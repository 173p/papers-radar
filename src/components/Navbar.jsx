import React, { useState } from 'react';

const user = {name: "D. B. Cooper", imageURL: "https://i.pravatar.cc/300"};

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="m-auto py-4 px-6 md:px-8 border-b border-gray-200 mb-8">
      <nav className="flex items-center justify-between max-w-4xl m-auto">
        <a href="/" className="flex items-center gap-x-3">
          <img src="/logo.svg" alt="Paper Radar Logo" className="h-8 w-8" />
          <span className="font-bold text-xl hidden sm:inline">Paper Radar</span>
        </a>

        <div className="flex items-center gap-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-x-3 hover:bg-gray-100 p-2 rounded-lg transition">
                <span className="font-semibold text-gray-700">{user.name}</span>
                <img
                  src={user.imageURL}
                  className="h-10 w-10 rounded-full"/>
              </button>
                
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-red-500">
                    Sign out</a>
                </div>
              )}
            </div>
          ) : (
            <>
              <a 
                href="/" 
                className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition"
              >
                Sign in
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}