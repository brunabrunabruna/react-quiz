import React, { ReactNode } from "react";
import dotsImg from "../assets/img/dots.jpg";

type CardContainerProps = {
  children: ReactNode;
};

const CardContainer = (props: CardContainerProps) => {
  return (
    <div
      className=" relative h-screen flex flex-col 
    items-center justify-center"
    >
      {/* title */}

      <div className=" absolute drop-shadow-lg  sm:m-4 ">
        <img src={dotsImg} className="" />
      </div>
      <div className=" relative text-5xl top-0 ">crazy quiz</div>
      <div
        className=" flex flex-col items-center text-center 
     w-96 m-5 rounded p-5 sm:text-center relative "
      >
        {props.children}
      </div>
    </div>
  );
};

export default CardContainer;
