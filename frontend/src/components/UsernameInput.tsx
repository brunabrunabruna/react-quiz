import React from "react";

type UsernameProps = {
  username: string;
  setUsername: (username: string) => void;
  setIsUsernameDefined: (isUsernameDefined: boolean) => void;
};

const Username = (props: UsernameProps) => {
  const handleChange = (event: { target: { value: string } }) => {
    props.setUsername(event.target.value);
  };

  const handleClick = () => {
    props.setIsUsernameDefined(true);
  };
  return (
    <div>
      <div className="mb-5">enter your username:</div>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleChange}
        className=" bg-gray-300 p-3 rounded-lg"
      />
      <button
        className=" drop-shadow-lg p-3 m-3 rounded-lg button "
        onClick={handleClick}
      >
        Start Game
      </button>
    </div>
  );
};

export default Username;
