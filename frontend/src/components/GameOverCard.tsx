import React from "react";
import CardContainer from "./CardContainer";
import { Player } from "../lib/types";

const GameOverCard = (props: {
  username: string;
  score: number;
  questionsLength: number;
  reloadGame: () => void;
  topPlayers: Player[];
}) => {
  return (
    <>
      <CardContainer>
        <div>
          game over <b>{props.username}</b>, your score is
          <div className=" text-6xl mt-3 mb-3">
            {props.score}/{props.questionsLength}
          </div>
        </div>
        <button
          className=" p-3 rounded w-full text-lg 
mb-3 mt-3 button"
          onClick={() => {
            props.reloadGame();
          }}
        >
          restart game
        </button>
        <div>
          <div className=" p-3 text-lg font-bold">top 10 players:</div>
          {props.topPlayers.map((player, index) => (
            <div key={index} className=" grid justify-items-start">
              <div className=" flex">
                <div className=" text-left">{`${index + 1}.`}</div>
                <div className=" ">{`${player.username}: 
            ${player.score}`}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContainer>
    </>
  );
};

export default GameOverCard;
