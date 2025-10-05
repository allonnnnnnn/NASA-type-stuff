import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { auth } from "../firebase.js"; // your firebase setup
import { onAuthStateChanged } from "firebase/auth";

const MyPassport = () => {
  const [visitedPlanets, setVisitedPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.warn("No user logged in.");
        setVisitedPlanets([]);
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();

        // Adjust the port if your backend runs on 5000 instead of 3000
        const response = await fetch(`http://localhost:3000/api/account/${user.uid}`, {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        const visited = data.visitedPlanets || [];
        setVisitedPlanets(visited);
      } catch (err) {
        console.error("Error loading visited planets:", err);
      } finally {
        setLoading(false);
      }
    });

    // Clean up subscription when component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "#0b0f2f",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>Loading your passport...</h2>
      </div>
    );
  }

  // Split visited planets into groups of 4 per page
  const chunkedPlanets = [];
  for (let i = 0; i < visitedPlanets.length; i += 4) {
    chunkedPlanets.push(visitedPlanets.slice(i, i + 4));
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0b0f2f, #000)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          textAlign: "center",
          padding: "1.5rem",
          color: "#c9faff",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#00ffff",
            textShadow: "0 0 12px rgba(0,255,255,0.5)",
            marginBottom: "0.3rem",
          }}
        >
          My Exoplanet Passport
        </h1>
        <p>Flip through your cosmic travel stamps</p>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <HTMLFlipBook
          width={450}
          height={600}
          showCover={true}
          style={{
            boxShadow: "0 0 25px rgba(0,255,255,0.2)",
            borderRadius: "20px",
            overflow: "hidden",
            background: "#ffffff",
          }}
        >
          {/* Cover Page */}
          <div style={coverPageStyle}>
            <h2 style={coverTitle}>🌌 Exoplanet Explorer Passport</h2>
            <p style={coverSubtitle}>
              A record of the worlds you’ve discovered beyond our solar system.
            </p>
          </div>

          {/* Planet Stamp Pages */}
          {chunkedPlanets.length === 0 ? (
            <div style={pageStyle}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#444",
                  textAlign: "center",
                }}
              >
                No stamps yet. Visit planets to fill your passport!
              </p>
            </div>
          ) : (
            chunkedPlanets.map((group, idx) => (
              <div key={idx} style={pageStyle}>
                <h3 style={pageHeader}>Page {idx + 1}</h3>
                <div style={stampGrid}>
                  {group.map((planetName, index) => (
                    <div key={index} style={stampCard}>
                      <div style={stampCircle}></div>
                      <h4 style={stampName}>{planetName}</h4>
                      <p style={stampInfo}>Visited World</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Back Cover */}
          <div style={coverPageStyle}>
            <h3 style={coverTitle}>🚀 Keep Exploring!</h3>
            <p style={coverSubtitle}>
              Return to the Explore page to discover more exoplanets and
              collect new stamps.
            </p>
          </div>
        </HTMLFlipBook>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          fontSize: "0.9rem",
          color: "#c9faff",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          background: "transparent",
        }}
      >
        © 2025 Exoplanet Explorer | Data from NASA Exoplanet Archive
      </footer>
    </div>
  );
};

/* ---------- Shared Styles ---------- */
const pageStyle = {
  background: "#ffffff",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "18px",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  color: "#222",
  boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
};

const coverPageStyle = {
  ...pageStyle,
  background: "#f9f9f9",
};

const coverTitle = {
  color: "#222",
  fontSize: "1.8rem",
  textAlign: "center",
  marginBottom: "0.8rem",
};

const coverSubtitle = {
  textAlign: "center",
  fontSize: "1rem",
  color: "#555",
  maxWidth: "80%",
};

const pageHeader = {
  color: "#222",
  fontSize: "1.4rem",
  marginBottom: "1rem",
  fontWeight: "bold",
};

const stampGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
  width: "100%",
};

const stampCard = {
  background: "#fdfdfd",
  border: "1px dashed rgba(0,0,0,0.2)",
  borderRadius: "14px",
  padding: "0.8rem",
  textAlign: "center",
  boxShadow: "0 0 6px rgba(0,0,0,0.1)",
};

const stampCircle = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "radial-gradient(circle at 30% 30%, #1e90ff, #000)",
  border: "2px solid rgba(0,0,0,0.2)",
  margin: "0 auto 0.5rem auto",
};

const stampName = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#222",
  marginBottom: "0.3rem",
};

const stampInfo = {
  fontSize: "0.85rem",
  color: "#444",
};

export default MyPassport;