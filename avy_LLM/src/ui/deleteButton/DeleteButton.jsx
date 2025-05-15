import React from "react";
import deleteIcon from "../../assets/icons/deleteGameIcon.svg";
import s from './DeleteButton.module.css'
function DeleteButton({onClick}) {
  return (
    <div className={s.deleteGameIcon} onClick={onClick}>
      <img src={deleteIcon} alt="" />
    </div>
  );
}

export default DeleteButton;
