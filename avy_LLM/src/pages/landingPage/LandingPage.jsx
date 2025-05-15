import React from "react";
import s from "./LandingPage.module.css";
import facebook from "../../assets/icons/facebookIcon.svg";
import twitter from "../../assets/icons/twitterIcon.svg";
import linkedIn from "../../assets/icons/linkedInIcon.svg";
import LandingNavBar from "../../widgets/landingNabBar/LandingNavBar";
import LandingJoin from "../../widgets/landingJoin/LandingJoin";
import LandingAboutUs from "../../widgets/landingAboutUs/LandingAboutUs";
import LandingPricing from "../../widgets/landingPricing/LandingPricing";
import LandingGetInTouch from "../../widgets/landingGetInTouch/LandingGetInTouch";
import LandingForm from "../../widgets/landingForm/LandingForm";
import LandingFooter from "../../widgets/landingFooter/LandingFooter";

function LandingPage() {
  return (
    <div className={s.landingPageWrapper}>
      <div className={s.socialMediaLinks}>
        <a
          href="https://www.facebook.com/profile.php?id=100076930052424"
          target="blank"
        >
          <img src={facebook} alt="facebook" />
        </a>
        <a href="https://twitter.com/The_Avy_project " target="blank">
          <img src={twitter} alt="twitter" />
        </a>
        <a
          href="https://www.linkedin.com/company/76220779/admin/feed/posts/"
          target="blank"
        >
          <img src={linkedIn} alt="linkedIn" />
        </a>
      </div>
      <LandingNavBar></LandingNavBar>
      <LandingJoin></LandingJoin>
      <div className={s.joinEllipse1}></div>
      <div className={s.joinEllipse2}></div>
      <div id="about">
        <LandingAboutUs></LandingAboutUs>
      </div>
      <div id="pricing">
        <LandingPricing></LandingPricing>
      </div>
      <div id="contact">
        <LandingGetInTouch></LandingGetInTouch>
      </div>
      <div id="demo">
        <LandingForm></LandingForm>
      </div>
      <LandingFooter></LandingFooter>
      <p className={s.privacyText}>© All rights reserved</p>
    </div>
  );
}

export default LandingPage;
