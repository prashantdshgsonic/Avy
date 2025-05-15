package com.example.avyproject.controller;

import com.example.avyproject.dto.*;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.service.AvyUserService;
import com.example.avyproject.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/course")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;
    private final AvyUserService avyUserService;

    @PostMapping("/create-course")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CourseDto> create(@ModelAttribute CreateCourseDto createCourseDto, @RequestHeader("Authorization") String authHeader) {
        AvyUser creator = avyUserService.getUserByToken(authHeader.substring(7));
        CourseDto course = courseService.createCourse(createCourseDto, creator);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/get-full-course/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CourseDto> getById(@PathVariable Long courseId, @RequestHeader("Authorization") String authHeader) {
        AvyUser creator = avyUserService.getUserByToken(authHeader.substring(7));
        return ResponseEntity.ok(courseService.getByIdAndCreatorId(courseId, creator.getId()));
    }

    @PostMapping("/init-all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> initAllCoursesAsRecommended(@RequestHeader("Authorization") String authHeader) {
        AvyUser creator = avyUserService.getUserByToken(authHeader.substring(7));
        //add all Course to all Users as recommended//
        courseService.initRecommendedMethod();
        //add all Course to all Users as recommended//
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/get-all-courses")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseDto>> getById(@RequestHeader("Authorization") String authHeader) {
        AvyUser creator = avyUserService.getUserByToken(authHeader.substring(7));
        return ResponseEntity.ok(avyUserService.getAllCoursesByCreator(creator));
    }

    @DeleteMapping("/delete-course/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public void deleteById(@PathVariable Long courseId, @RequestHeader("Authorization") String authHeader) {
        AvyUser creator = avyUserService.getUserByToken(authHeader.substring(7));
        courseService.deleteCourseById(courseId);
    }

    @GetMapping("/users-completed/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AvyUser>> completedCourse(@PathVariable Long courseId,
                                                         @RequestHeader("Authorization") String authHeader) {
        AvyUser client = avyUserService.getUserByToken(authHeader.substring(7));
        List<AvyUser> completedCourse = courseService.findCompletedCourse(courseId,client);
        System.out.println(completedCourse);
        return ResponseEntity.ok(completedCourse);
    }

    @GetMapping("/users-in-progress/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AvyUser>> inProgressCourse(@PathVariable Long courseId,
                                                          @RequestHeader("Authorization") String authHeader) {
        AvyUser client = avyUserService.getUserByToken(authHeader.substring(7));
        List<AvyUser> inProgressCourse = courseService.findInProgressCourse(courseId, client);
        return ResponseEntity.ok(inProgressCourse);
    }

}
