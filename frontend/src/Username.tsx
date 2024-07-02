import React from "react";

const Username = (props: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsUsernameDefined: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
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
