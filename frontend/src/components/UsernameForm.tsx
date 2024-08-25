import { useState } from "react";
import dotsImg from "../assets/img/dots.jpg";
import Button from "../Button";

type UsernameProps = {
  username: string;
  setUsername: (username: string) => void;
  setIsUsernameDefined: (isUsernameDefined: boolean) => void;
};

const UsernameForm = (props: UsernameProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (event: { target: { value: string } }) => {
    props.setUsername(event.target.value);

    // diables button when imput is empty
    setIsButtonDisabled(!event.target.value);
  };

  const handleClick = () => {
    if (!props.username) {
      setIsButtonDisabled(true);
    } else {
      props.setIsUsernameDefined(true);
    }
  };

  return (
    <div
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
          className=" bg-white border-2 border-pink p-3 rounded-lg mb-3"
        />
        <Button
          onClick={handleClick}
          text="Start Game"
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  );
};

export default UsernameForm;
