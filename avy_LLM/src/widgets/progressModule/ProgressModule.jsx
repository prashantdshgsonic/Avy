import React from "react";
import s from "./Progress.Module.module.css";
function ProgressModule({ totalLessons, currentLesson, title }) {
  const fillPercentage = (currentLesson / totalLessons) * 100;
  return (
    <div>
      <h4 className={s.progressModuleTitle}>{title}</h4>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="30"
        viewBox="0 0 400 30"
        fill="none"
      >
        <defs>
          <clipPath id="progressClip">
            <path d="M0 2C0 0.89543 0.89543 0 2 0H374C374.422 0 374.833 0.133501 375.175 0.381397L392.47 12.9347C393.549 13.7176 393.575 15.3165 392.522 16.1335L375.19 29.5802C374.84 29.8523 374.408 30 373.964 30H2C0.89543 30 0 29.1046 0 28V2Z" />
          </clipPath>
        </defs>
        <rect
          x="0"
          y="0"
          width={`${fillPercentage}%`}
          height="30"
          fill="#9EAAFA"
          clipPath="url(#progressClip)"
        />
        <path
          d="M0 2C0 0.89543 0.89543 0 2 0H374C374.422 0 374.833 0.133501 375.175 0.381397L392.47 12.9347C393.549 13.7176 393.575 15.3165 392.522 16.1335L375.19 29.5802C374.84 29.8523 374.408 30 373.964 30H2C0.89543 30 0 29.1046 0 28V2Z"
          stroke="#9EAAFA"
          strokeWidth="1.5"
          fill="none"
          width="400"
        />
      </svg>
    </div>
  );
}

export default ProgressModule;
