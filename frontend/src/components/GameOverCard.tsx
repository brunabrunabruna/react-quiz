import React from "react";
import { Player } from "../lib/types";
import dotsImg from "../assets/img/dots.jpg";

const GameOverCard = (props: {
  username: string;
  score: number;
  questionsLength: number;
  reloadGame: () => void;
  topPlayers: Player[];
}) => {
  return (
    <>
      <div
        className="relative flex flex-col 
    items-center justify-center drop-shadow-lg rounded-lg "
      >
        <div
          className=" absolute inset-0 object-cover 
        overflow-hidden rounded-lg "
        >
          <img src={dotsImg} />
        </div>
        <div
          className=" flex flex-col justify-center items-center text-center 
      m-5 rounded p-5  relative grow"
        >
          <div>
            game over <b>{props.username}</b>, your score is
            <div className=" text-6xl mt-3 mb-3">
              {props.score}/{props.questionsLength}
            </div>
          </div>
          <button
            className=" drop-shadow-lg p-3 m-3 rounded-lg button "
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
        </div>
      </div>
    </>
  );
};

export default GameOverCard;

{
  /* <div
  className=" relative flex flex-col 
items-center justify-center  drop-shadow-lg  rounded-lg  "
>
  <div
    className=" absolute inset-0 object-cover 
  overflow-hidden rounded-lg "
  >
    <img src={dotsImg} />
  </div>
  <div
    className=" flex flex-col justify-center items-center text-center 
m-5 rounded p-5  relative grow"
  >
    <div
      className="flex flex-col 
  items-center justify-start p-10 top-0 max-w-10"
    >
      <div className="text-5xl  ">cute quiz</div>
    </div>
    <div className="mb-5">enter your username:</div>
    <input
      type="text"
      name="username"
      id="username"
      placeholder="myUsername"
      onChange={handleChange}
      className=" bg-gray-300 p-3 rounded-lg placeholder-shown:"
    />
    {buttonDisabled && <div>*field required</div>}
    <button
      className=" drop-shadow-lg p-3 m-3 rounded-lg button  "
      onClick={handleClick}
    >
      Start Game
    </button>
  </div>
</div>; */
}
