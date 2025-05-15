import React from "react";
import s from "./ModuleInfo.module.css";
import ProgressCircle from "../progressCircle/ProgressCircle";

export default function ModuleInfo({ title, items }) {
  let userProgress;
  let allLessons = items.length
  let allCompletedLessons = items.filter(({isDone}) => isDone).length
  allCompletedLessons === 0 ? userProgress = 0 : userProgress = (allLessons/allCompletedLessons) * 100

  return (
    <div className={s.moduleInfoWrapper}>
      <div className={s.headersBlock}>
        <div className={s.titleBlock}>
          <h4>{title}</h4>
          <p>Lessons count: {items.length}</p>
        </div>
        <ProgressCircle radius={25} stroke={5} progress={userProgress} />
      </div>
      <div className={s.itemsBlock}>
        {items.map((lesson) => (
          <div key={lesson.id} className={s.lessonTile}>
            <span>{lesson.title}</span>
            {lesson.isDone && (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                    fill="#1C274C"
                  ></path>{" "}
                </g>
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
