const bodyParser = require("body-parser");
// import express, { Request, Response } from "express";
const express = require("express");

// const requestType = express.Request;
// const Response = express.Response;

//for some reason cors import has to be the older version, otherwise it fails to run
const cors = require("cors");

const app = express();
const port = 3000;

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

app.use(bodyParser.json());
app.use(cors());

type User = {
  username: string;
  score: number;
}[];

let users: User = [
  { username: "test username1", score: 3 },
  { username: "test user 2", score: 5 },
];

app.post("/users", (request: any, response: any) => {
  const username = request.body.username;
  const score = request.body.score;

  if (!username) {
    response.status(400).json({ error: "username is not defined" });
  }
  //write in mongoosee
  users.push({ username: username, score: score });

  //get top 10 scores: sort array by score
  const top10 = [];

  response.status(201).json(top10);
});

app.get("/users", (request: any, response: Response) => {
  // response.json(users);
});

app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
