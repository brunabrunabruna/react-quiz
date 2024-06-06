import React, { useCallback, useEffect, useState } from "react";
import GameCard from "./GameCard";
import CardContainer from "./CardContainer";
import LoadingCard from "./LoadingCard";
import { decode } from "html-entities";
import Username from "./Username";

// definition of the Question type (for typescript), obj received from the api
interface Question {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
}

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsernameDefined, setIsUsernameDefined] = useState(false);
  const [username, setUsername] = useState("");

  // counts which question and answers should be currently displayed, updated
  // when answer button is clicked
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // tracks how many questions user gets correctly
  const [score, setScore] = useState(0);

  //
  const [answersArray, setAnswersArray] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  // fetches data from the api, transforms the response into json, and
  // saves it into the questions variable
  // sets isLoading to false
  const reloadGame = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswersArray([]);
    setIsLoading(true);

    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        // handles the decoding of some characters like "" from what we get from the api, so these characters are showed up normally in the displayed text
        const tempQuestions = // help
          ((data as { results?: Question[] } | undefined)?.results ?? []).map(
            (question) => {
              return {
                correct_answer: decode(question.correct_answer),
                incorrect_answers: question.incorrect_answers.map((i) => {
                  return decode(i);
                }),
                question: decode(question.question),
              };
            }
          );

        setQuestions(tempQuestions);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // help
  useEffect(() => {
    reloadGame();
  }, [reloadGame]);

  // sets the answersArray with the already shuffled array
  useEffect(() => {
    // generates a random index number for correct_answer
    const randomNumber1to4 = Math.round(Math.random() * 3);

    // creates an array to assemble the incorrect and correct answers randomly
    const randomAnswersArray = [
      // starts from the incorrect_answers array
      ...(questions[currentQuestionIndex]?.incorrect_answers ?? []),
    ];
    // adds the correct answer to a random index in the randomAnswersArray
    randomAnswersArray.splice(
      randomNumber1to4,
      0,
      questions[currentQuestionIndex]?.correct_answer ?? ""
    );
    // console.log("randomAnswersArray", randomAnswersArray);
    setAnswersArray(randomAnswersArray);
    setCorrectAnswer(questions[currentQuestionIndex]?.correct_answer ?? "");
  }, [questions, currentQuestionIndex]);
  // console.log("correctAnswer", correctAnswer);

  // user defines their username
  if (!isUsernameDefined) {
    return (
      <CardContainer>
        <Username
          username={username}
          setUsername={setUsername}
          setIsUsernameDefined={setIsUsernameDefined}
        />
      </CardContainer>
    );
  }

  // displays this component if api is still being fetched
  if (isLoading) {
    return (
      <CardContainer>
        <LoadingCard />
      </CardContainer>
    );
  }

  // checks if all the questions have already been displayed, and resets it
  if (currentQuestionIndex >= questions.length) {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, score: score }),
    })
      .then((response) => response.json())
      .then((data) => console.log("data:", data))
      .catch((error) => {
        console.log("error:", error);
      });

    console.log(`username:`, username, "score:", score);

    return (
      <>
        <CardContainer>
          <div>
            game over <b>{username}</b>, your score is
            <div className=" text-6xl mt-3 mb-3">
              {score}/{questions.length}
            </div>
          </div>
          <button
            className=" bg-lime-800 text-white p-3 rounded w-full text-lg 
          mb-3 mt-3
          "
            onClick={() => {
              reloadGame();
            }}
          >
            restart game
          </button>
        </CardContainer>
      </>
    );
  }

  return (
    <CardContainer>
      <GameCard
        currentQuestionIndex={currentQuestionIndex}
        questions={questions}
        answersArray={answersArray}
        correctAnswer={correctAnswer}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setQuizScore={setScore}
        quizScore={score}
      />
    </CardContainer>
  );
};

export default Questions;
