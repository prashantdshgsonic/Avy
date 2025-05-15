import React from "react";
import s from "./MiniProfileWidget.module.css";
import coin from '../../assets/icons/coinIcon.svg';
import reward from "../../assets/icons/rewardsIcon.svg"
import { useNavigate } from "react-router-dom";
function MiniProfileWidget({ userName, userAvatar, coins, rewards }) {
  const navigation = useNavigate()
  return (
    <div className={s.miniProfile}>
      <div className={s.userInfo}>
        <img
          src={userAvatar}
          alt="userAvatar"
          onClick={() => navigation("/profile")}
        />
        <h1 onClick={() => navigation("/profile")}>{userName}</h1>
      </div>
      <div className={s.userRewards}>
        <img src={coin} alt="" />
        <p>{coins}</p>
        <img src={reward} alt="" />
        <p>{rewards}</p>
      </div>
    </div>
  );
}

export default MiniProfileWidget;
