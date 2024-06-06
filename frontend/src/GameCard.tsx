import React from "react";

type GameCardProps = {
  currentQuestionIndex: number;
  questions: Question[];
  correctAnswer: string;
  answersArray: string[];
  setCurrentQuestionIndex: (number) => void;
  setQuizScore: (number) => void;
  quizScore: number;
};

interface Question {
  question: string;
}

const GameCard = (props: GameCardProps) => {
  return (
    <>
      {/* displays current and total questions number */}
      <p className=" text-2xl">
        Question {props.currentQuestionIndex + 1}/{props.questions.length}
      </p>
      {/* displays the question corresponding to the questionCount number on
   the questions array */}
      <h2 className="  text-neutral-900 mt-5">
        {props.questions[props.currentQuestionIndex].question}
      </h2>
      <div className=" flex flex-col mt-10 w-full">
        {props.answersArray.map((answer, index: number) => {
          return (
            <button
              key={index}
              className=" bg-lime-800 text-white p-3 rounded w-full text-lg 
          mb-3
          "
              onClick={() => {
                props.setCurrentQuestionIndex(props.currentQuestionIndex + 1);
                answer === props.correctAnswer
                  ? props.setQuizScore(props.quizScore + 1)
                  : props.setQuizScore(props.quizScore);
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
