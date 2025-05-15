import React, { useEffect, useState } from "react";
import s from "./ProfilePage.module.css";
import { useGetUserDetailsQuery } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import ProfileBanner from "../../widgets/profileBaner/ProfileBanner";
import userBgBanner from "../../assets/images/userBgBanner.png";
import ProfileGeneral from "../../widgets/profileGeneral/ProfileGeneral";
import ProfileActivity from "../../widgets/profileActivity/ProfileActivity";
import GamePersonage from "../../widgets/gamePersonage/GamePersonage";
import { setCredentials } from "../../store/slice/userSlice";
import { getUserData } from "../../store/slice/userActions";

function ProfilePage() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { userToken } = useSelector((state) => state.auth);
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 1800000, //30 min
  });
  const [activeLink, setActiveLink] = useState("General");
  // not nessecary for now
  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  const links = [
    { name: "General" },
    { name: "Activity" },
    { name: "Character" },
    { name: "Subscription" },
  ];

  useEffect(() => {
    dispatch(getUserData(userToken));
  }, [userToken]);


  const navBtn = (text) => {
    const isActive = text === activeLink;
    return (
      <button
        key={text}
        onClick={() => setActiveLink(text)}
        className={isActive ? s.activeButton : s.defaultButton}
      >
        {text}
      </button>
    );
  };

  if (isFetching) {
    return <span>Fetching your profile...</span>;
  } else if (userInfo === null) {
    return <span>You're not logged in</span>;
  }

  let activeComponent;
  switch (activeLink) {
    case "General":
      activeComponent = <ProfileGeneral />;
      break;
    case "Activity":
      activeComponent = <ProfileActivity></ProfileActivity>;
      break;
    case "Character":
      activeComponent = <GamePersonage></GamePersonage>;
      break;
    default:
      activeComponent = <div>No matching component</div>;
  }
  return (
    
    <div className={s.profileWrapper}>
      <ProfileBanner
        userName={userInfo.firstName}
        userBg={userBgBanner}
        userCoins={userInfo.coins}
        useRewards={userInfo.awards}
      ></ProfileBanner>
      <div className={s.profileNav}>{links.map((btn) => navBtn(btn.name))}</div>
      {activeComponent}
    </div>
  );
}

export default ProfilePage;
