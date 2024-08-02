import React from "react";

type ButtonVersion = "default" | "answer-correct" | "answer-incorrect";

const Button = (props: {
  text: string;
  version?: ButtonVersion;
  onClick: () => void;
  // className?: string;
}) => {
  let variableStyle = "";

  switch (props.version) {
    case "answer-correct":
      variableStyle = "bg-green-500";
      break;

    case "answer-incorrect":
      variableStyle = "bg-red-500";
      break;

    default:
      variableStyle = "bg-pink hover:scale-105";
      break;
  }

  return (
    <button
      className={` ${variableStyle} drop-shadow-lg p-3 m-2 rounded-lg  text-lg
         text-white 
      `}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
