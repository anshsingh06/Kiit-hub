import React from 'react';

function LandingPage() {
  return (
    <section className="bg-white min-h-screen px-6 py-16 flex flex-col items-center text-center">
      {/* Headline */}
      <h1 className="text-5xl sm:text-3xl font-black text-black mb-3">
        Connect. Engage.
      </h1>
      <p className="text-xl sm:text-2xl text-gray-500 font-semibold mb-10">
        Secure student portal for campus life.
      </p>

      {/* Hero Placeholder (image or graphic area) */}
      <div className="w-full max-w-4xl h-64 sm:h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        {/* Replace with your hero image */}
        <span className="text-4xl font-bold text-gray-300">LOGO</span>
      </div>

      {/* Section 2 - Example Feature */}
      <div className="w-full max-w-6xl mt-20 grid sm:grid-cols-2 gap-12">
        {/* Left text */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Ask seniors</h2>
          <p className="text-gray-500 text-base">
            Open academic and placement forums where students receive expert insights from seniors.
          </p>
        </div>

        {/* Right graphic placeholder */}
        <div className="h-60 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded"></div>
        </div>

         <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
    <div className="w-10 h-10 bg-white"></div>
  </div>
  <div className="flex flex-col justify-center">
    <h2 className="text-xl font-bold text-black mb-1">Event updates</h2>
    <p className="text-gray-500 text-sm">
      Get real-time official event notifications and details straight from the university.
    </p>
  </div>

  {/* Interactive Platform */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl font-bold text-black mb-1">Interactive platform</h2>
    <p className="text-gray-500 text-sm">
      Participate in secure, moderated discussions and campus community activities.
    </p>
  </div>
  <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
    <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-white"></div>
  </div>
      </div>
    </section>
  );
}

export default LandingPage;