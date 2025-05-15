package com.example.avyproject.service.strategy;

import com.example.avyproject.dto.lesson.CreateLessonDto;
import com.example.avyproject.dto.lesson.LessonDto;
import com.example.avyproject.entity.AvyModule;
import com.example.avyproject.entity.Lesson;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LessonStrategy {
    boolean supports(String lessonType);
    boolean requiredFile();
    CreateLessonDto processFile (CreateLessonDto createLessonDto, MultipartFile file);
    String getLessonType ();
    Lesson createLesson(CreateLessonDto createLessonDto);
    Class<? extends CreateLessonDto> getSupportedDtoClass();
    LessonDto convertToDto(Lesson lesson);
    Lesson updateLesson(Lesson existingLesson,CreateLessonDto replacingLesson);
    default int checkLessonOrder (AvyModule avyModule){
        List<Lesson> lessonList = avyModule.getItems();
        int size = lessonList.size();
        return size++;
    }
}
