import React from "react";
import s from "./LandingFooter.module.css";
import logo from "../../assets/images/logo.svg";
import facebook from "../../assets/icons/facebookBgIcon.svg";
import twitter from "../../assets/icons/twitterBgIcon.svg";
import linkedIn from "../../assets/icons/linkedInBgIcon.svg";
function LandingFooter() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start", // или "center" или "end"
        inline: "nearest", // или "start" или "end"
        duration: 2500, // Продолжительность в миллисекундах
      });
    }
  };

  return (
    <footer className={s.landingFooterWrapper}>
      <div className={s.landingFooterContainer}>
        <img src={logo} alt="logo" className={s.logo} />
        <div className={s.footerLinks}>
          <h3>Site Map</h3>
          <button
            onClick={() => scrollToSection("about")}
            className={s.btnLinks}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className={s.btnLinks}
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("demo")}
            className={s.btnLinks}
          >
            Demo
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={s.btnLinks}
          >
            Contact
          </button>
        </div>
        <div className={s.footerLinks}>
          <h3>Useful links</h3>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Help</a>
        </div>
        <div className={s.footerLinksIcons}>
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
      </div>
    </footer>
  );
}

export default LandingFooter;
