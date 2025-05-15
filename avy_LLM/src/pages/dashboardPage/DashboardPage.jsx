import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../services/authService";
import { setCredentials } from "../../store/slice/userSlice";
import {
  getUserCompletedCourses,
  getUserProgressingCourses,
  getUserRecommededCourses,
} from "../../store/slice/courseActions";
import CourseCard from "../../widgets/courseCard/CourseCard";
import Indicator from "../../ui/indicator/Indicator";
import s from "./DashboardPage.module.css";
import Calendar from "../../widgets/calendar/Calendar";
import Carousel from "../../widgets/carousel/Carousel";
import MiniProfileWidget from "../../widgets/miniProfileWidget/MiniProfileWidget";
import userAvatar from "../../assets/images/avatar_test.svg";
import { getUserData } from "../../store/slice/userActions";
import NavigateAssistant from "../../widgets/navigateAssistant/NavigateAssistant";

const POLLING_INTERVAL = 1800000;
const COURSE_IN_PROGRESS = "Course in progress";
const COMPLETED_COURSES = "Completed courses";
const RECOMMENDED_COURSES = "Recommended courses";

function DashboardPage() {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: POLLING_INTERVAL,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  const { userInfo } = useSelector((state) => state.user);
  const { courseList } = useSelector((state) => state.course);
  const userToken = useSelector((state) => state.auth.userToken);
  const [coursesTitle, setCoursesTitle] = useState("");

  const handleCoursesClick = (action, title) => {
    dispatch(action(userToken));
    setCoursesTitle(title);
  };

  useEffect(() => {
    dispatch(getUserData(userToken));
  }, [userToken]);

  const renderIndicators = () => (
    <div className={s.indicatorsWrapper}>
      <Indicator
        placeholder={"In Progress"}
        value={userInfo.coursesInProgress}
        colorVariable={`colorVariable0`}
        onClick={() => handleCoursesClick(getUserProgressingCourses, COURSE_IN_PROGRESS)}
      />
      <Indicator
        placeholder={"Completed"}
        value={userInfo.coursesCompleted}
        colorVariable={`colorVariable1`}
        onClick={() => handleCoursesClick(getUserCompletedCourses, COMPLETED_COURSES)}
      />
      <Indicator
        placeholder={"Recommended"}
        value={userInfo.coursesRecommended}
        colorVariable={`colorVariable2`}
        onClick={() => handleCoursesClick(getUserRecommededCourses, RECOMMENDED_COURSES)}
      />
    </div>
  );

  const renderCourseCards = () => {
    const listOfSelectedCourses = courseList;
  
    if (!listOfSelectedCourses || !Array.isArray(listOfSelectedCourses)) {
      // Handle the case where courseList is undefined or not an array
      return <div>No courses available.</div>;
    }
  
    return (
      <div className={s.courseCardsWrapper}>
        <Carousel>
          {listOfSelectedCourses.map((item) => (
            <CourseCard key={item.id} {...item} />
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <>
      {isFetching ? (
        <span>Loading...</span>
      ) : (
        <div className={s.dashboardWrapper}>
          <h1>Hi! Welcome {userInfo.firstName}!</h1>
          <div className={s.dashboardContentWrapper}>
            <div className={s.dashboardContent}>
              <MiniProfileWidget
                userAvatar={userInfo.linkToImage ? (process.env.REACT_APP_MEDIA_SERVER_URL + userInfo.linkToImage) : userAvatar}
                userName={userInfo.userName ?? userInfo.firstName}
                coins={userInfo.coins ?? 0}
                rewards={userInfo.awards ?userInfo.awards.length : 0}
              />
              {renderIndicators()}
              <h2 className={s.courseType}>{coursesTitle}</h2>
              {renderCourseCards()}
            </div>
            <Calendar />
          
          </div>
          <NavigateAssistant />
        </div>
      )}
    </>
  );
}

export default DashboardPage;