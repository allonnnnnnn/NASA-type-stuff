import React, { useState, useEffect } from "react";
import { collection, getDocs, limit, startAfter, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function ExplorePage() {
  const [exoplanets, setExoplanets] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [pageHistory, setPageHistory] = useState([]);
  const navigate = useNavigate();

  const pageSize = 60;

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
      setFirstDoc(snapshot.docs[0]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      if (direction === "next") setPageHistory([...pageHistory, snapshot.docs[0]]);
    } catch (err) {
      console.error("Error fetching exoplanets:", err);
    }
  };

  // 🔹 Add planet to localStorage for comparison
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    justifyItems: "center",
  },
  card: {
    backgroundColor: "#1E1E3F",
    padding: "20px",
    borderRadius: "15px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  },
  cardTitle: {
    fontSize: "1.2rem",
    cursor: "pointer",
    marginBottom: "10px",
  },
  compareButton: {
    backgroundColor: "#4169E1",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease",
  },
  button: {
    backgroundColor: "#4169E1",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    margin: "0 10px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  pagination: {
    textAlign: "center",
    marginTop: "30px",
  },
};

export default ExplorePage;
