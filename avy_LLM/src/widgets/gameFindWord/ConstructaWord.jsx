import React, { useState } from "react";
import s from "./ConstructaWord.module.css";
import SearchMan from "../../assets/images/SearchMan.png";
import DeleteButton from "../../ui/deleteButton/DeleteButton";
import HelpButton from "../../ui/helpIcon/HelpGameButton";
import ModalWindow from "../modalWindow/ModalWindow";
import GetRewards from "../funcRewardsGames/GetRewards";
import { useDispatch, useSelector } from "react-redux";
import { completeLesson } from "../../store/slice/userActions";
import { setLessonWindow } from "../../store/slice/userSlice";
const ConstructaWord = ({ quizData }) => {
  let showRewards = false;
  const { currentProgress } = useSelector(state => state.user);
  const { userToken } = useSelector(state => state.auth);
   const dispatch = useDispatch();
  const initialWords = quizData;
  const [wrongInput, setWrongInput] = useState(false);
  const getUniqueLetters = (words) => {
    const uniqueLetters = new Set();
    words.forEach((word) => {
      const letters = word.split("");
      letters.forEach((letter) => {
        uniqueLetters.add(letter.toUpperCase());
      });
    });
    return Array.from(uniqueLetters);
  };

  const uniqueLetters = getUniqueLetters(initialWords);

  const shuffleLetters = (arr) => {
    const shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  };
  const [doneWords, setDoneWords] = useState([]);
  const [buttons, setButtons] = useState(shuffleLetters(uniqueLetters));
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [selectedLettersHelp, setSelectedLettersHelp] = useState([]);
  const [quantityLetters, setQuantityLetters] = useState(null);

  const handleButtonClick = (letter) => {
    setSelectedLetters([...selectedLetters, letter]);
  };

  const checkWord = () => {
    const submittedWord = selectedLetters.join("").toUpperCase();

    if (!doneWords.includes(submittedWord)) {
      const isWordGuessed = initialWords.some(
        (word) => word.toUpperCase() === submittedWord
      );

      if (isWordGuessed) {
        setDoneWords((prevDoneWords) => [...prevDoneWords, submittedWord]);
        setSelectedLetters([]);
        setSelectedLettersHelp([]);
        setQuantityLetters(null);
      } else {
        setWrongInput(true);
        setTimeout(() => {
          setWrongInput(false);
          setSelectedLetters([]);
        }, 1000);
      }
    } else {
      setSelectedLetters(["That word has already been guessed"]);
      setTimeout(() => {
        setSelectedLetters([]);
      }, 4000);
    }
  };

  const deleteLetter = () => {
    const newSelectedLetters = selectedLetters.slice(0, -1);
    setSelectedLetters(newSelectedLetters);
  };

  const helpFunc = () => {
    setSelectedLetters([]);
    const notDoneWords = initialWords.filter(
      (word) => !doneWords.includes(word.toUpperCase())
    );
    const wordForHelp = notDoneWords[0];
    setQuantityLetters(wordForHelp.length);
    setSelectedLettersHelp((prevSelectedLetters) => [
      ...prevSelectedLetters,
      wordForHelp.charAt(prevSelectedLetters.length).toUpperCase(),
    ]);
  };
  const percentage = (doneWords.length * 100) / initialWords.length;

  const [pressed, setPressed] = useState(false);
  const resetData = () => {
    setSelectedLetters([]);
    setSelectedLettersHelp([]);
    setQuantityLetters(null);
    setDoneWords([]);
  };

  const onSubmitClick = () => {
    if (doneWords.length === initialWords.length) {
      showRewards = true;
// When game finished
  dispatch(completeLesson({lessonId: currentProgress.nextLessonId, userToken: userToken}))
  dispatch(setLessonWindow(false))
    }
  }

  const showModalReward = () => {
    setPressed(false);
    resetData();
    setTimeout(() => {}, 3000)
  }
  return (
    <div className={s.gameWrapper}>
      {pressed && (
        <ModalWindow
          isOpen={true}
          onClose={() => {
            setPressed(false);
            resetData();
          }}
        >
          {GetRewards(percentage)}
        </ModalWindow>
      )}
      <h2>
        Find main terminology from the lesson
        <span>
          {doneWords.length}/{initialWords.length}
        </span>
      </h2>
      <div className={s.gameContainer}>
        <div className={s.searchMan}>
          <img src={SearchMan} alt="searchManIcon" />
        </div>
        <div className={s.gamePanel}>
          <div className={s.lettersInput}>
            <HelpButton onClick={helpFunc}></HelpButton>
            <p className={`${wrongInput ? `${s.wrongWord}` : ""}`}>
              {selectedLetters.map((letter) => letter)}
            </p>
            <DeleteButton onClick={deleteLetter}></DeleteButton>
          </div>
          <div className={s.lettersBtn}>
            {buttons.map((letter, index) => (
              <button key={index} onClick={() => handleButtonClick(letter)}>
                {letter}
              </button>
            ))}
          </div>
          <div className={s.submitButtons}>
            <button onClick={() => checkWord()} className={s.enterBtn}>
              Enter
            </button>
            <button
              onClick={() => setButtons(shuffleLetters(uniqueLetters))}
              className={s.shuffleBtn}
            >
              Shuffle &#128256;
            </button>
          </div>

          <div className={s.listAnswers}>
            {doneWords.map((li, index) => (
              <button key={index} className={s.doneWordBtn}>
                {li}
              </button>
            ))}
          </div>
          {quantityLetters && (
            <p>
              This word has {quantityLetters} letters <br /> it starts with:
              {selectedLettersHelp}
            </p>
          )}
          <button className={s.submit} onClick={onSubmitClick}>
            Submit
          </button>
          {pressed && (
            <ModalWindow
              isOpen={true}
              onClose={showModalReward}
            >
              {GetRewards(percentage)}
            </ModalWindow>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstructaWord;
