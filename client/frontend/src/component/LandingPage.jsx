import React from 'react';

function LandingPage() {
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

    
        <div className="h-90 w-200 bg-gray-100 rounded-xl flex items-center justify-center ml-50">
          <div className="w-12 h-12 bg-white"></div>
        </div>
     


      {/* Section 2 - Senior*/}
      <div className="w-full max-w-6xl mt-20 grid sm:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Ask seniors</h2>
          <p className="text-gray-500 text-base">
            Open academic and placement forums <br /> where students receive <br />expert insights from seniors.
          </p>
        </div>

       
        <div className="h-60 bg-gray-100 rounded-xl flex items-center justify-center mr-25">
          <div className="w-12 h-12 bg-white rounded"></div>
        </div>

         {/* Section 3 - Event*/}

       <div className="h-60 bg-gray-100 rounded-xl flex items-center justify-center mr-25">
          <div className="w-12 h-12 bg-white rounded"></div>
        </div>

  <div className="flex flex-col justify-center">
    <h2 className="text-xl font-bold text-black mb-1">Event updates</h2>
    <p className="text-gray-500 text-sm">
      Get real-time official event<br />  notifications and details <br /> straight from the university.
    </p>
  </div>

  {/* Interactive Platform */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl font-bold text-black mb-1">Interactive platform</h2>
    <p className="text-gray-500 text-sm">
      Participate in secure, moderated discussions and campus community activities.
    </p>
  </div>
  <div className="h-60 bg-gray-100 rounded-xl flex items-center justify-center mr-25">
          <div className="w-12 h-12 bg-white rounded"></div>
        </div>
  
  </div>
  </div>
     </section>
  );
}

export default LandingPage;