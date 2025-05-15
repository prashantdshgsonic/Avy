package com.example.avyproject.service;

import com.example.avyproject.dto.lesson.CreateLessonDto;
import com.example.avyproject.converter.LessonConverter;
import com.example.avyproject.dto.lesson.LessonDto;
import com.example.avyproject.entity.*;
import com.example.avyproject.exceptions.LessonProgressNotFoundException;
import com.example.avyproject.repository.LessonProgressRepository;
import com.example.avyproject.repository.LessonRepository;
import com.example.avyproject.service.jms.JmsProducer;
import com.example.avyproject.service.strategy.LessonHandler;
import com.example.avyproject.service.strategy.LessonStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class LessonServiceImpl implements LessonService {

    private static final Logger log = LoggerFactory.getLogger(LessonServiceImpl.class);
    @Autowired
    LessonHandler lessonHandler;
    @Autowired
    LessonRepository lessonRepository;
    @Autowired
    LessonConverter lessonConverter;
    @Autowired
    LessonProgressRepository lessonProgressRepository;
    @Autowired
    JmsProducer jmsProducer;

    private final VideoService videoService;

    public LessonServiceImpl(VideoService videoService) {
        this.videoService = videoService;
    }

    @Override
    public Lesson create(CreateLessonDto createLessonDto) {
        LessonStrategy lessonStrategy = lessonHandler.getStrategy(createLessonDto.getItemType());
        return lessonStrategy.createLesson(createLessonDto);
    }

    @Override
    public LessonDto toDto(Lesson lesson) {
        LessonStrategy lessonStrategy = lessonHandler.getStrategy(lesson.getItemType());
        return lessonStrategy.convertToDto(lesson);
    }

    @Override
    public String getLessonSummary(Long lessonId) {
        Lesson lesson = getById(lessonId);
        if(Objects.equals(lesson.getItemType(), "video")) {
            VideoLesson videoLesson = (VideoLesson) lesson;
            return videoLesson.getSummary();
        } else if(Objects.equals(lesson.getItemType(), "pdf")) {
            PdfLesson pdfLesson = (PdfLesson) lesson;
            return pdfLesson.getSummary();
        } else {
            return null;
        }
    }

    @Override
    public LessonDto getDtoById(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(()-> new LessonProgressNotFoundException("Lesson not found"));
        return toDto(lesson);
    }

    @Override
    public Lesson getById(Long id) {
        return lessonRepository.findById(id)
                .orElseThrow(()-> new LessonProgressNotFoundException("Lesson not found"));
    }

    @Override
    public LessonDto update(Long id,CreateLessonDto lessonDto) {
        Lesson existingLesson = lessonRepository.findById(id)
                .orElseThrow(() -> new LessonProgressNotFoundException("Lesson not found"));
        LessonStrategy strategy = lessonHandler.getStrategy(lessonDto.getItemType());
        Lesson updatedLesson = strategy.updateLesson(existingLesson, lessonDto);
        return toDto(updatedLesson);
    }

    @Override
    public void delete(Long id) {
        Lesson lesson = getById(id);
        lessonRepository.deleteById(lesson.getId());
        jmsProducer.requestToDeleteLessonChunks(lesson.getId());
    }

}
