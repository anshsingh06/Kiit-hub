import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar'; 
import LandingPage from './component/LandingPage';
import EventPage from './pages/EventPage'; // <- You need to create this if not done yet

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;



