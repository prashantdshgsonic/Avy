import React from "react";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import s from "./IconButton.module.css";

export default function IconButton({ icon, onClick }) {
  return (
    <button className={s.iconButton} onClick={onClick}>
      <img src={icon === "edit" ? editIcon : deleteIcon} alt="edit-button" />
    </button>
  );
}
