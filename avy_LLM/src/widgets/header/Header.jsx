import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./Header.module.css";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar_test.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/authSlice";

function Header() {
  const navigation = useNavigate();
  const { userToken } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout())
    window.location.replace("/")
  }
  return (
    <div className={s.header}>
      <img
        src={logo}
        alt="logo"
        id="logo"
        onClick={() => userToken ? navigation("/dashboard") : navigation("/")}
      />

      <div className={s.profile}>
        <img
          src={
            userInfo.linkToImage
              ? process.env.REACT_APP_MEDIA_SERVER_URL + userInfo.linkToImage
              : avatar
          }
          alt="avatar"
          onClick={() => navigation("/profile")}
        />
        <button className={s.logOutBtn} onClick={handleLogOut}>
          Log out
        </button>
        <p onClick={() => navigation("/profile")}>Profile</p>
      </div>
    </div>
  );
}

export default Header;
