package com.example.avyproject.repository;

import com.example.avyproject.entity.CourseProgress;
import com.example.avyproject.entity.Lesson;
import com.example.avyproject.entity.LessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonProgressRepository extends JpaRepository<LessonProgress,Long> {
    List<LessonProgress> findAllByCourseProgress_Id (Long courseProgressId);

    Optional<LessonProgress>findByCourseProgressAndLesson(CourseProgress courseProgress, Lesson lesson);

}
