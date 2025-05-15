import React from "react";
import s from './CustomCheckbox.module.css'
function CustomCheckbox({
  text,
  checked,
  onChange,
  restProps,
  value
}) {
  return (
    <div className={s.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...restProps}
        className={s.inputBox}
        value={value}
      />
      <span className={s.text}>{text}</span>
    </div>
  );
}

export default CustomCheckbox;
