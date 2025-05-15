package com.example.avyproject.service;

import com.example.avyproject.entity.CourseProgress;
import com.example.avyproject.entity.Lesson;
import com.example.avyproject.entity.LessonProgress;
import com.example.avyproject.exceptions.LessonProgressNotFoundException;
import com.example.avyproject.repository.LessonProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonProgressServiceImpl implements LessonProgressService {

    @Autowired
    LessonProgressRepository lessonProgressRepository;
    @Override
    public List<LessonProgress> findAllLessonsProgressByCourseProgressId(Long courseProgressId) {
        return lessonProgressRepository.findAllByCourseProgress_Id(courseProgressId);
    }

    @Override
    public List<LessonProgress> findAllLessonsProgressByModuleId(Long moduleId) {
        return null;
    }

    @Override
    public int calculateCourseProgress(Long courseProgressId) {
        return 0;
    }

    @Override
    public LessonProgress create(CourseProgress courseProgress, Lesson lesson) {
        Optional<LessonProgress> existingLessonProgress = lessonProgressRepository
                .findByCourseProgressAndLesson(courseProgress, lesson);
        if(existingLessonProgress.isPresent()){
            return existingLessonProgress.get();
        } else {
            LessonProgress lessonProgress = LessonProgress.builder()
                    .courseProgress(courseProgress)
                    .lesson(lesson)
                    .isDone(false)
                    .build();
            return lessonProgressRepository.save(lessonProgress);
        }
    }

    @Override
    public LessonProgress updateStatus(LessonProgress lessonProgress) {
        LessonProgress entity = getById(lessonProgress.getId());
        entity.setDone(true);
        return lessonProgressRepository.save(entity);
    }

    @Override
    public void deleteById(Long lessonProgressId) {
        lessonProgressRepository.deleteById(lessonProgressId);
    }

    @Override
    public LessonProgress getById(Long lessonProgressId) {
        return lessonProgressRepository.findById(lessonProgressId)
                .orElseThrow(() -> new LessonProgressNotFoundException("Lesson Progress with Id "+lessonProgressId+" not found"));
    }

    @Override
    public void completeLesson(Long lessonProgressId) {
        LessonProgress lessonProgress = getById(lessonProgressId);
        updateStatus(lessonProgress);
    }
}
