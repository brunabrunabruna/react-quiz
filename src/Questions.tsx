import React, { useCallback, useEffect, useState } from "react";

// definition of the Question type (for typescript), obj received from the api
interface Question {
  question: string;
  incorrect_answers: [string, string, string];
  correct_answer: string;
}
const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // counts which question and answers should be currently displayed, updated when answer button is clicked
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
      "https://opentdb.com/api.php?amount=10&category=17&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestions(
          (data as { results?: Question[] } | undefined)?.results ?? []
        );
        // console.log("data results", data);

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
    return <div>loading...</div>;
  }

  // checks if all the questions have already been displayed, and resets it
  if (currentQuestionIndex >= questions.length) {
    // setIsGameOver(true);
    return (
      <>
        <div>game over, your score is {quizScore}</div>
        <button
          onClick={() => {
            reloadGame();
          }}
        >
          restart game
        </button>
      </>
    );
  }

  return (
    <div className=" bg-lime-600 h-screen flex items-center justify-center ">
      <div className=" bg-lime-100  flex flex-col items-center text-center max-w-full m-5 rounded p-5 sm:text-center ">
        {/* displays current and total questions number */}
        <p className=" text-2xl">
          Question {currentQuestionIndex + 1}/{questions.length}
        </p>
        {/* displays the question corresponding to the questionCount number on the questions array */}
        <h2 className="  text-neutral-900 mt-5">
          {questions[currentQuestionIndex].question}
        </h2>
        <div className=" flex flex-col mt-10 w-full">
          {answersArray.map((answer, index: number) => {
            return (
              <button
                key={index}
                className=" bg-lime-800 text-white p-3 rounded w-full text-lg mb-3"
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  answer === correctAnswer
                    ? setQuizScore(quizScore + 1)
                    : setQuizScore(quizScore);
                }}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Questions;
