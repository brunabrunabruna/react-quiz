import { ReactNode } from "react";

type Screen = {
  children: ReactNode;
};

const Screen = (props: Screen) => {
  return (
    <div className=" flex h-screen w-screen justify-center items-center">
      {props.children}
    </div>
  );
};

export default Screen;
