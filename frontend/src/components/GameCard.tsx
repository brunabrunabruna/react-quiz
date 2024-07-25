import React, { useEffect, useState } from "react";
import { QuestionData } from "../lib/types";
import dotsImg from "../assets/img/dots.jpg";
import pinkTape from "../assets/img/pinkTape.png";
import stars from "../assets/img/stars.png";

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
    console.log(props.questionData.correctAnswer);
  }, [props.questionData]);

  return (
    <>
      <div className=" relative h-screen flex items-center justify-center ">
        <img
          src={stars}
          className=" absolute z-30 top-32 left-2 max-w-72 rotate-12"
        />
        {/* displays current and total questions number */}
        <div className=" absolute drop-shadow-lg">
          <img src={dotsImg} className="-z-20" />
          {/* tape and questions count */}
          <div className="absolute w-60 -top-10 -right-10 ">
            {/* tape img */}
            <img src={pinkTape} />
            {/* question count */}
            <p
              className="text-2xl absolute top-10 right-3 
            rotate-12 question-count"
            >
              Question {props.currentQuestionIndex + 1}/
              {props.totalQuestionsCount}
            </p>
          </div>
          <div
            className=" flex flex-col  w-96 min-h-fit m-5 
        rounded p-5 sm:text-center z-10 top-20 "
          >
            {/* question */}
            <h2 className="text-neutral-900  mt-5 text-xl question top-0">
              {props.questionData.question}
            </h2>
            {/* answers buttons */}
            <div className=" flex flex-col mt-10 min-w-60 max-w-96 bottom-0 ">
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    className=" text-white p-3 rounded w-full text-lg 
          mb-3 drop-shadow-lg button"
                    onClick={() => {
                      props.onAnswer(
                        answer === props.questionData.correctAnswer
                      );
                    }}
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
