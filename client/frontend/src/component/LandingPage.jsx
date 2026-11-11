import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { CircleX } from 'lucide-react';
import SignUp from './signup';

//import img1 from '../assets/img1.jpg'; 
//import img2 from '../assets/img2.jpg'; 
import img3 from '../assets/img3.jpg'; 
import img4 from '../assets/img4.jpg'; 
import kiitfront from '../assets/kiitfront.jpg';
import asksenior from '../assets/asksenior.jpg';
import event from '../assets/event.jpg';
import interactive from '../assets/interactive.jpg';


function LandingPage() {
   const [showSignUp, setShowSignUp] = useState(false);
   const modalRef = useRef();
   const closeModal = (e) => {
  if (modalRef.current=== e.target) {
    setShowSignUp(false);
    }
}

  return (
    <section className="min-h-screen bg-[#f5f8f2] text-[#173b2b]">
    
  {/* Main div */}
  <div className="px-6 sm:px-20 max-w-7xl mx-auto pt-8">

       {/* Connect */}
       <div className="w-full max-w-6xl mt-20 grid sm:grid-cols-2 gap-12"> </div>
       
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#123d2a] mb-4 tracking-tight">
        Connect. Engage.
      </h1>
      <p className="text-xl sm:text-2xl text-[#587463] font-semibold mb-10">
        Secure student portal for campus life.
      </p>
      
      </div>

    
      <div>
        
      <img src={kiitfront} className="h-90 w-200 rounded-3xl flex items-center justify-center ml-50 shadow-xl shadow-[#1c5535]/15 ring-4 ring-white" />
      </div>
     


      {/* Section 2 - Senior*/}
      <div className="w-full max-w-6xl mt-20 grid sm:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-[#174b31] mb-2 ml-30">Ask seniors</h2>
          <p className="text-[#61786a] text-base ml-30">
            Open academic and placement forums <br /> where students receive <br />expert insights from seniors.
          </p>
        </div>


        <div> 
      <img src={asksenior} className="h-60 w-105 rounded-2xl flex items-center justify-center mr-25 shadow-lg shadow-[#1c5535]/10 ring-4 ring-white" />
      </div>

         {/* Section 3 - Event*/}

        <div> 
      <img src={event} className="h-60 w-105 rounded-2xl flex items-center justify-center mr-25 shadow-lg shadow-[#1c5535]/10 ring-4 ring-white" />
      </div>


  <div className="flex flex-col justify-center">
    <h2 className="text-xl font-bold text-[#174b31] mb-1">Event updates</h2>
    <p className="text-[#61786a] text-sm">
      Get real-time official event<br />  notifications and details <br /> straight from the university.
    </p>
  </div>

  {/* Interactive Platform */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl font-bold text-[#174b31] mb-1 ml-30">Interactive platform</h2>
    <p className="text-[#61786a] text-sm ml-30">
      Participate in secure<br/> moderated discussions and <br/>campus community activities.
    </p>
  </div>
  <div> 
      <img src={interactive} className="h-60 w-105 rounded-2xl flex items-center justify-center mr-25 shadow-lg shadow-[#1c5535]/10 ring-4 ring-white" />
      </div>

  </div>
  </div>


  {/* Join In – Signup Form */}
<div className="mx-6 mt-12 mb-8 rounded-3xl bg-gradient-to-br from-[#123d2a] to-[#17613b] px-6 py-16 text-center text-white shadow-xl shadow-[#1c5535]/15 sm:mx-12">
  <h2 className="text-3xl sm:text-4xl font-bold mb-2">Join in.</h2>
  <p className="text-[#d5ead9] text-lg mb-6">Get started today.</p>

  <div className="max-w-md mx-auto">
    <input
      type="email"
      placeholder="rollno@kiit.ac.in"
      className="w-full p-3 rounded-xl bg-white text-[#173b2b] outline-none mb-4 ring-1 ring-white/40 placeholder:text-[#829589] focus:ring-2 focus:ring-[#a7e16e]"
    />
    <button
      onClick={() => setShowSignUp(true)}
      className="w-full bg-[#a7e16e] text-[#123d2a] font-bold py-3 rounded-xl hover:bg-[#b9eb88] transition cursor-pointer"
    >
      Sign Up
    </button>

    {showSignUp && (
      <div ref={modalRef} onClick={closeModal}className="fixed inset-0 bg-[#123d2a]/45 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#f8fbf6] text-[#173b2b] rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
          <button
            className="place-self-end cursor-pointer flex justify-between  "
            onClick={() => setShowSignUp(false)}
          > <CircleX size={30}/>
          
          </button>
          <SignUp />
    </div>
  </div>
)}

  </div>
</div>

{/* Footer */}
<footer className="mt-16 border-t border-[#dce8dd] pt-10 text-left">
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-sm text-[#61786a]">

    {/* Logo */}
    <div>
      <div className="font-bold text-lg text-[#174b31] mb-2">🟥◯▲</div>
    </div>


  {/* Portal */}
  <div>
    <h4 className="font-semibold text-[#174b31] mb-2">Portal</h4>
    <ul className="space-y-1">
      <li><Link to="/about" className="hover:underline">About</Link></li>
      <li><Link to="/howitworks" className="hover:underline">How it Works</Link></li>
      <li><Link to="/support" className="hover:underline">Support</Link></li>
    </ul>
  </div>

  {/* Community */}
  <div>
    <h4 className="font-semibold text-[#174b31] mb-2">Community</h4>
    <ul className="space-y-1">
      <li><Link to="/discussion" className="hover:underline">Discussion</Link></li>
      <li><Link to="/events" className="hover:underline">Events</Link></li>
      <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
    </ul>
  </div>

  {/* Campus */}
  <div>
    <h4 className="font-semibold text-[#174b31] mb-2">Campus</h4>
    <ul className="space-y-1">
      <li><Link to="/faq" className="hover:underline">Academic FAQs</Link></li>
      <li><Link to="/placements" className="hover:underline">Placements</Link></li>
      <li><Link to="/clubs" className="hover:underline">Clubs</Link></li>
    </ul>
  </div>
</div>
  <div className="text-xs text-center text-[#8ba092] mt-8">
    © 2025 KIIT Connect. All rights reserved.
  </div>
</footer>

  </section>

    

  );
}


export default LandingPage;