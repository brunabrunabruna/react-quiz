import React from "react";
import CardContainer from "./CardContainer";

const GameOverCard = (props: {
  username: string;
  score: number;
  questionsLength: number;
  reloadGame: () => void;
}) => {
  return (
    <CardContainer>
      <div>
        game over <b>{props.username}</b>, your score is
        <div className=" text-6xl mt-3 mb-3">
          {props.score}/{props.questionsLength}
        </div>
      </div>
      <button
        className="bg-lime-800 text-white p-3 rounded w-full text-lg 
mb-3 mt-3"
        onClick={() => {
          props.reloadGame();
        }}
      >
        restart game
      </button>
    </CardContainer>
  );
};

export default GameOverCard;
