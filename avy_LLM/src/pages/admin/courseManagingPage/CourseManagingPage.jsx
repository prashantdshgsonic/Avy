import React, { useEffect } from "react";
import CourseList from "../../../widgets/courseList/CourseList";
import AdminCourseCard from "../../../widgets/adminCourseCard/AdminCourseCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../store/slice/adminCourseActions";
import { setCredentials } from "../../../store/slice/userSlice";
import { useGetUserDetailsQuery } from "../../../services/authService";

const POLLING_INTERVAL = 1800000;

export default function CourseManagingPage() {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  // const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
  //   pollingInterval: POLLING_INTERVAL,
  // });
  const { allCourses } = useSelector((state) => state.adminCourse);
  
  // useEffect(() => {
  //   if (data) {
  //     dispatch(setCredentials(data));
  //   }
  // }, [data, dispatch]);

  useEffect(() => {
    //console.log(userToken);
    if (userToken != null) {
      //console.log(userToken);
      dispatch(getAllCourses(userToken));
    } 
  }, [userToken, dispatch])

  return (
    <div>
        <CourseList>
          {allCourses !== null ?
          allCourses.map((course) => (
            <AdminCourseCard key={course.id} course={course} {...course} />
          )): <p>No availible courses</p>}
        </CourseList>
    </div>
  );
}
