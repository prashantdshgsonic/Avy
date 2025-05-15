import React, { useEffect } from 'react';
import s from './CourseSelector.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { startNewCourse } from '../../store/slice/userActions';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../ui/customButton/CustomButton';
import { requestDemo } from '../../store/slice/userSlice';
import { getUserRecommededCourses } from '../../store/slice/courseActions';

/**
 * Component for selecting a course.
 *
 * Displays a list of courses fetched from the Redux store. When a course is clicked,
 * it dispatches an action to start a new course and navigates to the simulation page.
 */
export default function CourseSelector() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Extract courseList from the Redux store's course state.
    const { courseList } = useSelector((state) => state.course);
    const { userToken } = useSelector((state) => state.auth);

    useEffect(() => {
        if( courseList && courseList.length === 0) {
            dispatch(getUserRecommededCourses(userToken))
        }
    }, [courseList])

    
    /**
     * Handles click event on a course card.
     * Dispatches an action to start a new course and navigates to the simulation page.
     * @param {string} courseId - ID of the selected course.
     */
    const handleCourseClick = (courseId) => () => {
        dispatch(startNewCourse({courseId, userToken}));
        navigate("/simulate");
    };
    // const handleButtonClick = () => {
    //     // logic with demo version of the game
    //     dispatch(requestDemo())
    //     navigate("/simulate");
    // };

    // const redirectToGame = () => () => {
    //     navigate("/simulate");
    // };

    // Render the course selector UI
    return (
        <>
            {courseList &&
                <div className={s.courseSelectorContainer}>
                    <h2>Select the course to continue</h2>
                    <div className={s.courseSelectorWrapper}>
                        {courseList.map((course) => (
                            <div key={course.id} onClick={handleCourseClick(course.id)} className={s.courseSelectorCard}>
                                <img 
                                    className={s.courseSelectorImage} 
                                    src={`${process.env.REACT_APP_MEDIA_SERVER_URL}${course.courseImage}`} 
                                    alt={`${course.title} course card`} 
                                />
                                <p className={s.courseSelectorTitle}>{course.title}</p>
                            </div>
                        ))}
                    </div>
                    {/* <p>or try once</p>
                    <CustomButton text={"Demo"} onClick={handleButtonClick}></CustomButton> */}
                    {/* <CustomButton text={"Redirect to game"} onClick={redirectToGame()}></CustomButton> */}
                </div>
            }
        </>
    );
}
