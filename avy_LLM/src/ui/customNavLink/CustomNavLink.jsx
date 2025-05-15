import React from "react";
import { NavLink } from "react-router-dom";
import style from "./CustomNavLink.module.css";
function CustomNavLink({ link, icon, title}) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => (isActive ? style.active : style.navLink)}
    >
      {icon && (
        <img src={icon} alt="icon"/>
      )}
      {title}
    </NavLink>
  );
}

export default CustomNavLink;
