import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar'; 
import LandingPage from './component/LandingPage';
import EventPage from './pages/EventPage'; 
import DiscussionPage from "./pages/DiscussionPage";
import About from './footer/About';
// import HowItWorks from './footer/HowItWorks';
// import Support from './footer/Support'; 



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/discussion" element={<DiscussionPage />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/support" element={<Support />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;



