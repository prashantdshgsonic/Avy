import React from "react";
import s from "./RadioBtn.module.css"

export default function RadioBtn({ label, onChange, value, name }) {
  return (
    <div className={s.radioBtn}>
      <input type="radio" name={name} value={value} onChange={() => onChange()} />
      <p className={s.label}>{label}</p>
    </div>
  );
}
