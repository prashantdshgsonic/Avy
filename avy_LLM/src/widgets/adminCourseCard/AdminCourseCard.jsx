import React, { useState } from "react";
import styles from "./AdminCourseCard.module.css";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCourseData } from "../../store/slice/adminCourseSlice";
import { deleteCourse } from "../../store/slice/adminCourseActions";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";


// const mockData = {
//   "id": 3,
//   "title": "Meta Back-End Developer Professional",
//   "description": "Launch your career as a back-end developer. Build job-ready skills for an in-demand career and earn a credential from Meta. No degree or prior experience required to get started.",
//   "courseImage": "/images/c6beb1cf-6495-47ba-8a03-44bc3e03d4bb.png",
//   "category": "Development",
//   "level": "Advanced",
//   "status": null,
//   "creationDate": "2023-12-19",
//   "lastUpdateDate": null,
//   "modules": [
//       {
//           "id": 3,
//           "title": "Introduction to Back-End Development",
//           "description": "Distinguish between front-end, back-end, and full-stack developers.",
//           "moduleOrder": 0,
//           "courseId": 3,
//           "items": [
//               {
//                   "id": 6,
//                   "title": "The benefits of working with UI frameworks.",
//                   "itemType": "video",
//                   "itemOrder": 0,
//                   "moduleId": 3,
//                   "fileName": "Recording 2023-04-28 214950.mp4",
//                   "fileType": "video/mp4",
//                   "linkToVideo": "/video/7affe6bd-91e2-43fd-8da1-819d67683cb6.mp4"
//               },
//               {
//                   "id": 7,
//                   "title": "Quiz",
//                   "itemType": "quiz",
//                   "itemOrder": 1,
//                   "moduleId": 3,
//                   "quizType": 1,
//                   "quizData": {
//                       "question": "The benefits of working with UI frameworks.",
//                       "rightAnswer": "Gateway to the future",
//                       "options": [
//                           "Basic Concepts",
//                           "hell",
//                           "divine"
//                       ]
//                   }
//               }
//           ]
//       },
//       {
//           "id": 4,
//           "title": "Programming in Python",
//           "description": "Programming in Python",
//           "moduleOrder": 1,
//           "courseId": 3,
//           "items": [
//               {
//                   "id": 8,
//                   "title": "Foundational programming skills with basic Python Syntax.",
//                   "itemType": "video",
//                   "itemOrder": 0,
//                   "moduleId": 4,
//                   "fileName": "Recording 2023-04-28 214950.mp4",
//                   "fileType": "video/mp4",
//                   "linkToVideo": "/video/c32c986c-2863-48b9-93ab-77aa034e6276.mp4"
//               },
//               {
//                   "id": 9,
//                   "title": "OrderQuest",
//                   "itemType": "quiz",
//                   "itemOrder": 1,
//                   "moduleId": 4,
//                   "quizType": 2,
//                   "quizData": {
//                       "conceptA": "python",
//                       "conceptB": "javascript",
//                       "optionA": [
//                           "snake",
//                           "def",
//                           "pycharm",
//                           "tabulation",
//                           "data science"
//                       ],
//                       "optionB": [
//                           "event loop",
//                           "scopes",
//                           "undefined",
//                           "log",
//                           "js"
//                       ]
//                   }
//               },
//               {
//                   "id": 10,
//                   "title": "How to use objects, classes and methods.",
//                   "itemType": "video",
//                   "itemOrder": 2,
//                   "moduleId": 4,
//                   "fileName": "Recording 2023-04-28 214950.mp4",
//                   "fileType": "video/mp4",
//                   "linkToVideo": "/video/70c12bea-528d-4d3d-80a6-fcc5ffe7242d.mp4"
//               }
//           ]
//       },
//       {
//           "id": 5,
//           "title": "Version Control",
//           "description": "Version Control",
//           "moduleOrder": 2,
//           "courseId": 3,
//           "items": [
//               {
//                   "id": 11,
//                   "title": "Implement Version Control systems ",
//                   "itemType": "video",
//                   "itemOrder": 0,
//                   "moduleId": 5,
//                   "fileName": "Recording 2023-04-28 214950.mp4",
//                   "fileType": "video/mp4",
//                   "linkToVideo": "/video/b29f5e6a-280b-422d-afd4-0c5fa6e47091.mp4"
//               },
//               {
//                   "id": 12,
//                   "title": "ConstructaWord Quest",
//                   "itemType": "quiz",
//                   "itemOrder": 1,
//                   "moduleId": 5,
//                   "quizType": 3,
//                   "quizData": [
//                       "clone",
//                       "commit",
//                       "branch",
//                       "push",
//                       "add"
//                   ]
//               }
//           ]
//       },
//       {
//           "id": 6,
//           "title": "Introduction to Databases for Back-End Development",
//           "description": "Introduction to Databases for Back-End Development",
//           "moduleOrder": 3,
//           "courseId": 3,
//           "items": [
//               {
//                   "id": 13,
//                   "title": "Concepts and principles that underpin how databases work.",
//                   "itemType": "video",
//                   "itemOrder": 0,
//                   "moduleId": 6,
//                   "fileName": "Recording 2023-04-28 214950.mp4",
//                   "fileType": "video/mp4",
//                   "linkToVideo": "/video/ada274bf-7088-4736-920a-b733b5099491.mp4"
//               },
//               {
//                   "id": 14,
//                   "title": "FillMaster Puzzles",
//                   "itemType": "quiz",
//                   "itemOrder": 1,
//                   "moduleId": 6,
//                   "quizType": 4,
//                   "quizData": {
//                       "arrayFromText": [
//                           "Concepts",
//                           "and",
//                           "principles",
//                           "that",
//                           "underpin",
//                           "how",
//                           "databases",
//                           "work."
//                       ],
//                       "text": "Concepts and principles that underpin how databases work.",
//                       "choosedWords": [
//                           2,
//                           7
//                       ],
//                       "options": [
//                           [
//                               "bubble",
//                               "data",
//                               "oop",
//                               "balerine"
//                           ]
//                       ]
//                   }
//               }
//           ]
//       }
//   ],
//   "participants": []
// }

function AdminCourseCard({ id, price, title, modules, courseImage, course }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); //for confirmational window  
    
    const onCardClick = () => {
      dispatch(setCourseData(course));
      navigate("/course");
    };
  
    const handleCourseDelete = async (e) => {
      e.stopPropagation();
      setIsModalOpen(true);
    };

    //for button 'Yes' 
    const confirmDelete = async () => {
        const result = await dispatch(deleteCourse({ courseId: id }));
        console.log(result);
        setIsModalOpen(false);
        navigate("/dashboard-admin");
    };

    //for button 'No' in confirmationalWindow
    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(false);
        navigate("/dashboard-admin");
    }
  
    return (
      <div className={styles.adminCourseCard} onClick={onCardClick}>
        <div className={styles.titleDiv}>
          <img
            src={`${process.env.REACT_APP_MEDIA_SERVER_URL}${courseImage}`}
            alt="course"
          />
          <h3>{title}</h3>
        </div>
        <p className={styles.price}></p>
        <p className={styles.modulesInTotal}>{modules.length} module</p>
        <div className={styles.controlPanel}>
          <img
            src={deleteIcon}
            alt="delete course"
            onClick={handleCourseDelete}
          />
          <img src={editIcon} alt="edit course" />
        </div>

        <ConfirmDelete
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={confirmDelete}
        />
      </div>
    );
  }
  
  export default AdminCourseCard;
