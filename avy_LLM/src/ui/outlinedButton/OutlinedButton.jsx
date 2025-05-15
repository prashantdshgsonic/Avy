import React from "react";
import s from "./OutlinedButton.module.css"

function OutlinedButton({ label, onClick, icon, isDisabled, type }) {
  return (
    <button 
    type={type} 
    onClick={onClick} 
    disabled={isDisabled} 
    className={isDisabled ? s.disabledButton : s.outlinedButton}>
      {label}
      {icon && <span><img src={icon} alt="icon" /></span>}
    </button>
  );
}

export default OutlinedButton;
