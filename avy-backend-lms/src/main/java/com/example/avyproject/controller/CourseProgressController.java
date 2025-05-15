package com.example.avyproject.controller;

import com.example.avyproject.dto.CourseProgressDto;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;
import com.example.avyproject.service.AvyUserService;
import com.example.avyproject.service.CourseProgressService;
import com.example.avyproject.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Course progress controller",
        description = "Provides CRUD operations to course progress")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/course-progress")
public class CourseProgressController {
    private final CourseProgressService courseProgressService;
    private final AvyUserService avyUserService;
    private final CourseService courseService;

    @Operation(summary = "Create course progress", description = "Create course progress")
    @SecurityRequirement(name = "Authorization")
    @PostMapping("/create")
    public ResponseEntity<CourseProgressDto> createCourseProgress(@RequestBody CourseProgressDto courseProgressDto) {
        Course courseById = courseService.getEntityById(courseProgressDto.getCourseId());
        AvyUser avyUserById = avyUserService.getEntityById(courseProgressDto.getUserId());
        return ResponseEntity.ok(courseProgressService.createCourseProgress(courseProgressDto,courseById,avyUserById));
    }

    @Operation(summary = "Get course progress by id", description = "Get course progress by id")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/by/id/{id}")
    public ResponseEntity<CourseProgressDto> getCourseProgressById(@PathVariable("id")
                                                                   @Parameter(description = "Course progress ID") Long id) {
        return ResponseEntity.ok(courseProgressService.getCourseProgressById(id));
    }

    @Operation(summary = "Get all course progresses", description = "Get all course progresses")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/all")
    public ResponseEntity<List<CourseProgressDto>> getAllCourseProgresses() {
        return ResponseEntity.ok(courseProgressService.getAllCourseProgresses());
    }

    @Operation(summary = "Update course progress", description = "Update course progress")
    @SecurityRequirement(name = "Authorization")
    @PutMapping("/update")
    public ResponseEntity<CourseProgressDto> updateAward(@RequestBody CourseProgressDto courseProgressDto) {
        Course courseById = courseService.getEntityById(courseProgressDto.getCourseId());
        AvyUser avyUserById = avyUserService.getEntityById(courseProgressDto.getUserId());
        return ResponseEntity.ok(courseProgressService.updateCourseProgress(courseProgressDto,courseById,avyUserById));
    }

    @Operation(summary = "Delete course progress by id", description = "Delete course progress by id")
    @SecurityRequirement(name = "Authorization")
    @DeleteMapping("/delete/by/id/{id}")
    public ResponseEntity<String> deleteCourseProgressById(@PathVariable("id")
                                                           @Parameter(description = "Award ID") Long id) {
        return ResponseEntity.ok(courseProgressService.deleteCourseProgressById(id));
    }
}
