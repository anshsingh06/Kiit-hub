import React from 'react';
import logo from '../assets/logo.png';


function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="KIIT Connect" className="w-8 h-8" />
      </div>
      <div className="space-x-4">
        <button className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition">Home</button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition">Events</button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition">Discussion</button>
      </div>
        
      <div>
        <button className="bg-black text-white px-4 py-2 rounded-full">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
