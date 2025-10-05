import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import HomePage from "./pages/HomePage.jsx";
import Profile from "./pages/Profile.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import ExoplanetInfo from "./pages/ExoplanetInfo.jsx";
import ComparisonPage from "./pages/ComparisonPage";
import Navbar from "./components/Navbar.jsx";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Hide Navbar only on the Landing page */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />        {/* Landing first */}
        <Route path="/home" element={<HomePage />} />   {/* Home after login */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/exoplanet/:id" element={<ExoplanetInfo />} />
        <Route path="/comparison" element={<ComparisonPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
