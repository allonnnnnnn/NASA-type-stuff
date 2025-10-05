import express from "express";
import cors from "cors";
import admin from "firebase-admin";

const app = express();
app.use(cors());
app.use(express.json());

import serviceAccount from "../nasahackathon-f33a9-firebase-adminsdk-fbsvc-b3f0a9ced3.json" with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.post("/api/account", async (req, res) => {
  try {
    const tokenId = req.headers.authorization;
    const decoded = await admin.auth().verifyIdToken(tokenId);
    const { username } = req.body;
    
    await db.collection("users").doc(decoded.uid).set({
      email: decoded.email,
      username: username,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      visitedPlanets: {}
    });

    res.status(200).json({message: "Success"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/account/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const doc = await db.collection("users").doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/account/:uid/visited", async (req, res) => {
  try {
    const tokenId = req.headers.authorization;
    if (!tokenId) {
      return res.status(401).json({ error: "Missing auth token" });
    }

    const decoded = await admin.auth().verifyIdToken(tokenId);
    const { planetName } = req.body;

    if (!planetName) {
      return res.status(400).json({ error: "Missing planet name" });
    }

    const userRef = db.collection("users").doc(decoded.uid);

    await userRef.update({
      visitedPlanets: admin.firestore.FieldValue.arrayUnion(planetName),
    });

    res.status(200).json({ message: `${planetName} added to visited planets` });
  } catch (error) {
    console.error("Error updating visited planets:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Backend running on port 5000"));
