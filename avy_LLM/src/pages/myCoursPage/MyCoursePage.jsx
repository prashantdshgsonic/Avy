import React, { useEffect } from "react";
import s from "./MyCoursePage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProgressModule from "../../widgets/progressModule/ProgressModule";
import rewardIcon from "../../assets/icons/rewardsIcon.svg";
import CustomButton from "../../ui/customButton/CustomButton";

function MyCoursePage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { myCourseId } = useParams();
  const idOfCourse = parseInt(myCourseId);
  let myCourse = {};
  useEffect(() => {
myCourse = user.currentCourse;
//console.log(myCourse);
  }, [user.currentCourse])




  return (
    <div className={s.myCourseWrapper}>
      <div
        className={s.billBoard}
        // style={{ backgroundImage: `url(${myCourse.courseImage})` }}
      ></div>
      <div className={s.myCourseContainer}>
        <div className={s.allAboutCourse}>
          <div className={s.myCourseInfo}>
            <h1>{myCourse.title}</h1>
            <p>Category: {myCourse.category}</p>
          </div>
          <div className={s.modules}>
            {/* {Here ProgressModule will be rendered by the quantity of modules, but for now as default 3} */}
            <div>
              <ProgressModule
                totalLessons={6}
                currentLesson={6}
                title={"Module 1"}
              ></ProgressModule>
            </div>
            <div>
              <ProgressModule
                totalLessons={6}
                currentLesson={5}
                title={"Module 2"}
              ></ProgressModule>
            </div>
            <div>
              <ProgressModule
                totalLessons={6}
                currentLesson={0}
                title={"Module 3"}
              ></ProgressModule>
            </div>
            <div>
              <ProgressModule
                totalLessons={6}
                currentLesson={0}
                title={"Module 4"}
              ></ProgressModule>
            </div>
          </div>
          <div className={s.lesson}>
            <h3>
              Lesson {myCourseId}: {myCourse.title}
            </h3>
            <iframe title="Lesson" width="560" height="315" src="https://www.youtube.com/embed/N3AkSS5hXMA"allowFullScreen></iframe>
          </div>
        </div>
        <div className={s.interactiveSide}>
          <div className={s.participants}>
            <h3>Participants</h3>
            <div className={s.participantsImages}>
              {/* {myCourse.participants.map((elem, index) => {
                return <img src={elem.image} alt="" key={index} />;
              })} */}
            </div>
          </div>
          <div className={s.myRank}>
            <h3>Your rank</h3>
            {/* <div className={s.myRankInfo}>
              <img src={rewardIcon} alt="rewards" />
              <p>{myCourse.myRank} place</p>
            </div> */}
            <p>Keep up the good work!</p>
            <CustomButton text={"Start"} onClick={() => navigate("/simulate")}/> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCoursePage;
