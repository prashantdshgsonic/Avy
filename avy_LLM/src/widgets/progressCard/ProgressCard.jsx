import React from "react";
import s from "./ProgressCard.module.css";
import ProgressBar from "../../ui/progressBar/ProgressBar";
import { useSelector } from "react-redux";
import ProgressModule from "../progressModule/ProgressModule";
import finish from "../../assets/icons/finish.svg";
const mockData = {
  id: 6,
  userId: 3,
  courseId: 2,
  progress: 0,
  status: "IN_PROGRESS",
  lastAccessed: "2024-01-03",
  moduleProgress: 0,
  currentModuleTitle: " Other Tools for Career Development Specialization",
  nextLessonTitle: "Quiz",
  nextLessonId: 2,
};

export default function ProgressCard() {
  const { currentProgress } = useSelector((state) => state.user);
  return (
    <div>
      <h3>Welcome!</h3>

      <div className={s.progresses}>
        <div className={s.progressModule}>
          <ProgressModule
            title={`Module Progress: ${currentProgress.currentModuleTitle}`}
            totalLessons={100}
            currentLesson={currentProgress.moduleProgress}
          ></ProgressModule>
          <img src={finish} alt="finish" />
        </div>
        <div className={s.progressModule}>
          <ProgressBar
            title={"Course Progress"}
            fillPersentage={currentProgress.progress}
          />
          <img src={finish} alt="finish" />
        </div>
      </div>
      <p>Next Task: {currentProgress.nextLessonTitle}</p>
    </div>
  );
}
