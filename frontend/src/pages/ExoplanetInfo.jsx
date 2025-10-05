import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

function ExoplanetInfo() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const docRef = doc(db, "exoplanets", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlanet(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching planet info:", err);
      }
    };

    fetchPlanet();
  }, [id]);

  if (!planet) {
    return (
      <div style={styles.container}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
      <h1 style={styles.title}>{planet.name}</h1>

      <div style={styles.infoBox}>
        <p><strong>Mass:</strong> {planet.mass}</p>
        <p><strong>Radius:</strong> {planet.radius}</p>
        <p><strong>Orbital Period:</strong> {planet.orbital_period}</p>
        <p><strong>Star Name:</strong> {planet.star_name}</p>
        <p><strong>Star Distance:</strong> {planet.star_distance} light years</p>
        <p><strong>Star Age:</strong> {planet.star_age} billion years</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#191970",
    color: "white",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  infoBox: {
    backgroundColor: "#1E1E3F",
    borderRadius: "15px",
    padding: "20px",
    maxWidth: "400px",
    lineHeight: "1.8",
  },
  backButton: {
    backgroundColor: "#4169E1",
    border: "none",
    borderRadius: "10px",
    color: "white",
    padding: "10px 15px",
    cursor: "pointer",
    marginBottom: "20px",
  },
};

export default ExoplanetInfo;
