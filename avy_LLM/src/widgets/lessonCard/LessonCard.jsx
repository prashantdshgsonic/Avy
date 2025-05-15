import React from 'react'
import s from './LessonCard.module.css'
import IconButton from '../../ui/iconButton/IconButton'
import temporaryImage from '../../assets/images/AVY-transparent-PNG.png'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { deleteLesson, updateLesson  } from '../../store/slice/adminCourseActions.js';
import EditLessonForm from '../editLessonForm/EditLessonForm.jsx'

const mockData = {
  "id": 1,
  "title": "React Fundamentals",
  "description": "In this first module, we introduce React, and build a common understanding we'll use throughout the course.",
  "moduleOrder": 0,
  "courseId": 1,
  "items": [
      {
          "id": 1,
          "title": "We'll learn all about JSX, components, and props.",
          "itemType": "video",
          "itemOrder": 0,
          "moduleId": 1,
          "fileName": "Recording 2023-04-28 214950.mp4",
          "fileType": "video/mp4",
          "linkToVideo": "/video/425a4d2b-13a0-4eca-a692-75669dfec8a7.mp4"
      }
  ]
}

export default function LessonCard({ id, title, itemType, courseId, userToken, moduleId, image }) {
  const dispatch = useDispatch();
  const [lessonData, setLessonData] = useState({ id, title, itemType });
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteLesson = async () => {
    try {
      await dispatch(deleteLesson({ lessonId: id, courseId, userToken }));
     
      console.log(`Lesson ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const handleEditLesson = () => {
    setIsEditing(true); // open edit
  };

  const handleSaveLesson = async (updatedData) => {
    try {
      await dispatch(updateLesson({
        lessonId: id,
        courseId,
        updatedLesson: updatedData, // JSON
        userToken,
      }));
      setLessonData(updatedData); 
      setIsEditing(false); // close editing
    } catch (error) {
      console.error("Error saving lesson:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); 
  };

  return (
    <div className={s.lessonCardWrapper}>
      <div className={s.lessonCardHeader}>
        <p>Lesson: {lessonData.title}</p>
        <div className={s.actionBtns}>
          <IconButton icon="delete" onClick={handleDeleteLesson} />
          <IconButton icon="edit" onClick={handleEditLesson} />
        </div>
      </div>
      <div className={s.lessonCardContent}>
        <p>The lesson type is {lessonData.itemType}</p>
        <img className={s.lessonCardimg} src={image || temporaryImage} alt="Lesson thumbnail" />
      </div>

      {isEditing && (
        <EditLessonForm
          courseId={courseId}
          moduleId={moduleId}
          initialData={lessonData}
          onSave={handleSaveLesson} // save changes
          onCancel={handleCancelEdit} //cancel changes
        />
      )}
    </div>
  );
}