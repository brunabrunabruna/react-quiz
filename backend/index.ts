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
const PORT = 3000;
const TOP_PLAYERS_COUNT = 10;

app.use(bodyParser.json());
app.use(cors());

// connecting to the mongodb database using mongoose.
// MONGO_STRING is defined at .env
mongoose
  .connect(process.env.MONGO_STRING ?? "")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// adds a new player
app.post("/players", (request, response) => {
  const body = request.body as { username?: string; score?: number };
  const { username, score } = body;

  // checks if username or score are missing
  if (!username || !score) {
    return response
      .status(400)
      .json({ error: "username or score is not defined" });
  }

  // async function so await can be used (instead of many .then())
  void (async () => {
    // new player instance with current username and score.
    // Will be saved to mongodb collection
    const player = new Player({
      username: username,
      score: score,
    });

    // saves the new player instance to the database with the .save() method.
    try {
      const savedPlayer = await player.save();
      console.log("saved player", savedPlayer);
    } catch (err) {
      response.status(500).json({
        error: "could not save player to database",
        details: JSON.stringify(err),
      });
      console.log("error trying to create new player: ", err);
    }

    // queries through all the players, sorts them and
    // retrieves a max of 10 (or top players count)
    try {
      const topPlayers = await Player.find()
        .sort({ score: "desc" })
        .limit(TOP_PLAYERS_COUNT)
        .exec();
      console.log(topPlayers);

      // sends the top players list as a response
      // (which can be accessed in the frontend)
      return response.status(200).json(topPlayers);
    } catch (err) {
      response.status(500).json({
        error: "could not fetch top players",
        details: JSON.stringify(err),
      });
      console.log("error trying to create new player: ", err);
    }
  })();
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}...`);
});
