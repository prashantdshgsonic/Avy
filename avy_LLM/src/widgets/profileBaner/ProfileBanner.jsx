import React, { useState } from "react";
import s from "./ProfileBanner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserImage } from "../../store/slice/userActions";
import placeholder from "../../assets/images/avatar_test.svg";
import reward from "../../assets/icons/rewardsIcon.svg"
import coin from '../../assets/icons/coinIcon.svg';

function ProfileBanner({ userName, userImg, userBg, userCoins, useRewards }) {
  const { userInfo } = useSelector((state) => state.user);
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = new FormData();
      newImage.append("userImage", file)
      dispatch(updateUserImage({newImage, userToken}))
    }
  };
  return (
    <div className={s.profileBannerWrapper}>
      <div
        className={s.bgBanner}
        style={{ backgroundImage: `url(${userBg})` }}
      ></div>
      <div className={s.userInfo}>
        <div className={s.userName}>
          <label htmlFor="userImageInput" className={s.replacePhotoLabel}>
            <img
              src={userInfo.linkToImage ? process.env.REACT_APP_MEDIA_SERVER_URL + userInfo.linkToImage : placeholder}
              alt="userImg"
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              id="userImageInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </label>
          <h1>{userName}</h1>
        </div>
        <div className={s.userAchievements}>
          <div className={s.awardsInfo}>
            <div>
              <p className={s.firstText}>{userInfo.coins ? userInfo.coins : 0} coins</p> {/* !!! userCoins*/}
              <p className={s.secondText}>Total balance</p>
            </div>
            <img src={coin} alt="" />
          </div>
          <div className={s.awardsInfo}>
            <div>
              <p className={s.firstText}>{userInfo.awards ? userInfo.awards.length : 0}</p> {/* !!! useRewards*/}
              <p className={s.secondText}>Rewards</p>
            </div>
            <img src={reward} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;
