import React from "react";
import star from "../../assets/icons/star.svg";
import emptyStar from "../../assets/icons/emptyStar.svg";
import s from "./GetRewards.module.css";
function GetRewards( percentage ) {
  let rewardsToGet = null;
  if (percentage >= 75) {
    rewardsToGet = (
      <div className={s.stars}>
        <img src={star} alt="star" />
        <img src={star} alt="star" />
        <img src={star} alt="star" />
      </div>
    );
  } else if (percentage >= 34) {
    rewardsToGet = (
      <div className={s.stars}>
        <img src={star} alt="star" />
        <img src={star} alt="star" />
        <img src={emptyStar} alt="star" />
      </div>
    );
  } else if (percentage >= 1 && percentage < 34) {
    rewardsToGet = (
      <div className={s.stars}>
        <img src={star} alt="star" />
        <img src={emptyStar} alt="star" />
        <img src={emptyStar} alt="star" />
      </div>
    );
  } else {
    rewardsToGet = (
      <div className={s.stars}>
        <img src={emptyStar} alt="star" />
        <img src={emptyStar} alt="star" />
        <img src={emptyStar} alt="star" />
      </div>
    );
  }
  return (
    <>
      {rewardsToGet}
      <div className={s.text}>
        {percentage===0 ? <h2>Level failed </h2>:<h2>Level completed</h2>}
        <p>
          Reward: <span>100</span> coins
        </p>
      </div>
      <button></button>
    </>
  );
}

export default GetRewards;
