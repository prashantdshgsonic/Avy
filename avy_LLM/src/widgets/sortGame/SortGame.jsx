import React, { useState } from "react";
import sortImage from "../../assets/images/SortGameImg.png";
import s from "./SortGame.module.css";
import ModalWindow from "../modalWindow/ModalWindow";
import GetRewards from "../funcRewardsGames/GetRewards";
import { useDispatch, useSelector } from "react-redux";
import { completeLesson } from "../../store/slice/userActions";
import { setLessonWindow } from "../../store/slice/userSlice";

const quizData = {
  conceptA: "python",
  conceptB: "javascript",
  optionA: ["snake", "def", "pycharm", "tabulation", "data science"],
  optionB: ["event loop", "scopes", "undefined", "log", "js"],
};

const SortGame = ({ quizData }) => {
  const { conceptA, conceptB, optionA, optionB } = quizData;
  const { currentProgress } = useSelector((state) => state.user);
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const shuffleArray = (array) =>
    array.map((item) => ({ ...item })).sort(() => Math.random() - 0.5);

  const [buttons, setButtons] = useState(
    shuffleArray([
      ...optionA.map((name, index) => ({
        id: `A${index}`,
        text: name,
        concept: "A",
      })),
      ...optionB.map((name, index) => ({
        id: `B${index}`,
        text: name,
        concept: "B",
      })),
    ])
  );

  const [containersA, setContainersA] = useState(
    Array(optionA.length).fill(null)
  );
  const [containersB, setContainersB] = useState(
    Array(optionB.length).fill(null)
  );
  const [addedButtons, setAddedButtons] = useState([]);
  const [totalAttempts, setTotalAttempts] = useState(1);

  const handleDragStart = (event, button) => {
    event.dataTransfer.setData("text/plain", button.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, concept, index) => {
    event.preventDefault();
    const draggedButtonId = event.dataTransfer.getData("text/plain");
    const draggedButton = buttons.find(
      (button) => button.id === draggedButtonId
    );

    if (
      draggedButton &&
      !containersA.includes(draggedButton) &&
      !containersB.includes(draggedButton)
    ) {
      const newContainers = [...(concept === "A" ? containersA : containersB)];
      newContainers[index] = draggedButton;
      concept === "A"
        ? setContainersA(newContainers)
        : setContainersB(newContainers);

      setAddedButtons((prevButtons) => [...prevButtons, draggedButtonId]);
    }
  };

  const handleContainerClick = (concept, id) => {
    if (concept === "A") {
      setContainersA((prevContainers) =>
        prevContainers.map((container) =>
          container && container.id === id ? null : container
        )
      );
    } else {
      setContainersB((prevContainers) =>
        prevContainers.map((container) =>
          container && container.id === id ? null : container
        )
      );
    }

    setAddedButtons((prevButtons) =>
      prevButtons.filter((buttonId) => buttonId !== id)
    );
  };
  const percentage = (1 * 100) / totalAttempts;
  const [finishedGame, setFinishedGame] = useState(false);
  const handleSubmit = () => {
    const submittedOptionA = containersA
      .filter((container) => container)
      .map((container) => container.text)
      .filter(Boolean);
    const submittedOptionB = containersB
      .filter((container) => container)
      .map((container) => container.text)
      .filter(Boolean);

    const isOptionACorrect =
      submittedOptionA.length === optionA.length &&
      submittedOptionA.every((word) => optionA.includes(word));

    const isOptionBCorrect =
      submittedOptionB.length === optionB.length &&
      submittedOptionB.every((word) => optionB.includes(word));

    if (isOptionACorrect && isOptionBCorrect) {
      setFinishedGame(true);
      dispatch(
        completeLesson({
          lessonId: currentProgress.nextLessonId,
          userToken: userToken,
        })
      );
      dispatch(setLessonWindow(false));
      setContainersA(Array(optionA.length).fill(null));
      setContainersB(Array(optionA.length).fill(null));
    } else {
      setTotalAttempts(totalAttempts + 1);

      const incorrectAnswersA = containersA.filter(
        (container) => container && container.concept === "B"
      );

      const incorrectAnswersB = containersB.filter(
        (container) => container && container.concept === "A"
      );

      incorrectAnswersA.forEach((container) => {
        handleContainerClick("A", container.id);
      });

      incorrectAnswersB.forEach((container) => {
        handleContainerClick("B", container.id);
      });
    }
  };

  return (
    <div className={s.gameContainer}>
      <h4 className={s.gameTitle}>
        Drag the definitions to the groups they belong to
      </h4>
      <div className={s.gameContent}>
        <div className={s.buttonsContainer}>
          {buttons
            .filter(
              (button) =>
                !addedButtons.includes(button.id) ||
                (containersA.every(
                  (container) => container?.id !== button.id
                ) &&
                  containersB.every((container) => container?.id !== button.id))
            )
            .map((button) => (
              <div
                key={button.id}
                className={s.button}
                draggable
                onDragStart={(event) => handleDragStart(event, button)}
              >
                {button.text}
              </div>
            ))}
        </div>
        <div className={s.dropContainers}>
          <div>
            <p>{conceptA}:</p>
            <div className={s.conceptA}>
              {containersA.map((container, index) => (
                <div
                  key={index}
                  className={
                    container
                      ? `${s.dropContainerActive}`
                      : `${s.dropContainer}`
                  }
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, "A", index)}
                  onClick={() =>
                    container && handleContainerClick("A", container.id)
                  }
                >
                  {container ? container.text : "Drop here"}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p>{conceptB}:</p>
            <div className={s.conceptB}>
              {containersB.map((container, index) => (
                <div
                  key={index}
                  className={
                    container
                      ? `${s.dropContainerActive}`
                      : `${s.dropContainer}`
                  }
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, "B", index)}
                  onClick={() =>
                    container && handleContainerClick("B", container.id)
                  }
                >
                  {container ? container.text : "Drop here"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={s.img}>
        <img src={sortImage} alt="" />
      </div>
      <button
        className={s.buttonSubmit}
        onClick={handleSubmit}
        disabled={!containersA.every(Boolean) || !containersB.every(Boolean)}
      >
        Submit
      </button>
      {finishedGame && (
        <ModalWindow isOpen={true} onClose={() => setFinishedGame(false)}>
          {GetRewards(percentage)}
        </ModalWindow>
      )}
    </div>
  );
};

export default SortGame;
