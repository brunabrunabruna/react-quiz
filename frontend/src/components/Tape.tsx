import pinkTape from "../assets/img/pinkTape.png";

const Tape = (props: {
  totalQuestionsCount: number;
  currentQuestionIndex: number;
}) => {
  return (
    /* tape and questions count */
    <div
      className="absolute w-48 -top-5 mx-auto inset-x-0 
         sm:w-60 sm:-top-10 sm:-right-8 sm:left-auto
         sm:rotate-[28deg]"
    >
      {/* tape img */}
      <img src={pinkTape} className="-rotate-[28deg]" />
      {/* question count */}
      <p
        className="absolute top-16 right-8 
              sm:text-2xl sm:top-20 sm:right-6
             "
      >
        Question {props.currentQuestionIndex + 1}/{props.totalQuestionsCount}
      </p>
    </div>
  );
};

export default Tape;
