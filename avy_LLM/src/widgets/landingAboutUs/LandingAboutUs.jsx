import React from "react";
import s from "./LandingAboutUs.module.css";
import gamePadIcon from "../../assets/icons/gamePadIcon.svg";
import bookIcon from "../../assets/icons/bookIcon.svg";
import rewardIcon from "../../assets/icons/rewardsLandingIcon.svg";
import aboutUsImage from "../../assets/images/AboutUsImage.png";

function LandingAboutUs() {
  const card = ({ icon, h3, p, key }) => {
    return (
      <div key={key} className={s.aboutUsCard}>
        <img src={icon} alt={icon} />
        <h3>{h3}</h3>
        <p>{p}</p>
      </div>
    );
  };
  const array = [
    {
      icon: gamePadIcon,
      h3: "Gamification elements",
      p: "Using behavioural psychology to improve engagement and the impact on improved course completions.",
    },
    {
      icon: bookIcon,
      h3: "Engagement",
      p: "Games are inherently engaging and can capture the attention of your learners. Our games will make learning more enjoyable and motivate your students or employees to actively participate in the educational process.",
    },
    {
      icon: rewardIcon,
      h3: "Rewards system",
      p: "Our unique rewards system is designed for progressive motivation and completion giving return on investment for companies and positive enforcement for users. It then connects into our marketplace for redemptions.",
    },
  ];
  return (
    <div className={s.aboutUsWrapper}>
      <div className={s.aboutUsContainer}>
        <div className={s.aboutUsInfo}>
          <img src={aboutUsImage} alt="aboutUsImage" />
          <div className={s.aboutUsText}>
            <h3>About us</h3>
            <p>
              Founded in 2022, a start up in Australia with a dream to change
              the education game, a new way of learning. We set out to research
              the gaps in the traditional digital curriculum and produce a style
              that engages audiences and users. Here we are, our utility
              creation has arrived and is exciting, and will improve course
              completion rates <span>from 5% to 85% saving</span> enterprise
              companies lots of time and money.
            </p>
          </div>
        </div>
        <div className={s.aboutUsCards}>
          {array.map((elem, index) => card({ ...elem, key: index }))}
        </div>
      </div>
    </div>
  );
}

export default LandingAboutUs;
