import React from "react";
import s from "./CustomInput.module.css"

function CustomInput({type, value, onChange, style, placeholder, srcIcon, id, isDisabled}) {
  const inputStyle = {
    ...style,
  };
  return (
    <>
      {srcIcon && <img src={srcIcon} alt="icon"></img>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={inputStyle}
        placeholder={placeholder}
        id={id}
        disabled={isDisabled}
        className={s.customInput}
      />
    </>
  );
}

export default CustomInput;
