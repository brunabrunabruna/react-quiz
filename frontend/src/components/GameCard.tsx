import { useCallback, useEffect, useState } from "react";
import React from "react";
import { QuestionData } from "../lib/types";
import Button from "../Button";
import dotsImg from "../assets/img/dots.jpg";
import Tape from "./Tape";

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
    // console.log(props.questionData.correctAnswer);
  }, [props.questionData]);

  // resets click and has correct answer, if has correct answer
  // was previously set to true
  useEffect(() => {
    setClicked(false);
  }, [props.currentQuestionIndex]);

  // click function when answer button gets clicked
  const handleClick = useCallback(
    (answer: string) => {
      if (clicked) {
        return;
      }
      props.onAnswer(answer === props.questionData.correctAnswer);
      setClicked(true);
    },
    [clicked, props]
  );

  return (
    <>
      {/* displays current and total questions number */}
      <div
        className="relative justify-center 
        drop-shadow-lg  
      w-screen sm:w-[570px]"
      >
        {/* background img */}
        <img
          src={dotsImg}
          className="absolute w-full h-full h -z-20 object-cover rounded-lg"
        />

        <Tape
          totalQuestionsCount={props.totalQuestionsCount}
          currentQuestionIndex={props.currentQuestionIndex}
        />
        {/* question and answers */}
        <div
          className="flex flex-col items-stretch 
        rounded p-5 text-center z-10 m-10 mt-28 mb-20"
        >
          {/* question */}
          <h2
            className="text-neutral-900 mt-5 text-xl font-bold 
            top-0"
          >
            {props.questionData.question}
          </h2>
          {/* answers buttons */}
          <div
            className="flex flex-col gap-4 mt-2 sm:mt-10 
          items-stretch bottom-0 justify-center px-4"
          >
            {answers.map((answer, index) => (
              <Button
                text={answer}
                key={index}
                version={
                  clicked
                    ? answer === props.questionData.correctAnswer
                      ? "answer-correct"
                      : "answer-incorrect"
                    : "default"
                }
                onClick={() => {
                  handleClick(answer);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
