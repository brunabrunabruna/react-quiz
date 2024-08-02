import React, { useEffect, useState } from "react";
import { QuestionData } from "../lib/types";
import pinkTape from "../assets/img/pinkTape.png";
import dotsImg from "../assets/img/dots.jpg";
import Button from "../Button";

type GameCardProps = {
  currentQuestionIndex: number;
  questionData: QuestionData;
  totalQuestionsCount: number;
  onAnswer: (isCorrect: boolean) => void;
};

const GameCard = (props: GameCardProps) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [clicked, setClicked] = useState(false);
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

  // resets click and has correct answer, if has correct answer
  // was previously set to true
  useEffect(() => {
    setClicked(false);
  }, [props.currentQuestionIndex]);

  // click function when answer buttun gets clicked
  const handleClick = (answer: string) => {
    props.onAnswer(answer === props.questionData.correctAnswer);
    setClicked(true);
  };

  return (
    <>
      <div className=" relative h-screen flex items-center justify-center ">
        {/* displays current and total questions number */}
        <div
          className=" flex items-center justify-center
         absolute drop-shadow-lg rounded-lg"
        >
          <div
            className=" inset-0 object-cover 
        overflow-hidden rounded-lg "
          >
            {/* background img */}
            <img src={dotsImg} className="-z-20" />
          </div>
          {/* tape and questions count */}
          <div className="absolute w-60 -top-10 -right-10 tape ">
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

          {/* question and answers */}
          <div
            className=" flex flex-col  w-96  m-5 
        rounded p-5 sm:text-center z-10 top-20 absolute"
          >
            {/* question */}
            <h2
              className="text-neutral-900  mt-5 text-xl question 
            top-0 max-w-full"
            >
              {props.questionData.question}
            </h2>
            {/* answers buttons */}
            <div className=" flex flex-col mt-10 min-w-60 max-w-96 bottom-0 ">
              {answers.map((answer, index) => (
                <Button
                  text={answer}
                  key={index}
                  version={
                    clicked
                      ? answer === props.questionData.correctAnswer
                        ? "answer-correct"
                        : "answer-incorrect"
                      : ""
                  }
                  onClick={() => {
                    handleClick(answer);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
