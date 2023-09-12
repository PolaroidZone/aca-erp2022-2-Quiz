import React from "react";

type Question = {
  superhero: string;
  question: string;
  answers: Answer[];
};

type Answer = {
  text: string;
  correct: boolean;
};

type QuizProps = {
  superhero: string;
  questions: Question[];
  currentQuestion: number;
  handleAnswerClick: (correct: boolean) => void;
};

const Quiz: React.FC<QuizProps> = ({
  superhero,
  questions,
  currentQuestion,
  handleAnswerClick,
}) => {
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
      <h2>{questions[currentQuestion].question}</h2>
      <div className="quiz-options">
        <ul>
          {questions[currentQuestion].answers.map(
            (answer: Answer, index: number) => (
              <li key={index} onClick={() => handleAnswerClick(answer.correct)}>
                <div className="option">
                  <p>{answer.text}</p>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
