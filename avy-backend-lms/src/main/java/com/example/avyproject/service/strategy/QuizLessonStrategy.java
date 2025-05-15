package com.example.avyproject.service.strategy;

import com.example.avyproject.converter.LessonConverter;
import com.example.avyproject.dto.lesson.*;
import com.example.avyproject.entity.AvyModule;
import com.example.avyproject.entity.Lesson;
import com.example.avyproject.entity.QuizLesson;
import com.example.avyproject.exceptions.CourseNotFoundException;
import com.example.avyproject.repository.LessonRepository;
import com.example.avyproject.service.AvyModuleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@Slf4j
public class QuizLessonStrategy implements LessonStrategy{

    private final LessonConverter lessonConverter;
    private final AvyModuleService avyModuleService;
    private final LessonRepository lessonRepository;

    public QuizLessonStrategy (LessonConverter lessonConverter
            , AvyModuleService avyModuleService
            , LessonRepository lessonRepository) {
        this.lessonConverter = lessonConverter;
        this.avyModuleService = avyModuleService;
        this.lessonRepository = lessonRepository;
    }


    @Override
    public boolean supports(String lessonType) {
        return "quiz".equals(lessonType);
    }

    @Override
    public boolean requiredFile() {
        return false;
    }

    @Override
    public CreateLessonDto processFile(CreateLessonDto createLessonDto, MultipartFile file) {
        return null;
    }

    @Override
    public String getLessonType() {
        return "quiz";
    }

    @Override
    public Lesson createLesson(CreateLessonDto createLessonDto) {
        CreateQuizLessonDto createQuizLessonDto = (CreateQuizLessonDto) createLessonDto;
        if (createQuizLessonDto.getModuleId() == null) {
            throw new CourseNotFoundException("Module ID cannot be null");
        }
        AvyModule module = avyModuleService.getById(createQuizLessonDto.getModuleId());
        QuizLesson quizLesson = lessonConverter.convertToEntity(createQuizLessonDto,QuizLesson.class);
        quizLesson.setQuizType(createQuizLessonDto.getQuizType());
        quizLesson.setQuizData(createQuizLessonDto.getQuizData());
        quizLesson.setAvyModule(module);
        quizLesson.setModuleId(module.getId());
        quizLesson.setItemOrder(checkLessonOrder(module));
        return lessonRepository.save(quizLesson);
    }

    @Override
    public Class<? extends CreateLessonDto> getSupportedDtoClass() {
        return CreateQuizLessonDto.class;
    }

    @Override
    public LessonDto convertToDto(Lesson lesson) {
        QuizLesson quizLesson = (QuizLesson) lesson;
        return lessonConverter.convertToDto(quizLesson, QuizLessonDto.class);
    }

    @Override
    public Lesson updateLesson(Lesson existingLesson, CreateLessonDto replacingLesson) {
        return null;
    }
}
