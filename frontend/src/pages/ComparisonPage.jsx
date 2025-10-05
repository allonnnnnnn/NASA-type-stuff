import React, { useState, useEffect } from "react";

function ComparisonPage() {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("compareList")) || [];
    setCompareList(stored);
  }, []);

  const handleClear = () => {
    localStorage.removeItem("compareList");
    setCompareList([]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Compare Exoplanets</h1>

      {compareList.length === 0 ? (
        <div style={styles.emptyContainer}>
          <p style={styles.emptyText}>No exoplanets selected for comparison.</p>
          <a href="/explore" style={styles.exploreButton}>
            Go to Explore Page
          </a>
        </div>
      ) : (
        <div style={styles.compareGrid}>
          {compareList.map((planet) => (
            <div key={planet.id} style={styles.card}>
              <h2 style={styles.cardTitle}>{planet.name}</h2>

              <div style={styles.detailRow}>
                <strong>Mass:</strong> {planet.mass}
              </div>
              <div style={styles.detailRow}>
                <strong>Radius:</strong> {planet.radius}
              </div>
              <div style={styles.detailRow}>
                <strong>Orbital Period:</strong> {planet.orbital_period}
              </div>
              <div style={styles.detailRow}>
                <strong>Star Name:</strong> {planet.star_name}
              </div>
              <div style={styles.detailRow}>
                <strong>Star Distance:</strong> {planet.star_distance}
              </div>
              <div style={styles.detailRow}>
                <strong>Star Age:</strong> {planet.star_age ?? "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}

      {compareList.length > 0 && (
        <button style={styles.clearButton} onClick={handleClear}>
          Clear All
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#191970",
    color: "white",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "30px",
  },
  compareGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    backgroundColor: "#1E1E3F",
    padding: "20px",
    borderRadius: "15px",
    width: "250px",
    textAlign: "left",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    lineHeight: "1.6",
  },
  cardTitle: {
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "1.3rem",
    color: "#87CEFA",
  },
  detailRow: {
    marginBottom: "6px",
  },
  clearButton: {
    display: "block",
    margin: "30px auto 0",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  emptyContainer: {
    textAlign: "center",
    marginTop: "50px",
  },
  emptyText: {
    marginBottom: "20px",
  },
  exploreButton: {
    display: "inline-block",
    backgroundColor: "#4169E1",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

export default ComparisonPage;
