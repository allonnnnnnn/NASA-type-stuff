import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import HomePage from "./pages/HomePage.jsx";
import Profile from "./pages/Profile.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import ExoplanetInfo from "./pages/ExoPlanetInfo.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />        {/* Landing first */}
        <Route path="/home" element={<HomePage />} />   {/* Home after login */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/exoplanet/:id" element={<ExoplanetInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
