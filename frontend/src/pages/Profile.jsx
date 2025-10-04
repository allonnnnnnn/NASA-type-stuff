import React, { useState } from "react";

const Profile = () => {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("********");

  const handleSave = () => {
    alert("✅ Profile updated! (Connect this to backend later)");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(180deg, #0a0f2c 0%, #000 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 3rem",
          background: "rgba(10,15,47,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", color: "#00ffff", fontWeight: "bold" }}>
          🚀 Exoplanet Explorer
        </h1>

        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "2rem",
            margin: 0,
            fontSize: "1.1rem",
          }}
        >
          <li><a href="/explore" style={navLinkStyle}>Explore</a></li>
          <li><a href="/comparison" style={navLinkStyle}>Comparison</a></li>
          <li><a href="/profile" style={{ ...navLinkStyle, textDecoration: "underline" }}>Profile</a></li>
          <li><a href="/passport" style={navLinkStyle}>My Passport</a></li>
        </ul>
      </nav>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "3rem",
            borderRadius: "16px",
            border: "1px solid rgba(0,255,255,0.4)",
            boxShadow: "0 0 30px rgba(0,255,255,0.15)",
            width: "450px",
            textAlign: "center",
          }}
        >
          {/* PROFILE PICTURE */}
          <div
            style={{
              width: "150px",
              height: "150px",
              margin: "0 auto 2rem auto",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #00ffff",
              boxShadow: "0 0 20px rgba(0,255,255,0.4)",
            }}
          >
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* EMAIL FIELD */}
          <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* PASSWORD FIELD */}
          <div style={{ marginBottom: "2rem", textAlign: "left" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button style={primaryButton} onClick={handleSave}>
            Save Changes
          </button>
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
        }}
      >
        © 2025 NASA Exoplanet Explorer | Data from NASA Exoplanet Archive
      </footer>
    </div>
  );
};

// Shared styles
const navLinkStyle = {
  color: "#00ffff",
  textDecoration: "none",
  fontWeight: "500",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontSize: "1rem",
  fontWeight: "500",
};

const inputStyle = {
  width: "100%",
  padding: "0.6rem 0.8rem",
  borderRadius: "8px",
  border: "1px solid rgba(0,255,255,0.4)",
  background: "rgba(0,0,0,0.4)",
  color: "white",
  fontSize: "1rem",
};

const primaryButton = {
  width: "100%",
  padding: "0.8rem 1.6rem",
  backgroundColor: "#00ffff",
  color: "#000",
  fontSize: "1rem",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Profile;
