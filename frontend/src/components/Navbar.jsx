import React from "react";

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
      {/* brand */}
      <h1
        style={{
          fontSize: "1.8rem",
          color: "#00ffff",
          fontWeight: "bold",
          margin: 0,
        }}
      >
        🚀 Exoplanet Explorer
      </h1>

      {/* Nav Links */}
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
                <a
                  href={path}
                  style={{
                    ...navLinkStyle,
                    textDecoration:
                      activePage === label ? "underline" : "none",
                  }}
                >
                  {label}
                </a>
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
};

export default Navbar;
