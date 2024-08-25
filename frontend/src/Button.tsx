type ButtonVersion = "default" | "answer-correct" | "answer-incorrect";

const Button = (props: {
  text: string;
  version?: ButtonVersion;
  onClick: () => void;
  disabled?: boolean;
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
      className={`${variableStyle} text-base drop-shadow-lg 
      p-3 rounded-lg text-white 
      sm:text-lg disabled:scale-100 
    disabled:bg-gray-200 disabled:text-gray-500 disabled:drop-shadow-none`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
