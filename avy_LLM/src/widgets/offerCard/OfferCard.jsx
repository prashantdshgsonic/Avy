import React from "react";
import CustomButton from "../../ui/customButton/CustomButton";
import s from "./OfferCard.module.css";
import { useSelector } from "react-redux";

export default function OfferCard({ id, image, title, category, price }) {
  // TODO add fuction to start button of course
  const { userInfo } = useSelector(state => state.user);
  const handleOnClick = function () {
    if (userInfo.coins < price) {
      alert("You have not enough coins")
    } else {
      alert("You can redeem now!")
    }

  };

  return (
    <div className={s.offerCard}>
      <img className={s.image} src={image} alt="offer-card" />
      <p className={s.category}>{category}</p>
      <p className={s.title}>{title}</p>
      <p>{price}</p>
      <CustomButton text={"Redeem now"} onClick={handleOnClick} />
    </div>
  );
}
