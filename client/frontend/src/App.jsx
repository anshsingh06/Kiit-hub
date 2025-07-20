import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar'; 
import LandingPage from './component/LandingPage';
import EventPage from './pages/EventPage'; 
import DiscussionPage from "./pages/DiscussionPage";
import About from './footer/About';
import HowItWorks from './footer/HowItWorks';
import Support from './footer/support'; 
import Contact from './footer/contact';
import Faq from './footer/faq';
import Placement from './footer/placement';
import Clubs from './footer/clubs';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/discussion" element={<DiscussionPage />} />

        {/* Footer Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/placements" element={<Placement/>} />
        <Route path="/clubs" element={<Clubs/>} />
        
      </Routes>
    </Router>
  );
}

export default App;



