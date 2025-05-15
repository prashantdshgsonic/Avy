package com.example.avyproject.controller;
import com.example.avyproject.dto.lesson.*;
import com.example.avyproject.entity.Lesson;
import com.example.avyproject.exceptions.LessonProgressNotFoundException;
import com.example.avyproject.service.LessonService;
import com.example.avyproject.service.strategy.VideoLessonStrategy;
import com.example.avyproject.service.utility.LessonContentMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin/lesson")
public class LessonController {
    private final VideoLessonStrategy videoLessonStrategy;
    private final LessonContentMapper lessonContentMapper;
    private final LessonService lessonService;


    @PostMapping("/create-lesson")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createLesson(HttpServletRequest request) {
        CreateLessonDto createLessonDto = lessonContentMapper.mapToCreateLessonDto(request);
        Lesson lesson = lessonService.create(createLessonDto);
        return ResponseEntity.ok(lessonService.toDto(lesson));
    }

    @PostMapping("/update-lesson/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> update(@PathVariable Long id, HttpServletRequest request) {
        try{
            CreateLessonDto createLessonDto = lessonContentMapper.mapToCreateLessonDto(request);
            LessonDto updatedLessonDto = lessonService.update(id, createLessonDto);
            log.info("lesson updated");
            return ResponseEntity.ok(updatedLessonDto);
        }catch (LessonProgressNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete-lesson/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        lessonService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

