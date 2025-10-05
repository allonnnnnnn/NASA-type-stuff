import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

function ExoplanetInfo() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [visited, setVisited] = useState(false);
  const navigate = useNavigate();

  // Fetch planet info
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

  useEffect(() => {
    const checkVisitedStatus = async () => {
      const user = auth.currentUser;
      if (!user || !planet) return;

      try {
        const token = await user.getIdToken();
        const response = await fetch(`http://localhost:3000/api/account/${user.uid}`, {
          method: "GET",
          headers: {
            "Authorization": token,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        const visitedPlanets = data.visitedPlanets || [];
        setVisited(visitedPlanets.includes(planet.name));
      } catch (error) {
        console.error("Error checking visited status:", error);
      }
    };

    checkVisitedStatus();
  }, [planet]);

  const handleVisitedClick = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to visit a planet!");
        return;
      }

      const token = await user.getIdToken();

      const response = await fetch(`http://localhost:3000/api/account/${user.uid}/visited`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({ planetName: planet.name }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to add planet");
      }

      setVisited(true); // Update button state 
    } catch (error) {
      console.error("Error visiting planet:", error);
      alert("Error visiting planet: " + error.message);
    }
  };

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

        <button
          style={{
            ...styles.visitedButton,
            backgroundColor: visited ? "#4CAF50" : "#212bb1ff",
            cursor: visited ? "default" : "pointer",
          }}
          onClick={!visited ? handleVisitedClick : undefined}
          disabled={visited}
        >
          {visited ? "✅ Visited" : "Visit"}
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
  visitedButton: {
    marginTop: "20px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    padding: "10px 15px",
    fontSize: "1rem",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
};

export default ExoplanetInfo;
