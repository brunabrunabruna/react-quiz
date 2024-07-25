import React, { ReactNode } from "react";
import dotsImg from "../assets/img/dots.jpg";

type CardContainerProps = {
  children: ReactNode;
};

const CardContainer = (props: CardContainerProps) => {
  return (
    <div className=" relative h-screen flex items-center justify-center align ">
      {/* title */}
      <div
        className="absolute z-20 text-5xl self-center 
        text-center top-8  "
      >
        crazy quiz
      </div>
      <div className=" absolute z-0 drop-shadow-lg  sm:m-4 ">
        <img src={dotsImg} className="" />
      </div>

      <div
        className=" flex flex-col items-center text-center 
     w-96 m-5 rounded p-5 sm:text-center z-10 "
      >
        {props.children}
      </div>
    </div>
  );
};

export default CardContainer;
