require("dotenv").config();
import { Db, MongoClient } from "mongodb";
const mongoose = require("mongoose");
//mongoose schema, so uniformity is enforced on our data. Players gives me access to my all my players collection, by writing Players.find() for ex. i can log all my currently saved players
import Players from "./model";
const bodyParser = require("body-parser");
// import express, { Request, Response } from "express";
const express = require("express");

// const requestType = express.Request;
// const Response = express.Response;

//for some reason cors import has to be the older version, otherwise it fails to run
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

//connecting to the mongodb database unsing mongoose. MONGO_STRING is defined at .env
mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err: any) => console.error("Could not connect to MongoDB...", err));

//adds a new player
//typescript help
//help @felix
app.post("/players", (request: any, response: any) => {
  const username = request.body.username;
  const score = request.body.score;

  //checks if username or score are missing
  if (!username || !score) {
    return response
      .status(400)
      .json({ error: "username or score is not defined" });
  }

  //new player instance with current username and score. Will be saved to mongodb collection
  const player = new Players({
    username: username,
    score: score,
  });

  //saves the new player instance to the database with the .save() method.
  player
    .save()
    .then((savedPlayer: any) => {
      //response 201 means Created status
      response.status(201).json(savedPlayer);
      console.log("saved player: ", savedPlayer);
    })
    .catch((e: any) => {
      response
        .status(500)
        .json({ error: "could not save player to database", details: e });
      console.log("error trying to create new player: ", e);
    });
});

app.get("/users", (request: any, response: Response) => {
  // response.json(users);
});

app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
