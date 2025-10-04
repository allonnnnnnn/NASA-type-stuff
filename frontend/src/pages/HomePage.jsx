import React from "react";

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #000014, #000)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#00ffff", marginBottom: "1rem" }}>
        NASA Exoplanet Explorer
      </h1>

      <p style={{ maxWidth: "600px", fontSize: "1.2rem", marginBottom: "2rem" }}>
        Discover distant worlds beyond our solar system and collect cosmic
        badges as you travel through the stars.
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          style={{
            padding: "0.8rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            background: "#00ffff",
            color: "#000",
            cursor: "pointer",
          }}
        >
          Explore Exoplanets
        </button>

        <button
          style={{
            padding: "0.8rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "2px solid #00ffff",
            background: "transparent",
            color: "#00ffff",
            cursor: "pointer",
          }}
        >
          View Passport
        </button>
      </div>
    </div>
  );
};

export default HomePage;
