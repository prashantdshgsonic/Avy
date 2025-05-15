import React from "react";
import s from "./LandingJoin.module.css";
import joinImage from "../../assets/images/landingJoinImage.png";
import divider from "../../assets/images/dividerTop.png";
import { useNavigate } from "react-router-dom";
function LandingJoin() {
  const navigate = useNavigate()
  return (
    <div className={s.landingJoinWrapper}>
      <div className={s.landingJoinContainer}>
        <div className={s.joinText}>
          <h1>
            <span>Break free</span> from conventional learning
          </h1>
          <p>
            Redefine your learning experiences. Be part of the revolution! Sign
            up for our Game based learning experience platform and embrace a new
            era of education.
          </p>
          <button className={s.joinButton} onClick={() => navigate("register")}>
            Join the learning revolution!
          </button>
        </div>
        <div className={s.joinImg}>
          <img src={joinImage} alt="joinImage" />
        </div>
      </div>
      <img src={divider} alt="diverTop" className={s.divider} />
    </div>
  );
}

export default LandingJoin;
