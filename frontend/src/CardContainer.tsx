import React, { ReactNode } from "react";

type CardContainerProps = {
  children: ReactNode;
};

const CardContainer = (props: CardContainerProps) => {
  return (
    <div className=" bg-lime-600 h-screen flex items-center justify-center ">
      <div
        className=" bg-lime-100  flex flex-col items-center text-center 
      max-w-full m-5 rounded p-5 sm:text-center "
      >
        {props.children}
      </div>
    </div>
  );
};

export default CardContainer;
