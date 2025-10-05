import React, { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar.jsx";  // Import Navbar

const challenges = [
  "Discover 3 new exoplanets today!",
  "Compare 2 planets by radius and mass.",
  "Visit your Passport page to collect a new stamp.",
  "Update your profile constellation badge.",
  "Explore planets within 50 light-years.",
  "Check out the hottest exoplanet discovered!",
  "Add your favorite planet to your comparison list.",
];

const HomePage = () => {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [dailyChallenge, setDailyChallenge] = useState("");
  const navigate = useNavigate();

  const displayName = (passedUser) => {
    fetch(`http://localhost:5000/api/account/${passedUser.uid}`,
      {
        method: "GET"
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Convert the response to JSON
    })
      .then((data) => {
        setUsername(data.username);
      })
  }

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("dailyChallengeDate");
    const savedChallenge = localStorage.getItem("dailyChallenge");

    if (savedDate === today && savedChallenge) {
      setDailyChallenge(savedChallenge);
    } else {
      const random =
        challenges[Math.floor(Math.random() * challenges.length)];
      setDailyChallenge(random);
      localStorage.setItem("dailyChallengeDate", today);
      localStorage.setItem("dailyChallenge", random);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        displayName(currentUser);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "radial-gradient(circle at top, #0b0f2f, #000)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem 1rem",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textShadow: "0 0 15px rgba(0,255,255,0.6)",
          }}
        >
          Welcome, {username}!
        </h2>
        <p
          style={{
            maxWidth: "600px",
            fontSize: "1.2rem",
            marginBottom: "2rem",
            color: "#d0faff",
          }}
        >
          Start your journey among the stars — explore distant worlds, compare
          their features, and collect stamps in your cosmic passport.
        </p>

        {/* Challenge of the Day */}
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "1.5rem 2rem",
            borderRadius: "12px",
            border: "1px solid rgba(0,255,255,0.3)",
            boxShadow: "0 0 20px rgba(0,255,255,0.2)",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          <h3
            style={{
              color: "#00ffff",
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            ⭐ Challenge of the Day
          </h3>
          <p style={{ fontSize: "1.1rem", color: "#e0faff" }}>
            {dailyChallenge}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "0.75rem",
          fontSize: "0.9rem",
          color: "#aaaaaa",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        © 2025 NASA Exoplanet Explorer | Data from NASA Exoplanet Archive
      </footer>
    </div>
  );
};

export default HomePage;
