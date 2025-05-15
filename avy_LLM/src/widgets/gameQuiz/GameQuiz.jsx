import React, { useState } from "react";
import img from "../../assets/images/QuizGameImage.png";
import s from "./GameQuiz.module.css";
import ModalWindow from "../modalWindow/ModalWindow";
import GetRewards from "../funcRewardsGames/GetRewards";
import { useDispatch, useSelector } from "react-redux";
import { setLessonWindow } from "../../store/slice/userSlice";
import { completeLesson } from "../../store/slice/userActions";
import ChatBot from "../chatBot/ChatBot";

// const quizData = {
//   question: "The benefits of working with UI frameworks.",
//   rightAnswer: "Gateway to the future",
//   options: ["Basic Concepts", "hell", "divine"],
// };

function GameQuiz({ quizData,  }) {
  const { userToken } = useSelector(state => state.auth);

  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const { question, rightAnswer, options } = quizData;
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { currentProgress } = useSelector(state => state.user);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice(); // создаем копию массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleSubmitAnswer = (answer) => {
    if (answer === rightAnswer) {
      setIsCorrectAnswer(true);
      setOpenModal(true);
      setTimeout(() => {
          setOpenModal(false);
          //executeHandleAnswer();
          dispatch(setLessonWindow(false))
        }, 6000);
      executeHandleAnswer();
    } else {
      setIsCorrectAnswer(false);
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false);
      }, 6000);
    }
  };

  const executeHandleAnswer = () => {
    setTimeout(() => {
      setOpenModal(false);
      dispatch(setLessonWindow(false))
      dispatch(completeLesson({lessonId: currentProgress.nextLessonId, userToken: userToken}))
    }, 3000);
  }

  return (
    <div className={s.quizWrapper}>
      <ModalWindow isOpen={openModal} onClose={false}>
        {GetRewards(isCorrectAnswer ? 90 : 0)}
      </ModalWindow>
      <h3>Quiztime!</h3>
      <div className={s.quizContent}>
        <div className={s.mainContext}>
          <p className={s.questionText}>{question}</p>
          <div className={s.quizAnswers}>
            {options &&
              shuffleArray([...options, rightAnswer]).map((answer, index) => (
                <div
                  key={index}
                  className={s.answer}
                  onClick={() => handleSubmitAnswer(answer)}
                >
                  <p>{answer}</p>
                </div>
              ))}
          </div>
        </div>
        <div className={s.img}>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default GameQuiz;
