import React from "react";

const Username = (props: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsUsernameDefined: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleChange = (event) => {
    props.setUsername(event.target.value);
    // console.log(props.username);
  };

  const handleClick = () => {
    // fetch("http://localhost:3000/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username: props.username }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => {
    //     console.log("error:", error);
    //   });

    // console.log(`username:`, props.username);
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
