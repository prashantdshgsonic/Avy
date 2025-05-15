import React, { useState } from "react";
import s from "./CourseCreationPage.module.css";
import AddCourseForm from "../../../widgets/addCourseForm/AddCourseForm";
import { useSelector } from "react-redux";
import ModuleCard from "../../../widgets/moduleCard/ModuleCard";
import UsersCompleted from "../../../widgets/usersCompleted/UsersCompleted";
import UsersInProgress from "../../../widgets/usersInProgress/UsersInProgress";
import OutlinedButton from "../../../ui/outlinedButton/OutlinedButton";

export default function CourseCreationPage() {
  const [showUsersCompleted, setShowUsersCompleted] = useState(false); 
  const [showUsersInProgress, setShowUsersInProgress] = useState(false);

  const { courseInfo, courseLoaded, moduleUpdated, lessonUpdated } = useSelector(
    (state) => state.adminCourse);
  //  console.log("courseInfo", courseInfo);

  return (
    <div className={s.pageWrapper}>
      <AddCourseForm />
      <div className={s.moduleSection}>
        {/* <div className={s.modulesWrapper}>
          {courseInfo.modules
            ? courseInfo.modules.map((item, index) => {
                return index % 2 === 0 ? (
                  <ModuleCard key={item.id} {...item} />
                ) : null;
              })
            : null}
        </div>
        <div className={s.modulesWrapper}>
          {courseInfo.modules
            ? courseInfo.modules.map((item, index) => {
                return index % 2 !== 0 ? (
                  <ModuleCard key={item.id} {...item} />
                ) : null;
              })
            : null}
        </div> */}
        
        <div className={s.modulesWrapper}>
          {courseInfo?.modules?.map((item, index) => (
            index % 2 === 0 ? <ModuleCard key={item.id} {...item} /> : null
          ))}
        </div>
        <div className={s.modulesWrapper}>
          {courseInfo?.modules?.map((item, index) => (
            index % 2 !== 0 ? <ModuleCard key={item.id} {...item} /> : null
          ))}
        </div>
      </div>

      <div className={s.buttonWrappers}>     
      {/* display users completed course */}
      {courseInfo && Object.keys(courseInfo).length > 0 && (
         <OutlinedButton 
          onClick={() => setShowUsersCompleted(!showUsersCompleted)} 
          label={showUsersCompleted ? "Hide completed users" : "Users Completed This Course"}
        />
       )}

       {/* display users In Progress */}
       {courseInfo && Object.keys(courseInfo).length > 0 && (
        <OutlinedButton 
          onClick={() => setShowUsersInProgress(!showUsersInProgress)}
          label={showUsersInProgress ? "Hide users in Progress" : "Users in Progress"}
        />
       )}
      </div>  

     <div className={s.usersWrapper}>  
        {showUsersCompleted && <UsersCompleted />}
        {showUsersInProgress && <UsersInProgress />}
      </div>
    </div>
  );
}
