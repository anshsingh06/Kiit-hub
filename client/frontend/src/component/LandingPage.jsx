import React from 'react';
import { useState } from 'react';
import SignUp from './signup';
import img1 from '../assets/img1.jpg'; 
import img2 from '../assets/img2.jpg'; 
import img3 from '../assets/img3.jpg'; 
import img4 from '../assets/img4.jpg'; 

function LandingPage() {
   const [showSignUp, setShowSignUp] = useState(false);
    

  return (
    <section >
    
  {/* Main div */}
  <div className="px-6 sm:px-20 max-w-7xl mx-auto">

       {/* Connect */}
       <div className="w-full max-w-6xl mt-20 grid sm:grid-cols-2 gap-12"> </div>
       
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-black mb-4">
        Connect. Engage.
      </h1>
      <p className="text-xl sm:text-2xl text-gray-500 font-semibold mb-10">
        Secure student portal for campus life.
      </p>
      
      </div>

    
      <div>
        
      <img src={img1} className="h-90 w-200 rounded-xl flex items-center justify-center ml-50" />
      </div>
     


      {/* Section 2 - Senior*/}
      <div className="w-full max-w-6xl mt-20 grid sm:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2 ml-30">Ask seniors</h2>
          <p className="text-gray-500 text-base ml-30">
            Open academic and placement forums <br /> where students receive <br />expert insights from seniors.
          </p>
        </div>


        <div> 
      <img src={img2} className="h-60 w-105 rounded-xl flex items-center justify-center mr-25" />
      </div>

         {/* Section 3 - Event*/}

        <div> 
      <img src={img3} className="h-60 w-105 rounded-xl flex items-center justify-center mr-25" />
      </div>


  <div className="flex flex-col justify-center">
    <h2 className="text-xl font-bold text-black mb-1">Event updates</h2>
    <p className="text-gray-500 text-sm">
      Get real-time official event<br />  notifications and details <br /> straight from the university.
    </p>
  </div>

  {/* Interactive Platform */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl font-bold text-black mb-1 ml-30">Interactive platform</h2>
    <p className="text-gray-500 text-sm ml-30">
      Participate in secure<br/> moderated discussions and <br/>campus community activities.
    </p>
  </div>
  <div> 
      <img src={img4} className="h-60 w-105 rounded-xl flex items-center justify-center mr-25" />
      </div>

  </div>
  </div>


  {/* Join In – Signup Form */}
<div className="py-20 text-center">
  <h2 className="text-3xl sm:text-4xl font-bold mb-2 mt-30">Join in.</h2>
  <p className="text-gray-500 text-lg mb-6">Get started today.</p>

  <div className="max-w-md mx-auto">
    <input
      type="email"
      placeholder="rollno@kiit.ac.in"
      className="w-full p-3 rounded bg-gray-100 outline-none mb-4"
    />
    <button
      onClick={() => setShowSignUp(true)}
      className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition cursor-pointer"
    >
      Sign Up
    </button>

    {showSignUp && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            onClick={() => setShowSignUp(false)}
          >
            &times;
          </button>
          <SignUp />
    </div>
  </div>
)}

  </div>
</div>

{/* Footer */}
<footer className="mt-16 border-t pt-10 text-left">
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-sm text-gray-600">

    {/* Logo */}
    <div>
      <div className="font-bold text-lg text-black mb-2">🟥◯▲</div>
    </div>

    {/* Portal */}
    <div>
      <h4 className="font-semibold text-black mb-2">Portal</h4>
      <ul className="space-y-1">
        <li>About</li>
        <li>How it Works</li>
        <li>Support</li>
      </ul>
    </div>

    {/* Community */}
    <div>
      <h4 className="font-semibold text-black mb-2">Community</h4>
      <ul className="space-y-1">
        <li>Discussions</li>
        <li>Events</li>
        <li>Contact Us</li>
      </ul>
    </div>

    {/* Campus */}
    <div>
      <h4 className="font-semibold text-black mb-2">Campus</h4>
      <ul className="space-y-1">
        <li>Academic FAQs</li>
        <li>Placements</li>
        <li>Clubs</li>
      </ul>
    </div>
  </div>
  <div className="text-xs text-center text-gray-400 mt-8">
    © 2025 KIIT Connect. All rights reserved.
  </div>
</footer>

  </section>

    

  );
}


export default LandingPage;