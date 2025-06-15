import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-black">🟥◯▲</div>
        <nav className="space-x-4">
          <button className="bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200">Home</button>
          <button className="bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200">Events</button>
          <button className="bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200">Discussions</button>
        </nav>
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Sign Up</button>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">Connect. Engage.</h1>
        <p className="text-gray-400 mt-2 text-xl">Secure student portal for campus life.</p>

        <div className="mt-10 flex justify-center">
          <div className="w-[80%] h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-4xl font-black">
            🟥◯▲
          </div>
        </div>
      </section>

      {/* Ask Seniors Section */}
      <section className="mt-16 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold">Ask seniors</h2>
          <p className="text-gray-500 mt-2">
            Open academic and placement forums where students receive expert insights from seniors.
          </p>
        </div>
        <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
          ⬜
        </div>
      </section>
    </div>
  );
}

