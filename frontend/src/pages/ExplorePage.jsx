import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  limit,
  startAfter,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function ExplorePage() {
  const [exoplanets, setExoplanets] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [pageHistory, setPageHistory] = useState([]);
  const navigate = useNavigate();

  const pageSize = 20;

  useEffect(() => {
    fetchExoplanets();
  }, []);

  const fetchExoplanets = async (direction = "next") => {
    try {
      const exoplanetsRef = collection(db, "exoplanets");
      let q;

      if (direction === "next" && lastDoc) {
        q = query(exoplanetsRef, orderBy("name"), startAfter(lastDoc), limit(pageSize));
      } else if (direction === "prev" && pageHistory.length > 1) {
        const previousDoc = pageHistory[pageHistory.length - 2];
        q = query(exoplanetsRef, orderBy("name"), startAfter(previousDoc), limit(pageSize));
        setPageHistory(pageHistory.slice(0, -1));
      } else {
        q = query(exoplanetsRef, orderBy("name"), limit(pageSize));
      }

      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setExoplanets(fetched);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      if (direction === "next") setPageHistory([...pageHistory, snapshot.docs[0]]);
    } catch (err) {
      console.error("Error fetching exoplanets:", err);
    }
  };

  const handleAddToCompare = (planet) => {
    const stored = JSON.parse(localStorage.getItem("compareList")) || [];
    const alreadyExists = stored.some((item) => item.id === planet.id);

    if (!alreadyExists) {
      const updated = [...stored, planet];
      localStorage.setItem("compareList", JSON.stringify(updated));
      alert(`${planet.name} added to comparison list!`);
    } else {
      alert(`${planet.name} is already in your comparison list.`);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/exoplanet/${id}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore Exoplanets</h1>

      <div style={styles.grid}>
        {exoplanets.map((planet) => (
          <div key={planet.id} style={styles.card}>
            <h2
              style={styles.cardTitle}
              onClick={() => handleCardClick(planet.id)}
            >
              {planet.name}
            </h2>
            <p style={styles.cardDetail}>
              <strong>Mass:</strong> {planet.mass}
            </p>
            <p style={styles.cardDetail}>
              <strong>Radius:</strong> {planet.radius}
            </p>
            <p style={styles.cardDetail}>
              <strong>Orbital Period:</strong> {planet.orbital_period}
            </p>

            <button
              style={styles.compareButton}
              onClick={() => handleAddToCompare(planet)}
            >
              + Compare
            </button>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <button style={styles.button} onClick={() => fetchExoplanets("prev")}>
          ◀ Prev
        </button>
        <button style={styles.button} onClick={() => fetchExoplanets("next")}>
          Next ▶
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0b1120",
    color: "white",
    minHeight: "100vh",
    padding: "40px 60px",
    fontFamily: "'Inter', sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "40px",
    color: "#8ab4f8",
    letterSpacing: "1px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    justifyItems: "center",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "25px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "270px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "pointer",
  },
  cardTitle: {
    fontSize: "1.4rem",
    marginBottom: "15px",
    color: "#93c5fd",
  },
  cardDetail: {
    fontSize: "0.95rem",
    color: "#cbd5e1",
    margin: "5px 0",
  },
  compareButton: {
    marginTop: "15px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "background-color 0.3s ease",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "10px",
    margin: "0 15px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  pagination: {
    textAlign: "center",
    marginTop: "40px",
  },
};

// hover effects via inline style injection
styles.card[":hover"] = {
  transform: "translateY(-6px)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
};

export default ExplorePage;
