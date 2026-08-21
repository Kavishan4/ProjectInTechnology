import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import './Quizzes.css';

const quizData = [
  {
    question: "What is the primary difference between A/L studies and University studies?",
    options: [
      "Universities require more rote memorization",
      "Universities expect a higher degree of independent, self-directed learning",
      "A/L studies have more complex concepts",
      "There is no difference"
    ],
    answer: 1
  },
  {
    question: "How many hours of independent study are generally recommended per hour of lecture?",
    options: [
      "0 hours (lectures are enough)",
      "1 hour",
      "2-3 hours",
      "6 hours"
    ],
    answer: 2
  },
  {
    question: "What is 'Plagiarism' in a university context?",
    options: [
      "Submitting an assignment late",
      "Working in groups",
      "Failing an examination",
      "Using someone else's work without proper citation"
    ],
    answer: 3
  }
];

const Quizzes = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="quizzes-page page-container">
      <div className="container">
        <div className="page-header animate-fade-in-up">
          <h1 className="page-title">University Readiness Assessment</h1>
          <p className="page-subtitle">Test your knowledge on university expectations and academic skills.</p>
        </div>

        <div className="quiz-container glass-card mx-auto">
          {showResults ? (
            <div className="results-screen animate-fade-in-up">
              <h2>Assessment Complete!</h2>
              <div className="score-circle">
                <span className="score-text">{score} / {quizData.length}</span>
              </div>
              <p className="results-message">
                {score === quizData.length 
                  ? "Outstanding! You are highly prepared for university life." 
                  : "Great effort! Review our Learning Hub materials to brush up on a few concepts."}
              </p>
              <button className="btn btn-primary mt-4" onClick={restartQuiz}>
                <RotateCcw size={18} /> Retake Quiz
              </button>
            </div>
          ) : (
            <div className="question-screen">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQuestion) / quizData.length) * 100}%` }}
                ></div>
              </div>
              <span className="question-counter">Question {currentQuestion + 1} of {quizData.length}</span>
              
              <h3 className="question-text">{quizData[currentQuestion].question}</h3>
              
              <div className="options-list">
                {quizData[currentQuestion].options.map((option, index) => {
                  let optionClass = "option-btn";
                  if (isAnswered) {
                    if (index === quizData[currentQuestion].answer) {
                      optionClass += " correct";
                    } else if (index === selectedOption) {
                      optionClass += " incorrect";
                    } else {
                      optionClass += " disabled";
                    }
                  } else if (selectedOption === index) {
                    optionClass += " selected";
                  }

                  return (
                    <button 
                      key={index} 
                      className={optionClass}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-content">{option}</span>
                      {isAnswered && index === quizData[currentQuestion].answer && <CheckCircle size={20} className="result-icon correct-icon" />}
                      {isAnswered && index === selectedOption && index !== quizData[currentQuestion].answer && <XCircle size={20} className="result-icon incorrect-icon" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="quiz-footer animate-fade-in-up">
                  <button className="btn btn-primary ml-auto" onClick={handleNext}>
                    {currentQuestion + 1 === quizData.length ? 'See Results' : 'Next Question'} <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
