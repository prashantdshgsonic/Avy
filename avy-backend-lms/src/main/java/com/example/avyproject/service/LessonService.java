package com.example.avyproject.service;

import com.example.avyproject.dto.lesson.CreateLessonDto;
import com.example.avyproject.dto.lesson.LessonDto;
import com.example.avyproject.entity.Lesson;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LessonService {

    Lesson create(CreateLessonDto createLessonDto);
    LessonDto getDtoById(Long id);
    Lesson getById(Long id);
    LessonDto update(Long id, CreateLessonDto lessonDto);
    void delete(Long id);
    LessonDto toDto (Lesson lesson);
    String getLessonSummary(Long lessonId);
}
