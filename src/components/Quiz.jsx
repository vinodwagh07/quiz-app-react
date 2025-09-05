import { useState } from "react";
import { questions } from "../data/questions";

const Quiz = () => {
  const [isAnswerSelected, setAnswerSelected] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleNextQuestion() {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(null);
    setAnswerSelected(false);
  }

  function handleOptionClick(option) {
    setSelectedOption(option);
    setAnswerSelected(true);
  }

  // calculate progress percentage
  const progress = Math.min(
    ((currentQuestion + 1) / questions.length) * 100,
    100
  );

  if (currentQuestion >= questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-xl text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Quiz Completed 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your Score: <span className="font-bold">{score}</span> /{" "}
            {questions.length}
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      {/* Quiz Card */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-xl transform transition-transform duration-300">
        {/* Header */}
        <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-6 drop-shadow-md">
          Quiz App
        </h1>

        {/* Question */}
        <h2 className="text-lg leading-relaxed font-semibold text-gray-700 mb-6">
          {questions[currentQuestion].question}
        </h2>

        {/* Options */}
        <ul className="grid gap-4 mb-6">
          {questions[currentQuestion].options.map((option, idx) => (
            <li key={idx}>
              <button
                disabled={isAnswerSelected}
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left px-5 py-3 rounded-xl border 
  ${
    selectedOption === option
      ? option === questions[currentQuestion].answer
        ? "bg-green-500 text-white border-green-500"
        : "bg-red-500 text-white border-red-500"
      : "border-gray-300"
  }
  ${isAnswerSelected ? "cursor-not-allowed opacity-70" : ""}
  hover:bg-indigo-500 hover:text-white hover:border-indigo-500
  focus:outline-none focus:ring-4 focus:ring-indigo-300
  shadow-sm hover:shadow-md transition-all duration-300
  text-lg font-medium`}
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

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-3 bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 text-center mt-2">
            {`Question ${currentQuestion + 1} of ${questions.length}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
