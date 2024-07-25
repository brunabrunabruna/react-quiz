import React, { ReactNode } from "react";
import dotsImg from "../assets/img/dots.jpg";

type CardContainerProps = {
  children: ReactNode;
};

const CardContainer = (props: CardContainerProps) => {
  return (
    <div className=" flex h-screen w-screen justify-center items-center">
      <div
        className=" relative  flex flex-col 
    items-center justify-center w-96 h-96 drop-shadow-lg "
      >
        {/* title */}

        <div className=" absolute inset-0 ">
          <img src={dotsImg} className=" object-cover" />
        </div>
        <div
          className=" flex flex-col justify-center items-center text-center 
     w-96 m-5 rounded p-5  relative grow"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
