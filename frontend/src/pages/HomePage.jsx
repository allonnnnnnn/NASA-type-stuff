import React, { useState, useEffect } from "react";

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
  const [dailyChallenge, setDailyChallenge] = useState("");

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
  }, []);

  return (
    <div
      style={{
        width: "100%", // ✅ FIX: avoid 100vw scroll gap
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "radial-gradient(circle at top, #0b0f2f, #000)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // ✅ prevents subtle scrollbars
      }}
    >
      {/* NAVIGATION BAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: "rgba(10, 15, 47, 0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(6px)",
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            color: "#00ffff",
            fontWeight: "bold",
            fontSize: "1.5rem",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          🚀 Exoplanet Explorer
        </h1>

        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "1.5rem",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <a href="/explore" style={linkStyle}>
              Explore
            </a>
          </li>
          <li>
            <a href="/comparison" style={linkStyle}>
              Comparison
            </a>
          </li>
          <li>
            <a href="/profile" style={linkStyle}>
              Profile
            </a>
          </li>
          <li>
            <a href="/passport" style={linkStyle}>
              My Passport
            </a>
          </li>
        </ul>
      </nav>

      {/* MAIN CONTENT */}
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
          Welcome, Space Explorer!
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

        {/* CHALLENGE OF THE DAY */}
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

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "0.75rem",
          fontSize: "0.9rem",
          color: "#aaaaaa",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          flexShrink: 0,
        }}
      >
        © 2025 NASA Exoplanet Explorer | Data from NASA Exoplanet Archive
      </footer>
    </div>
  );
};

// Shared link style
const linkStyle = {
  color: "#00ffff",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "1rem",
};

export default HomePage;
