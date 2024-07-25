import { useState, useCallback, useEffect } from "react";
import { Player, QuestionData } from "../lib/types";
import { decode } from "html-entities";

// "process is not defined"
// const BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:3000";
const BACKEND_URL = "http://localhost:3000";
const QUIZ_API_ENDPOINT = "https://opentdb.com/api.php";
const QUIZ_QUESTION_COUNT = 10;
const useQuiz = (args: {
  setUsername: (username: string) => void;
  setIsUsernameDefined: (isUsernameDefined: boolean) => void;
  setScore: (score: number) => void;
  username: string;
  score: number;
}) => {
  const { setUsername, setIsUsernameDefined, setScore, username, score } = args;

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // counts which question and answers should be currently displayed, updated
  // when answer button is clicked
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);
  const [playersDatabase, setPlayersDatabase] = useState<Player[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);

  // fetches data from the api, transforms the response into json, and
  // saves it into the questions variable
  // sets isLoading to false
  const reloadGame = useCallback(() => {
    setUsername("");
    setIsUsernameDefined(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsLoading(true);
    setIsGameOver(false);

    fetch(`${QUIZ_API_ENDPOINT}?amount=${QUIZ_QUESTION_COUNT}&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
        // handles the decoding of some characters like "" from
        // what we get from the api, so these characters are
        // showed up normally in the displayed text
        const tempQuestions = (
          (
            data as
              | {
                  results?: {
                    question: string;
                    incorrect_answers: string[];
                    correct_answer: string;
                  }[];
                }
              | undefined
          )?.results ?? []
        ).map<QuestionData>((question) => {
          return {
            correctAnswer: decode(question.correct_answer),
            incorrectAnswers: question.incorrect_answers.map((i) => decode(i)),
            question: decode(question.question),
          };
        });

        setQuestions(tempQuestions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error fetching data:", error);
        setIsLoading(false);
      });
  }, [setIsUsernameDefined, setScore, setUsername]);

  // help
  useEffect(() => {
    reloadGame();
  }, [reloadGame]);

  // checks if all the questions have already been displayed, and resets it
  useEffect(() => {
    if (currentQuestionIndex >= questions.length && questions.length !== 0) {
      setIsGameOver(true);

      // sends the players username and score through a post request
      // to the database
      fetch(`${BACKEND_URL}/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, score: score }),
      })
        .then((response) => response.json())
        .then((data: Player[]) => {
          if (data) {
            setTopPlayers(data);

            console.log("data:", JSON.stringify(data));
          } else {
            console.log("no data passed from the server");
          }
        })
        .catch((error) => {
          console.log("error:", error);
        });
      console.log(`username:`, username, "score:", score);
    }
  }, [questions, currentQuestionIndex, score, username]);

  // logs top players
  useEffect(() => {
    console.log(" top10 players:", topPlayers);
  }, [topPlayers]);

  return {
    isLoading,
    isGameOver,
    currentQuestionIndex,
    questions,
    setCurrentQuestionIndex,
    reloadGame,
    topPlayers,
  };
};

export default useQuiz;
