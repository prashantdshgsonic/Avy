import React from "react";
import LatestActivityList from "../latestActivityList/LatestActivityList";
import BarChart from "../lineChart/LineChart";
import CircleChart from "../circelChart/CircleChart";
import s from "./ProfileActivity.module.css";

function ProfileActivity() {
  return (
    <div className={s.profileActivity}>
      <div className={s.sectionOne}>
        <BarChart></BarChart>
        <LatestActivityList></LatestActivityList>
      </div>
      <CircleChart></CircleChart>
    </div>
  );
}

export default ProfileActivity;
