/**
 * imports planets data into firestore
 */

import fs from "fs";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(fs.readFileSync("serviceAccountKey.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

const data = JSON.parse(fs.readFileSync("exoplanet_cleaned.json", "utf8"));

const collectionRef = db.collection("exoplanets");

const uploadData = async () => {
  for (const [id, planet] of Object.entries(data)) {
    await collectionRef.doc(id).set(planet);
    console.log(`uploaded: ${id}`);
  }
  console.log("import complete");
};

uploadData().catch(console.error);
