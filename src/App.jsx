import React, { useEffect, useState } from 'react';
import OptionRadio from './components/OptionRadio';
import axios from 'axios';
import QuizResultModal from './components/ResultModl';

const App = () => {
  const [question, setQuestion] = useState([]);
  const [questionState, setQuestionState] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [shuffledOption, setShuffledOption] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        setQuestion(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (question.length > 0) {
      const currentOptions = [...question[questionState].incorrectAnswers, question[questionState].correctAnswer];
      setShuffledOption(shuffleArray(currentOptions));
    }
  }, [question, questionState]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const rdm = Math.floor(Math.random() * (i + 1));
      [array[i], array[rdm]] = [array[rdm], array[i]];
    }
    return array;
  };

  const optionChange = (option) => {
    setSelectedOption(option);
    setShowNextBtn(true);
    // console.log(option);
    
  };

  const nextBtn = () => {
    const currentQuestion = question[questionState];
    // console.log(currentQuestion);

    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswer(correctAnswer + 1);
    } else {
      setWrongAnswer(wrongAnswer + 1);
    }

    if (questionState < 9) {
      setQuestionState(questionState + 1);
      setSelectedOption('');
      setShowNextBtn(false);
    } else {
      setShowModal(true);
    }
  };

  const handlePlayAgain = () => {
      // console.log('working');

    setCorrectAnswer(0);
    setWrongAnswer(0);
    setQuestionState(0);
    setSelectedOption('');
    setShowNextBtn(false);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6 h-props">
        <h1 className="text-2xl font-bold text-center mb-4">Quiz App</h1>

        {loading ? (
          <form>
            <div className="mb-6">
              <div className="h-6 bg-gray-300 animate-pulse mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-300 animate-pulse mb-2 w-full"></div>
              <div className="h-4 bg-gray-300 animate-pulse mb-2 w-full"></div>
              <div className="h-4 bg-gray-300 animate-pulse mb-2 w-full"></div>
              <div className="h-4 bg-gray-300 animate-pulse mb-2 w-full"></div>
            </div>
            <div className="flex justify-center">
              <div className="h-10 w-32 bg-gray-300 animate-pulse"></div>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-2">Q{questionState + 1}: {question[questionState].question.text}</h2>
              {shuffledOption.map((item, index) => (
                <OptionRadio
                  key={index}
                  label={item}
                  onChange={() => optionChange(item)}
                  checked={selectedOption === item}
                />
              ))}
            </div>

            {showNextBtn && questionState < 9 && (
              <div className="flex justify-center">
                <button className="btn btn-primary btn-wide" onClick={nextBtn}>
                  Next
                </button>
              </div>
            )}

            {showNextBtn && questionState === 9 && (
              <div className="flex justify-center">
                <button className="btn btn-primary btn-wide" onClick={nextBtn}>
                  Submit
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <QuizResultModal
        isOpen={showModal}
        correctAnswers={correctAnswer}
        wrongAnswers={wrongAnswer}
        totalQuestions={10}
        onClose={() => setShowModal(false)}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
};

export default App;
