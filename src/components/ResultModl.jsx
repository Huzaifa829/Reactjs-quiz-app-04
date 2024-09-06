import React from 'react';

const QuizResultModal = (props) => {
    const {
        isOpen,
        correctAnswers,
        wrongAnswers,
        totalQuestions,
        onClose,
        onPlayAgain
    } = props

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <>
            <dialog id="my_modal_5" className={`modal modal-bottom sm:modal-middle ${isOpen ? 'modal-open' : ''}`}>
                <div className="modal-box h-props">
                    <h3 className="font-bold text-lg text-center h-props">Quiz Results</h3>

                    <div className="flex justify-center my-4 h-props">
                        <div className="radial-progress" style={{ "--value": percentage, "--size": "12rem", "--thickness": "8px" }}>
                            {percentage}%
                        </div>
                    </div>

                    <div className="text-center my-4 h-props">
                        <p><strong>Correct Answers:</strong> {correctAnswers}</p>
                        <p><strong>Wrong Answers:</strong> {wrongAnswers}</p>
                        <p><strong>Total Questions:</strong> {totalQuestions}</p>
                    </div>

                    <div className="modal-action justify-center">
                        <button className="btn" onClick={onClose}>Close</button>
                        <button className="btn btn-primary" onClick={onPlayAgain}>Play Again</button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default QuizResultModal;

