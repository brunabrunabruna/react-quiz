import "dotenv/config";
import mongoose from "mongoose";
// mongoose schema, so uniformity is enforced on our data.
// Players gives me access to my all my players collection,
// by writing Players.find() for ex. i can log all my currently saved players
import Player from "./model";
import bodyParser from "body-parser";
// import express, { Request, Response } from "express";
import express from "express";

// const requestType = express.Request;
// const Response = express.Response;

// for some reason cors import has to be the older version,
// otherwise it fails to run
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// connecting to the mongodb database using mongoose.
// MONGO_STRING is defined at .env
mongoose
  .connect(process.env.MONGO_STRING ?? "")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// adds a new player
// typescript help
// help @felix
app.post("/players", (request, response) => {
  const body = request.body as { username?: string; score?: number };
  const { username, score } = body;

  // checks if username or score are missing
  if (!username || !score) {
    return response
      .status(400)
      .json({ error: "username or score is not defined" });
  }

  // new player instance with current username and score.
  // Will be saved to mongodb collection
  const player = new Player({
    username: username,
    score: score,
  });

  // saves the new player instance to the database with the .save() method.
  player
    .save()
    .then((savedPlayer) => {
      // response 201 means Created status
      response.status(201).json(savedPlayer);
      console.log("saved player: ", savedPlayer);
    })
    .catch((e) => {
      response.status(500).json({
        error: "could not save player to database",
        details: JSON.stringify(e),
      });
      console.log("error trying to create new player: ", e);
    });
});

app.get("/players", (request, response) => {
  const allPLayers = Player.find({});
  console.log(allPLayers);
});

app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
