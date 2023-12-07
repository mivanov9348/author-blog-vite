import express from "express";
import { connectToDb, getDb } from "./db";

const app = express();
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log(`App is run on port 3000`);
    });
    db = getDb();
  }
});

app.get("/Teams", (req, res) => {
  let teams = [];

  db.collection("Teams")
    .find()
    .sort({ name: 1 })
    .forEach((team) => teams.push(team))
    .then(() => {
      res.status(200).json(teams);
    })
    .catch(() => {
      res.status(500).json({ error: "Not Fetch" });
    });

  res.json({ mssg: "welcome to the api" });
});
