import { useEffect, useState } from "react";
import { questions } from "../data/questions";

const Quiz = () => {
  const [isAnswerSelected, setAnswerSelected] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setTimeLeft(30);

    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      handleNextQuestion();
    }, 30000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [currentQuestion]);

  function handleNextQuestion() {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(null);
    setAnswerSelected(false);
    setTimeLeft(30);
  }

  function handleOptionClick(option) {
    setSelectedOption(option);
    setAnswerSelected(true);
  }

  const progress = Math.min(((currentQuestion + 1) / questions.length) * 100, 100);

  if (currentQuestion >= questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Quiz Completed!
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Your Score: <span className="font-bold">{score}</span> / {questions.length}
          </p>
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setAnswerSelected(false);
              setSelectedOption(null);
            }}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  // --- Small Circular Timer ---
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 30) * circumference;
  const timerColor = timeLeft <= 5 ? "text-red-500" : "text-indigo-600";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-xl transform transition-transform duration-300 relative">
        
        {/* Floating Timer Top-Right */}
        <div className="absolute top-4 right-4">
          <svg width="60" height="60">
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="5"
              fill="none"
            />
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke={timeLeft <= 5 ? "#f87171" : "#4f46e5"}
              strokeWidth="5"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 30 30)"
              style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className={`font-bold text-xs ${timerColor}`}
            >
              {timeLeft}s
            </text>
          </svg>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 drop-shadow-md">Quiz App</h1>
          {/* <span className="text-gray-700 font-semibold">{currentQuestion + 1}/{questions.length}</span> */}
        </div>

        {/* Question */}
        <h2 className="text-lg font-semibold text-gray-700 mb-6">
          {questions[currentQuestion].question}
        </h2>

        {/* Options */}
        <ul className="grid gap-4 mb-6">
          {questions[currentQuestion].options.map((option, idx) => (
            <li key={idx}>
              <button
                disabled={isAnswerSelected}
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left px-5 py-3 rounded-xl border font-medium text-lg
                  transition-all duration-300 shadow-sm hover:shadow-md
                  ${
                    selectedOption === option
                      ? option === questions[currentQuestion].answer
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-red-500 text-white border-red-500"
                      : "bg-white border-gray-300 hover:bg-indigo-500 hover:text-white hover:border-indigo-500"
                  }
                  ${isAnswerSelected ? "cursor-not-allowed opacity-80" : "cursor-pointer"}
                `}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>

        {/* Next Button */}
        <button
          className={`w-full text-white font-bold px-5 py-3 rounded-xl shadow-lg transition transform mb-4
            ${
              isAnswerSelected
                ? "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          disabled={!isAnswerSelected}
          onClick={handleNextQuestion}
        >
          Next
        </button>

        {/* Bottom Progress Bar */}
        <div className="mt-4">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-3 bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
