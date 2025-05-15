import React from "react";
import s from "./LandingNavBar.module.css";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
function LandingNavBar() {
  const navigate = useNavigate();

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
    <header className={s.navWrapper}>
      <div className={s.navContainer}>
        <div className={s.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={s.landingLinks}>
          <ul>
            <li>
              <button onClick={() => scrollToSection("about")}>About</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("pricing")}>Pricing</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("demo")}>Demo</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contact")}>Contact</button>
            </li>
          </ul>
        </div>
        <div className={s.landingButtons}>
          <button
            className={s.landingButtonV1}
            onClick={() => navigate("login")}
          >
            Log in
          </button>
          {/* <button
            className={s.landingButtonV2}
            onClick={() => navigate("register")}
          >
            Sign up
          </button> */}
        </div>
      </div>
    </header>
  );
}

export default LandingNavBar;
