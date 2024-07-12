import React, { useEffect, useState } from "react";
import { QuestionData } from "../lib/types";

type GameCardProps = {
  currentQuestionIndex: number;
  questionData: QuestionData;
  totalQuestionsCount: number;
  onAnswer: (isCorrect: boolean) => void;
};

const GameCard = (props: GameCardProps) => {
  const [answers, setAnswers] = useState<string[]>([]);

  // sets the answers with the already shuffled array
  useEffect(() => {
    // generates a random index number for correct_answer
    const correctAnswerIndex = Math.round(Math.random() * 3);

    // creates an array to assemble the incorrect and correct answers randomly
    const randomAnswersArray = [
      // starts from the incorrect_answers array
      ...(props.questionData.incorrectAnswers ?? []),
    ];
    // adds the correct answer to a random index in the randomAnswersArray
    randomAnswersArray.splice(
      correctAnswerIndex,
      0,
      props.questionData.correctAnswer ?? ""
    );
    setAnswers(randomAnswersArray);
  }, [props.questionData]);

  return (
    <>
      {/* displays current and total questions number */}
      <p className="text-2xl">
        Question {props.currentQuestionIndex + 1}/{props.totalQuestionsCount}
      </p>
      {/* displays the question corresponding to the questionCount number on
   the questions array */}
      <h2 className="text-neutral-900 mt-5">{props.questionData.question}</h2>
      <div className=" flex flex-col mt-10 w-full">
        {answers.map((answer, index) => {
          return (
            <button
              key={index}
              className="bg-lime-800 text-white p-3 rounded w-full text-lg 
          mb-3"
              onClick={() => {
                props.onAnswer(answer === props.questionData.correctAnswer);
              }}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default GameCard;
