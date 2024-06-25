import { MongoClient } from "mongodb";
const mongoose = require("mongoose");
import Player from "./model";

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

// const dbConnecting = async () => {
//   const uri =
//     "mongodb+srv://brunaandreis:gW9FO8ek51y5OFzm@cluster0.0fxk81l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     listDatabases(client);
//   } catch (error) {
//     console.error(error);
//   }
//   // finally {
//   //   await client.close();
//   // }
// };

// dbConnecting().catch(console.error);

// const listDatabases = async (client: MongoClient) => {
//   const databasesList = await client.db().collections();
//   console.log(databasesList);
// };

mongoose.connect(
  "mongodb+srv://brunaandreis:gW9FO8ek51y5OFzm@cluster0.0fxk81l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/", (request: any, response: any) => {
  const username = request.body.username;
  const score = request.body.score;

  if (!request.body) {
    response.status(400).json({ error: "username or score is not defined" });
  }
  //write in mongoosee
  // users.push ({ username: username, score: score });

  //new user
  const player = new Player.create({
    username: username,
    score: score,
  });

  console.log(player);
  //get top 10 scores: sort array by score
  // const top10: [] = [];

  // response.status(201).json(top10);
});

const firstPlayer = Player.findOne({});
console.log(firstPlayer);

app.get("/users", (request: any, response: Response) => {
  // response.json(users);
});

app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
