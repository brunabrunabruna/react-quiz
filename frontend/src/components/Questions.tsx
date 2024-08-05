import { useState } from "react";
import React from "react";
import LoadingCard from "./LoadingCard";
import UsernameForm from "./UsernameForm";
import Screen from "./Screen";
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
    topPlayers,
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
      <Screen>
        <UsernameForm
          username={username}
          setUsername={setUsername}
          setIsUsernameDefined={setIsUsernameDefined}
        />
      </Screen>
    );
  }

  // displays this component if api is still being fetched
  if (isLoading || !questions.length) {
    return (
      <Screen>
        <LoadingCard />
      </Screen>
    );
  }

  if (isGameOver) {
    return (
      <Screen>
        <GameOverCard
          username={username}
          score={score}
          questionsLength={questions.length}
          reloadGame={reloadGame}
          topPlayers={topPlayers}
        />
      </Screen>
    );
  } else {
    return (
      <Screen>
        {currentQuestionIndex < questions.length && (
          <GameCard
            currentQuestionIndex={currentQuestionIndex}
            questionData={questions[currentQuestionIndex]}
            onAnswer={(isCorrect) => {
              if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
              }

              setTimeout(() => {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              }, 1000);
            }}
            totalQuestionsCount={questions.length}
          />
        )}
      </Screen>
    );
  }
};

export default Questions;
