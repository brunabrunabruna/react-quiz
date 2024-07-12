// definition of the Question type (for typescript), obj received from the api
export type QuestionData = {
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
};

export type Player = {
  username: string;
  score: number;
};
