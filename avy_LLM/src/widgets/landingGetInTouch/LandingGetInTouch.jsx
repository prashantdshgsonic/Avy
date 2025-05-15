import React from "react";
import s from "./LandingGetInTouch.module.css";
import location from "../../assets/icons/locationIcon.svg";
import phone from "../../assets/icons/phoneIcon.svg";
import email from "../../assets/icons/landingEmailIcon.svg";
function LandingGetInTouch() {
  const array = [
    {
      icon: location,
      title: "Address",
      paragraph: "Tao Circuit Greenvale 3059 Victoria, Australia",
    },
    {
      icon: phone,
      title: "Phone",
      paragraph: "+61452 246 202",
    },
    {
      icon: email,
      title: "Email",
      paragraph: "contact@theavyproject.io",
    },
  ];
  const card = ({ icon, title, paragraph, key }) => {
    return (
      <div className={s.getInTouchCard} key={key}>
        <img src={icon} alt="icon" />
        <h3>{title}</h3>
        <p>{paragraph}</p>
      </div>
    );
  };
  return (
    <div className={s.getInTouchWrapper}>
      <div className={s.getInTouchContainer}>
        <h2>Get in touch</h2>
        <p>Let us know know about your requirements</p>
        <div className={s.getInTouchCards}>
          {array.map((elem, index) => card({ ...elem, key: index }))}
        </div>
      </div>
    </div>
  );
}

export default LandingGetInTouch;
