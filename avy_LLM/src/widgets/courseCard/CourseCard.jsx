import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../ui/customButton/CustomButton";
import s from "./CourseCard.module.css";
import ProgressCircle from "../../ui/progressCircle/ProgressCircle";
import { useDispatch } from "react-redux";
import { getSelectedCourse } from "../../store/slice/courseSlice";

export default function CourseCard({
  id,
  title,
  courseImage,
  category,
  userProgress,
  courseInfo,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = function () {
      dispatch(getSelectedCourse(id))
      navigate(`/course/${id}`);
  };

  return (
    <div className={s.courseCard}>
      <img className={s.image} src={`${process.env.REACT_APP_MEDIA_SERVER_URL}${courseImage}`} alt="course-card" />
      <p className={s.category}>{category}</p>
      <div className={s.infoWrapper}>
        <div className={s.courseInfo}>
          <p className={s.title}>{title}</p>
          <p>{courseInfo}</p>
        </div>
        {userProgress && (
          <div className={s.userInfo}>
            <ProgressCircle radius={25} stroke={5} progress={userProgress} />
          </div>
        )}
      </div>
      <CustomButton
        text={userProgress ? "Continue" : "Learn more"}
        onClick={handleOnClick}
      />
    </div>
  );
}
