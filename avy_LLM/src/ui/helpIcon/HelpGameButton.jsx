import React from "react";
import helpIcon from "../../assets/icons/helpIcon.svg";
import s from './HelpButton.module.css'
function HelpGameButton({ onClick }) {
  return (
    <div onClick={onClick} className={s.helpGameButton}>
      <p className={s.textRules}>
        When you click on this button, you will lose<span> one coin </span>, but
        in return you will get <span> one letter </span> for a word you haven't
        guessed yet.
      </p>
      <img src={helpIcon} alt="" />
    </div>
  );
}

export default HelpGameButton;
