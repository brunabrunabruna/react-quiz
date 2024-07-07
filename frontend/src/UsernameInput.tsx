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
      <div>enter your username:</div>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleChange}
      />
      <button onClick={handleClick}>submit</button>
    </div>
  );
};

export default Username;
