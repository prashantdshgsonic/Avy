package com.example.avyproject.service.strategy;

import com.example.avyproject.converter.LessonConverter;
import com.example.avyproject.dto.lesson.*;
import com.example.avyproject.entity.AvyModule;
import com.example.avyproject.entity.Lesson;
import com.example.avyproject.entity.TextLesson;
import com.example.avyproject.exceptions.CourseNotFoundException;
import com.example.avyproject.repository.LessonRepository;
import com.example.avyproject.service.AvyModuleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@Slf4j
public class TextLessonStrategy implements LessonStrategy {

    private final LessonConverter lessonConverter;
    private final AvyModuleService avyModuleService;
    private final LessonRepository lessonRepository;

    public TextLessonStrategy (LessonConverter lessonConverter
            , AvyModuleService avyModuleService
            , LessonRepository lessonRepository) {
        this.lessonConverter = lessonConverter;
        this.avyModuleService = avyModuleService;
        this.lessonRepository = lessonRepository;
    }


    @Override
    public boolean supports(String lessonType) {
        return "text".equals(lessonType);
    }

    @Override
    public String getLessonType() {
        return "text";
    }

    @Override
    public Lesson createLesson(CreateLessonDto createLessonDto) {
        CreateTextLessonDto createTextLessonDto = (CreateTextLessonDto) createLessonDto;
        if (createTextLessonDto.getModuleId() == null) {
            throw new CourseNotFoundException("Module ID cannot be null");
        }
        AvyModule module = avyModuleService.getById(createTextLessonDto.getModuleId());
        TextLesson textLesson = lessonConverter.convertToEntity(createTextLessonDto,TextLesson.class);
        textLesson.setTextContent(createTextLessonDto.getTextContent());
        textLesson.setAvyModule(module);
        textLesson.setModuleId(module.getId());
        textLesson.setItemOrder(checkLessonOrder(module));
        return lessonRepository.save(textLesson);
    }

    @Override
    public Class<? extends CreateLessonDto> getSupportedDtoClass() {
        return CreateTextLessonDto.class;
    }

    @Override
    public LessonDto convertToDto(Lesson lesson) {
        TextLesson textLesson = (TextLesson) lesson;
        return lessonConverter.convertToDto(textLesson,TextLessonDto.class);
    }

    @Override
    public Lesson updateLesson(Lesson existingLesson, CreateLessonDto replacingLesson) {
        return null;
    }

    @Override
    public boolean requiredFile() {
        return false;
    }

    @Override
    public CreateLessonDto processFile(CreateLessonDto createLessonDto, MultipartFile file) {
        log.info("here is no file needed");
        return createLessonDto;
    }

}


