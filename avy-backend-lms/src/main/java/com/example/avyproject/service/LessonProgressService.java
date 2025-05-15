package com.example.avyproject.service;

import com.example.avyproject.entity.CourseProgress;
import com.example.avyproject.entity.Lesson;
import com.example.avyproject.entity.LessonProgress;

import java.util.List;

public interface LessonProgressService {

    LessonProgress create(CourseProgress courseProgress, Lesson lesson);
    LessonProgress updateStatus(LessonProgress lessonProgress);
    LessonProgress getById(Long lessonProgressId);
    void deleteById(Long lessonProgressId);
    List<LessonProgress> findAllLessonsProgressByCourseProgressId (Long courseProgressId);
    List<LessonProgress> findAllLessonsProgressByModuleId(Long moduleId);
    int calculateCourseProgress (Long courseProgressId);
    void completeLesson(Long lessonProgressId);
}
