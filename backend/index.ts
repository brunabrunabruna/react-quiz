import bodyParser from "body-parser";
import express, { Request, Response } from "express";

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

app.post("/users", (request: Request, response: Response) => {
  const username = request.body.username;
  const score = request.body.score;

  if (!username) {
    response.status(400).json({ error: "username is not defined" });
  }
  users.push({ username: username, score: score });
  response.status(201).json({ username });
});

app.get("/users", (request: Request, response: Response) => {
  response.json(users);
});

app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
