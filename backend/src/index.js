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

// Simple API endpoint
app.get("/api/planets", (req, res) => {
  res.json([
    { id: 1, name: "Kepler-22b", temperature: 295, gravity: 1.2 },
    { id: 2, name: "Gliese 581g", temperature: 270, gravity: 0.8 },
  ]);
});

app.post("/api/account", async (req, res) => {
  try {
    const tokenId = req.headers.authorization;
    const decoded = await admin.auth().verifyIdToken(tokenId);
    const { username } = req.body;
    
    await db.collection("users").doc(decoded.uid).set({
      email: decoded.email,
      username: username,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({message: "Success"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
