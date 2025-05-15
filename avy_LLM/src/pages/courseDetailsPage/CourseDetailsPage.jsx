import React, { useEffect } from "react";
import s from "./CourseDetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../ui/customButton/CustomButton";
import DetailsList from "../../ui/detailsList/DetailsList";
import ModuleInfo from "../../ui/moduleInfo/ModuleInfo";
import ProgressBar from "../../ui/progressBar/ProgressBar";
import { startNewCourse } from "../../store/slice/userActions";
import { useGetUserDetailsQuery } from "../../services/authService";
import { setCredentials } from "../../store/slice/userSlice";

const POLLING_INTERVAL = 1800000;

export default function CourseDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: POLLING_INTERVAL,
  });
  let course = useSelector((state) => state.course.currentCourse);
  const {userToken } = useSelector((state) => state.auth);
  let userProgress;

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  
  useEffect(() => {
    if (course !== null) {
      
   
    userProgress = course.modules.reduce(
      (progress, module) => {
        module.items.forEach((item) => {
          progress.totalItems++;
          if (item.isDone) {
            progress.completedItems++;
          }
        });
        return progress;
      },
      { totalItems: 0, completedItems: 0 }
    );
  
    userProgress.completedItems === 0
      ? (userProgress.progressPercentage = 0)
      : (userProgress =
          (userProgress.completedItems / userProgress.totalItems) * 100); }
  }, [course])
  // let userProgress = course.modules.reduce(
  //   (progress, module) => {
  //     module.items.forEach((item) => {
  //       progress.totalItems++;
  //       if (item.isDone) {
  //         progress.completedItems++;
  //       }
  //     });
  //     return progress;
  //   },
  //   { totalItems: 0, completedItems: 0 }
  // );

  // userProgress.completedItems === 0
  //   ? (userProgress.progressPercentage = 0)
  //   : (userProgress =
  //       (userProgress.completedItems / userProgress.totalItems) * 100);

  const handleClick = () => {
    //logic with dispatch to get data for game based on user progress
    dispatch(startNewCourse({courseId: course.id, userToken: userToken}));
    navigate("/simulate");
  };

  return (
    <>{
      course !== null ? 
      <div className={s.courseDetailsPageWrapper}>
      <div
        className={s.banner}
        style={{
          backgroundImage: `url(${
            process.env.REACT_APP_MEDIA_SERVER_URL + course.courseImage
          })`,
        }}
      >
        <h1>{course.title}</h1>
      </div>
      <div className={s.contentWrapper}>
        <div className={s.content}>
          <div className={s.descriptionBlock}>
            <h3>Course Description</h3>
            <p>{course.description}</p>
            {userProgress && userProgress.progressPercentage !== 0 && (
              <ProgressBar
                title={"Overall progress"}
                fillPersentage={userProgress ? userProgress.progressPercentage : 0}
              />
            )}
          </div>
          <div className={s.modulesBlock}>
            <h3>Modules ({course ? course.modules.length : 0})</h3>
            <div className={s.modulesCards}>
              {course ? course.modules.map((module, index) => (
                <ModuleInfo key={index} {...module} />)) : <p>No data availible</p>
              }
            </div>
          </div>
        </div>
        <div className={s.leftBar}>
          <div className={s.detailsBlock}>
            <DetailsList
              title={"Course Details"}
              time={85}
              category={course.category}
              level={course.level}
              participants={course?.participants?.length ?? 0}
            />
          </div>
          <div className={s.actionsBlock}>
            <CustomButton text={"Play now"} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div> : <p>No valid data. Try to select new course</p>
    }</>
    
  );
}
