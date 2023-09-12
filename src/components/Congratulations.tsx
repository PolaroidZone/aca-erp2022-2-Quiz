import React from "react";

interface CongratulationsProps {
  score: number;
  totalQuestions: number;
  superhero: string;
}

const Congratulations: React.FC<CongratulationsProps> = ({
  score,
  totalQuestions,
  superhero,
}) => {
  const percentageScore = (score / totalQuestions) * 100;
  let message;

  if (percentageScore === 100) {
    message =
      "Congratulations! You answered all questions correctly. Perfect score!";
  } else if (percentageScore >= 75) {
    message = "Congratulations! You did a great job!";
  } else if (percentageScore >= 50) {
    message = "Congratulations! You passed the quiz!";
  } else {
    message = "Good effort! Keep practicing to improve your score!";
  }

  return (
    <div className="quiz-question">
      <div className="hero-name">
        <div className="heroname-container">
          <h1 className="hero-name-main">{superhero}</h1>
        </div>
        <div className="hero-name-botton">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
      </div>
      <h2>{message}</h2>
      <p className="result-score">
        Your score: {score}/{totalQuestions}
      </p>
    </div>
  );
};

export default Congratulations;
