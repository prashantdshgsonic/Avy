import React from "react";
import s from "./ProgressBar.module.css";

export default function ProgressBar({ title, fillPersentage }) {
  return (
    <div className={s.progressBarWrapper}>
      <p>{title}</p>
      <div className={s.progressBar}>
        <div style={{ width: `${fillPersentage}%` }}>
          {fillPersentage} 
        </div>
      </div>
    </div>
  );
}
