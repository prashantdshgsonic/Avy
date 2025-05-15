import React from "react";
import s from "./LatestActivityList.module.css";
import clock from "../../assets/icons/clock.svg";
function LatestActivityList() {
   const completedCourse = {
     id: 6,
     completed: true,
     title: "IMB Data Scientist",
     date: "6 Dec 2022 14:11",
     description:
       "Design High-Impact User Experiences. Research, design, and prototype effective, visually-driven websites and apps.",
     image:
       "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6F7NZ4Yuqnf0qbnZEzxg0x/ff8013d76c52583e3f841546ea313bc7/iMSM_About720x308-936773994.png?auto=format%2Ccompress&dpr=1&w=&h=",
     category: "Development",
     userProgress: 39,
     myRank: 2,
     participants: [
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
     ],
   };
   const progressCourse = {
     id: 6,
     completed: false,
     title: "Web design",
     date: "1 Nov 2023 20:32",
     description:
       "Design High-Impact User Experiences. Research, design, and prototype effective, visually-driven websites and apps.",
     image:
       "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6F7NZ4Yuqnf0qbnZEzxg0x/ff8013d76c52583e3f841546ea313bc7/iMSM_About720x308-936773994.png?auto=format%2Ccompress&dpr=1&w=&h=",
     category: "Development",
     userProgress: 39,
     myRank: 2,
     participants: [
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
       {
         id: 1,
         firstName: "Jon",
         lastName: "Doe",
         image:
           "https://cdn-icons-png.flaticon.com/128/8348/8348158.png?ga=GA1.1.1706483812.1700768506",
         email: "jondoe@gmail.com",
         jobTitle: "Software Developer",
       },
     ],
   };
  const divCourse = (course) => {
    return (
      <div
        className={s.latestCourse}
        style={{
          backgroundColor: `${
            course.completed ? "" : "var(--completed-background-color)"
          }`,
        }}
      >
        <h4>
          <span>{course.completed ? "Completed " : "Progress "}</span>'
          {course.title}'
        </h4>
        <div className={s.courseDate}>
          <img src={clock} alt="" />
          {course.date}
        </div>
        <div className={s.participants}>
          {course.participants.map((person, index) => (
            <img src={person.image} key={index} alt="participant"></img>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className={s.latestActivityList}>
      <h3>Latest Activity</h3>
      {completedCourse ? divCourse(completedCourse) : "Any completed courses"}
      {progressCourse ? divCourse(progressCourse) : "Any courses in progress"}
    </div>
  );
}

export default LatestActivityList;

