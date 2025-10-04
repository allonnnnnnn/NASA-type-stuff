import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Simple API endpoint
app.get("/api/planets", (req, res) => {
  res.json([
    { id: 1, name: "Kepler-22b", temperature: 295, gravity: 1.2 },
    { id: 2, name: "Gliese 581g", temperature: 270, gravity: 0.8 },
  ]);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
