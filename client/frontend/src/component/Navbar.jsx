import React from "react";
import { useState, useRef } from "react";
import SignUp from "./signup";
import { CircleX } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
 const modalRef = useRef();
 const [showSignUp, setShowSignUp] = useState(false);
 const closeModal = (e) => {
  if (modalRef.current=== e.target) {
    setShowSignUp(false);
    }
}

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="KIIT Connect" className="w-8 h-8" />
      </div>
      <div className="space-x-4">
        <Link
          to="/"
          className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition inline-block"
        >
          Home
        </Link>
        <Link
          to="/events"
          className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition inline-block"
        >
          Events
        </Link>
        <Link
          to="/discussion"
          className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition inline-block"
        >
          Discussion
        </Link>
        
      </div>

      <div> 
        <button
          onClick={() => setShowSignUp(true)}
          className="bg-black text-white px-4 py-2 rounded-full"
        >
          Sign Up
        </button>

        {showSignUp && (
          
          <div ref={modalRef} onClick={closeModal}className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                className="place-self-end cursor-pointer flex justify-between  "
                onClick={() => setShowSignUp(false)}
              >
                {" "}
                <CircleX size={30} />
              </button>
              
              <SignUp />
            </div>
          </div>
          
        )}
      </div>
    </nav>
  );
}

export default Navbar;
