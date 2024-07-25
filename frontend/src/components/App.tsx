import React from "react";
import "./App.css";
import Questions from "./Questions";
import stars from "../assets/img/stars.png";

function App() {
  return (
    <>
      {/* png elements */}
      <div className="absolute z-30 ">
        <img
          src={stars}
          className="absolute top-32 left-2 max-w-72 rotate-12"
        />
        <img
          src={stars}
          className="absolute top-0 right-2 max-w-72 rotate-45"
        />
      </div>

      <Questions />
    </>
  );
}

export default App;
