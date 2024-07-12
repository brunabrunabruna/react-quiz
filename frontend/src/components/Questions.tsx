import React, { useState } from "react";
import LoadingCard from "./LoadingCard";
import Username from "./UsernameInput";
import CardContainer from "./CardContainer";
import GameCard from "./GameCard";
import useQuiz from "../hooks/useQuiz";
import GameOverCard from "./GameOverCard";

const Questions = () => {
  const [isUsernameDefined, setIsUsernameDefined] = useState(false);
  const [username, setUsername] = useState("");

  // tracks how many questions user gets correctly
  const [score, setScore] = useState(0);

  const {
    isLoading,
    isGameOver,
    currentQuestionIndex,
    questions,
    setCurrentQuestionIndex,
    reloadGame,
  } = useQuiz({
    setIsUsernameDefined,
    username,
    setUsername,
    score,
    setScore,
  });

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
  if (isLoading || !questions.length) {
    return (
      <CardContainer>
        <LoadingCard />
      </CardContainer>
    );
  }

  if (isGameOver) {
    return (
      <GameOverCard
        username={username}
        score={score}
        questionsLength={questions.length}
        reloadGame={reloadGame}
      />
    );
  } else {
    return (
      <CardContainer>
        {currentQuestionIndex < questions.length && (
          <GameCard
            currentQuestionIndex={currentQuestionIndex}
            questionData={questions[currentQuestionIndex]}
            onAnswer={(isCorrect) => {
              if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
              }
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            }}
            totalQuestionsCount={questions.length}
          />
        )}
      </CardContainer>
    );
  }
};

export default Questions;
