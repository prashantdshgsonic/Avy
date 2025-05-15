import React from "react";
import s from "./Indicator.module.css";

function Indicator({ placeholder, value, colorVariable, onClick }) {
  return (
    <div className={s.indicatorWrapper} onClick={onClick}>
      <h2 className={s[`${colorVariable}`]}>{value}</h2>
      <p className={s.placeholder}>{placeholder}</p>
    </div>
  );
}

export default Indicator;
