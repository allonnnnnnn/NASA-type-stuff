import React from "react";
import planetLogo from "../assets/planetLogo.png"; // adjust path as needed
import { Link } from "react-router-dom";

const Navbar = ({ activePage }) => {
  return (
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
      {/* Brand section with logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <img
          src={planetLogo}
          alt="Exoplanet Explorer Logo"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid rgba(0,255,255,0.4)",
            boxShadow: "0 0 10px rgba(0,255,255,0.2)",
            objectFit: "cover",
          }}
        />
        <h1
          style={{
            fontSize: "1.6rem",
            color: "#00ffff",
            fontWeight: "bold",
            margin: 0,
            letterSpacing: "0.5px",
          }}
        >
          Exoplanet Explorer
        </h1>
      </div>

      {/* Navigation links */}
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "2rem",
          margin: 0,
          padding: 0,
          fontSize: "1.1rem",
        }}
      >
        {["Home", "Explore", "Comparison", "Profile", "My Passport"].map(
          (label) => {
            let path;

            if (label === "Home") path = "/home";
            else path = `/${label.toLowerCase().replace(" ", "")}`;

            return (
              <li key={label}>
                <Link
                  to={path}
                  style={{
                    ...navLinkStyle,
                    textDecoration:
                      activePage === label ? "underline" : "none",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </nav>
  );
};

const navLinkStyle = {
  color: "#00ffff",
  textDecoration: "none",
  fontWeight: "500",
  transition: "color 0.3s ease",
};

export default Navbar;
