import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

const MyPassport = () => {
  const [visitedPlanets, setVisitedPlanets] = useState([]);

  // Load visited planets from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("visitedPlanets")) || [];
    setVisitedPlanets(stored);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at top, #0b0f2f, #000)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar />

      {/* PAGE HEADER */}
      <header
        style={{
          textAlign: "center",
          padding: "2rem 1rem 1rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            color: "#00ffff",
            textShadow: "0 0 14px rgba(0,255,255,0.5)",
            marginBottom: "0.5rem",
          }}
        >
          🌌 My Exoplanet Passport
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#c9faff" }}>
          Track every world you’ve visited across the cosmos.
        </p>
      </header>

      {/* PASSPORT CONTAINER */}
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(0,255,255,0.3)",
            borderRadius: "20px",
            padding: "2rem",
            width: "90%",
            maxWidth: "800px",
            minHeight: "60vh",
            boxShadow: "0 0 25px rgba(0,255,255,0.15)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {visitedPlanets.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                fontSize: "1.2rem",
                color: "#b0d9e9",
              }}
            >
              You haven’t visited any planets yet. Explore and add some stamps!
            </div>
          ) : (
            visitedPlanets.map((planet, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,255,255,0.25)",
                  borderRadius: "14px",
                  padding: "1rem",
                  textAlign: "center",
                  boxShadow: "0 0 15px rgba(0,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    background: "radial-gradient(circle at 30% 30%, #1e90ff, #000)",
                    borderRadius: "50%",
                    marginBottom: "0.8rem",
                    border: "2px solid rgba(0,255,255,0.4)",
                  }}
                ></div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "0.3rem",
                    color: "#00ffff",
                  }}
                >
                  {planet.name}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#c9faff" }}>
                  {planet.star_name
                    ? `Orbits ${planet.star_name}`
                    : "Mysterious world"}
                </p>
              </div>
            ))
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "0.8rem",
          fontSize: "0.9rem",
          color: "#aaaaaa",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        © 2025 Exoplanet Explorer | Data from NASA Exoplanet Archive
      </footer>
    </div>
  );
};

export default MyPassport;
