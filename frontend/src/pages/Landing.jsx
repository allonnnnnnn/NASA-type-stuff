import React, { useState } from "react";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`Logging in with ${email}`);
    // TODO: connect to backend authentication later
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #0b0f2f, #000)",
        color: "white",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Main Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "3rem",
          alignItems: "center",
          background: "rgba(255,255,255,0.04)",
          padding: "3rem 4rem",
          borderRadius: "18px",
          border: "1px solid rgba(0,255,255,0.2)",
          boxShadow: "0 0 30px rgba(0,255,255,0.2)",
          maxWidth: "1000px",
          width: "90%",
        }}
      >
        {/* LEFT SIDE: Info */}
        <div>
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              color: "#00ffff",
              textShadow: "0 0 12px rgba(0,255,255,0.5)",
            }}
          >
            🚀 Exoplanet Explorer
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.8rem",
              marginBottom: "2rem",
              color: "#d0faff",
              maxWidth: "500px",
            }}
          >
            Discover distant worlds beyond our solar system. <br />
            Earn badges in your <strong>Passport</strong> as you visit new
            exoplanets, compare their unique features, and embark on daily
            cosmic challenges.
          </p>

          <ul
            style={{
              fontSize: "1rem",
              color: "#c9faff",
              listStyle: "none",
              padding: 0,
              marginBottom: "2rem",
            }}
          >
            <li>🪐 Explore real NASA exoplanet data</li>
            <li>📊 Compare planets by mass, radius, orbit</li>
            <li>📒 Collect Passport stamps for planets you view</li>
            <li>⭐ Take on daily challenges to level up your journey</li>
          </ul>
        </div>

        {/* RIGHT SIDE: Login Card */}
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            padding: "2.5rem 3rem",
            borderRadius: "14px",
            border: "1px solid rgba(0,255,255,0.3)",
            boxShadow: "0 0 20px rgba(0,255,255,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",      // ✅ Centers everything horizontally
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "2rem",
              textAlign: "center",
              color: "#00ffff",
            }}
          >
            Log In
          </h2>

          {/* Form Container */}
          <div style={{ width: "100%", maxWidth: "260px" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <label style={{ ...labelStyle, marginTop: "1.2rem" }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button style={loginButton} onClick={handleLogin}>
              Log In
            </button>
          </div>

          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.9rem",
              textAlign: "center",
              color: "#bbb",
            }}
          >
            Don’t have an account?{" "}
            <span style={{ color: "#00ffff", cursor: "pointer" }}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles
const labelStyle = {
  display: "block",
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "0.4rem",
  color: "#c9faff",
};

const inputStyle = {
  width: "100%",
  padding: "0.7rem 1rem",
  borderRadius: "8px",
  border: "1px solid rgba(0,255,255,0.4)",
  background: "rgba(0,0,0,0.5)",
  color: "white",
  fontSize: "1rem",
  marginBottom: "0.8rem",
};

const loginButton = {
  width: "100%",
  marginTop: "1.2rem",
  padding: "0.9rem 1.5rem",
  fontSize: "1rem",
  fontWeight: "bold",
  backgroundColor: "#00ffff",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Landing;
