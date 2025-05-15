import React from 'react'
import { useEffect, useState } from "react";
import s from "./UsersInProgress.module.css";
import { useDispatch, useSelector } from "react-redux";
import { usersInProgress } from "../../store/slice/adminCourseActions";

export default function UsersInProgress() {
    const dispatch = useDispatch();
    const progressUsers = useSelector((state) => state.adminCourse.progressUsers);
    const loading = useSelector((state) => state.adminCourse.loading);
    const error = useSelector((state) => state.adminCourse.error);  
    const courseId = useSelector((state) => state.adminCourse.courseInfo?.id);
        // console.log("Selected courseId in component:", courseId);   
    const [isEmptySearch, setIsEmptySearch] = useState(false); 


  // usersInProgress
    useEffect(() => {
      if (!isEmptySearch) {
        dispatch(usersInProgress({ courseId }));
      }
    }, [isEmptySearch, courseId, dispatch])
    console.log("progressUsers", progressUsers);
     
    return (
      <>
        <div className={s.section__content}>
          {loading && <p>Loading Users...</p>}
  
          {error && <p className={s.error}>{error}</p>}
  
          {!loading && !error && progressUsers.length === 0 && (
            <p className={s.message}>Users in Progress not found</p>
          )}
  
          {progressUsers.map((user) => (
            <div className={s.userCard_wrapper}>
              <h6>In Progress</h6>
              <div key={user.id} className={s.userCard}>
                <div className={s.userInfo}>
                  <h5 className={s.firstText}>
                    {user.firstName} {user.lastName}
                  </h5>
                  <span className={s.secondText}>
                  {user.location ? 
                      `${user.location.city || ""} 
                      ${user.location.state || ""} 
                      ${user.location.country || ""}`
                    : "Location not available"}
                  </span>
                </div>
              </div>
              </div>
          ))}
  
          {/* example */}
          {/* <div className={s.userCard_wrapper}> 
           <h6>In Progress</h6>
            <div className={s.userCard}>
              <div className={s.userInfo}>
                <h5 className={s.firstText}>Example firstName lastName</h5>
                <span className={s.secondText}>
                  location city, state, country
                </span>
              </div>
            </div>
          </div>  */}
         
        </div>
      </>
    );
  }

