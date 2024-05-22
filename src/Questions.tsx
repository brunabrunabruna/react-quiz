import React, { useCallback, useEffect, useState } from "react";
import GameCard from "./GameCard";
import CardContainer from "./CardContainer";
import LoadingCard from "./LoadingCard";
import { decode } from "html-entities";

// definition of the Question type (for typescript), obj received from the api
interface Question {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
}

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // counts which question and answers should be currently displayed, updated
  // when answer button is clicked
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // tracks how many questions user gets correctly
  const [quizScore, setQuizScore] = useState(0);

  //
  const [answersArray, setAnswersArray] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  // fetches data from the api, transforms the response into json, and
  // saves it into the questions variable
  // sets isLoading to false
  const reloadGame = useCallback(() => {
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setAnswersArray([]);
    setIsLoading(true);

    void fetch(
      // "https://opentdb.com/api.php?amount=10&category=25&type=multiple&encode=url3986"
      "https://opentdb.com/api.php?amount=10&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        // const decodedData = decodeURIComponent(data);
        // console.log("decoded data: ", decodedData);
        // const parsedData = JSON.parse(decodedData) as unknown;

        const tempQuestions = (
          (data as { results?: Question[] } | undefined)?.results ?? []
        ).map((question) => {
          return {
            correct_answer: decode(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((i) => {
              return decode(i);
            }),
            question: decode(question.question),
          };
        });

        setQuestions(tempQuestions);
        console.log("data", data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    reloadGame();
  }, [reloadGame]);

  // sets the answersArray with the already shuffled array
  useEffect(() => {
    // generates a random index number for correct_answer
    const randomNumber1to4 = Math.round(Math.random() * 3);
    console.log(randomNumber1to4);

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
    console.log("randomAnswersArray", randomAnswersArray);
    setAnswersArray(randomAnswersArray);
    setCorrectAnswer(questions[currentQuestionIndex]?.correct_answer ?? "");
  }, [questions, currentQuestionIndex]);
  console.log("correctAnswer", correctAnswer);

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
    // setIsGameOver(true);
    return (
      <>
        <CardContainer>
          <div>
            game over, your score is{" "}
            <div className=" text-6xl mt-3 mb-3">
              {quizScore}/{questions.length}
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
        setQuizScore={setQuizScore}
        quizScore={quizScore}
      />
    </CardContainer>
  );
};

export default Questions;
