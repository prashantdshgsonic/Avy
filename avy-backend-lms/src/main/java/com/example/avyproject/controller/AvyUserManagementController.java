package com.example.avyproject.controller;

import com.example.avyproject.converter.CourseProgressDtoConverter;
import com.example.avyproject.dto.*;
import com.example.avyproject.dto.lesson.LessonDto;
import com.example.avyproject.dto.lesson.QuestionRequest;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;
import com.example.avyproject.entity.CourseProgress;
import com.example.avyproject.entity.Lesson;
import com.example.avyproject.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AvyUserManagementController {
    private final AvyUserService avyUserService;
    private final CourseService courseService;
    private final CourseProgressService courseProgressService;
    private final LessonService lessonService;
    private final CourseProgressDtoConverter courseProgressDtoConverter;

    @GetMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AvyUserDto>> getUserByUsername(@PathVariable String username) {
        List<AvyUserDto> userDto = avyUserService.getUserByUsername(username);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> getCurrentUser(Authentication authentication) {
        String email = "";
        Object principal = authentication.getPrincipal();
        if (principal instanceof AvyUser) {
            AvyUser avyUser = (AvyUser) principal;
            email = avyUser.getEmail();
        }
        AvyUserDto userDto = avyUserService.getUserDtoByEmail(email);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/info/update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> updateUserInfo(@RequestBody AvyUserUpdateDto avyUserUpdateDto,
            @RequestHeader("Authorization") String authHeader) {
        AvyUser avyUser = avyUserService.getUserByToken(authHeader.substring(7));
        AvyUserDto avyUserDto = avyUserService.updateAvyUserInfo(avyUserUpdateDto, avyUser);
        return ResponseEntity.ok(avyUserDto);
    }

    @PostMapping("/info/updateImage")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> updateUserInfo(@RequestParam("userImage") MultipartFile file,
            @RequestHeader("Authorization") String authHeader) {
        AvyUser avyUser = avyUserService.getUserByToken(authHeader.substring(7));
        AvyUserDto avyUserDto = avyUserService.updateAvyUserImage(file, avyUser);
        return ResponseEntity.ok(avyUserDto);
    }

    @PostMapping("/info/updateEducationHistory")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> updateUserInfo(@Valid @RequestBody EducationDto educationHistory,
                                     @RequestHeader("Authorization") String authHeader) {
        AvyUser avyUser = avyUserService.getUserByToken(authHeader.substring(7));
        return ResponseEntity.ok(avyUserService.updateAvyUserEducationInfo(educationHistory,avyUser));
    }

    @PostMapping("/info/updateWorkExperience")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> updateUserInfo(@Valid @RequestBody WorkExperienceDto workExperience,
                                     @RequestHeader("Authorization") String authHeader) {
        AvyUser avyUser = avyUserService.getUserByToken(authHeader.substring(7));
        return ResponseEntity.ok(avyUserService.updateAvyUserWorkExperienceInfo(workExperience,avyUser));
    }

    @PostMapping("/info/editEducationInfo")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> editEducationHistoryInfo(@Valid @RequestBody EducationDto educationHistory,
                                                               @RequestHeader("Authorization") String authHeader) {
        AvyUser avyUser = avyUserService.getUserByToken(authHeader.substring(7));
        return ResponseEntity.ok(avyUserService.editAvyUserEducation(educationHistory,avyUser));
    }

    @PostMapping("/info/editWorkExperience")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> editWorkExperienceInfo(@Valid @RequestBody WorkExperienceDto workExperience,
                                                             @RequestHeader("Authorization") String authHeader) {
        AvyUser avyUser = avyUserService.getUserByToken(authHeader.substring(7));
        return ResponseEntity.ok(avyUserService.editAvyUserWorkExperience(workExperience,avyUser));
    }

    @DeleteMapping("/info/deleteEducationInfo/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> deleteEducationInfo(@PathVariable Long id,
                                                          @RequestHeader("Authorization") String authToken) {
        AvyUser avyUser = avyUserService.getUserByToken(authToken.substring(7));
        return ResponseEntity.ok(avyUserService.deleteAvyUserEducationInfo(id,avyUser));
    }

    @DeleteMapping("/info/deleteWorkExperience/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> deleteWorkExperienceInfo(@PathVariable Long id,
                                                         @RequestHeader("Authorization") String authToken) {
        AvyUser avyUser = avyUserService.getUserByToken(authToken.substring(7));
        return ResponseEntity.ok(avyUserService.deleteAvyUserWorkExperienceInfo(id,avyUser));
    }

    @PostMapping("/info/updateCV")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> updateCV(@RequestParam("userCV") MultipartFile file,
                                               @RequestHeader("Authorization") String authHeader) {
        AvyUser avyUser = avyUserService.getUserByToken(authHeader.substring(7));
        AvyUserDto avyUserDto = avyUserService.updateAvyUserCV(file, avyUser);
        return ResponseEntity.ok(avyUserDto);
    }

    @GetMapping("/info/openCV/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Resource> openCV(@PathVariable Long userId,
                                           @RequestHeader("Authorization") String authHeader) {
        AvyUser avyUser = avyUserService.getUserByToken(authHeader.substring(7));
        if(Objects.equals(avyUser.getId(), userId)) {
            //TODO remove try catch later!!!
            try {
                Path filePath = Paths.get(avyUser.getLinkToCV());
                log.info(filePath.toString());
                Resource resource = new FileSystemResource(filePath.toFile());
                if (resource.exists()) {
                    return ResponseEntity.ok()
                            .contentType(MediaType.APPLICATION_PDF)
                            .body(resource);
                }
            } catch (Exception e) {
                return ResponseEntity.notFound().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("info/deleteCV/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserDto> deleteCV(@PathVariable Long id,
                                               @RequestHeader("Authorization") String authHeader) {
        AvyUser avyUser = avyUserService.getUserByToken(authHeader.substring(7));
        if(!Objects.equals(avyUser.getId(),id)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(avyUserService.deleteCV(avyUser));
    }

    @PostMapping("/info/search")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<AvyUser>> searchUsers(@RequestBody SearchFilterDto searchFilterDto) {
        return ResponseEntity.ok(avyUserService.searchUsers(searchFilterDto));
    }

    @GetMapping("/light-profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AvyUserLightDto> getCurrentUserDetail(Authentication authentication) {
        String email = "";
        Object principal = authentication.getPrincipal();
        if (principal instanceof AvyUser avyUser) {
            email = avyUser.getEmail();
        }
        AvyUserLightDto byLogin = avyUserService.getAvyUserLightDtoByEmail(email);
        return ResponseEntity.ok(byLogin);
    }

    @GetMapping("/course/progressing")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseDto>> getCourseInProgress(Authentication authentication) {
        String email = "";
        Object principal = authentication.getPrincipal();
        if (principal instanceof AvyUser avyUser) {
            email = avyUser.getEmail();
        }
        return ResponseEntity.ok(avyUserService.getCoursesInProgress(email));
    }

    @GetMapping("/course/completed")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseDto>> getCourseCompleted(Authentication authentication) {
        String email = "";
        Object principal = authentication.getPrincipal();
        if (principal instanceof AvyUser avyUser) {
            email = avyUser.getEmail();
        }
        return ResponseEntity.ok(avyUserService.getCoursesCompleted(email));
    }

    @GetMapping("/course/recommended")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseDto>> getCourseRecommended(Authentication authentication) {
        String email = "";
        Object principal = authentication.getPrincipal();
        if (principal instanceof AvyUser avyUser) {
            email = avyUser.getEmail();
        }
        return ResponseEntity.ok(avyUserService.getCoursesRecommended(email));
    }

    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserByUsername(@PathVariable Long userId) {
        avyUserService.deleteById(userId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/course/start/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CourseProgressFullDto> signUpToCourse(@PathVariable Long courseId,
            @RequestHeader("Authorization") String authHeader) {
        AvyUser user = avyUserService.getUserByToken(authHeader.substring(7));
        Course course = courseService.getEntityById(courseId);
        return ResponseEntity.ok(courseProgressService.startCourseByUser(course, user));
    }

    @GetMapping("/start-lesson/{lessonId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<LessonDto> getLessonById(@PathVariable Long lessonId,
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(lessonService.getDtoById(lessonId));
    }

    @PostMapping("/complete-lesson/{lessonId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CourseProgressDto> completeLesson(@PathVariable Long lessonId,
            @RequestHeader("Authorization") String authHeader) {
        AvyUser user = avyUserService.getUserByToken(authHeader.substring(7));
        Lesson lesson = lessonService.getById(lessonId);
        log.info("ENDPOINT: complete lesson with id " + lesson.getId());
        CourseProgress courseProgress = courseProgressService.completeLesson(lesson, user);
        return ResponseEntity.ok(courseProgressDtoConverter.courseProgressToDto(courseProgress));
    }

    @GetMapping("/get-summary/{lessonId}")
    @PreAuthorize("isAuthenticated")
    public ResponseEntity<String> getLessonSummary(@PathVariable Long lessonId,
                                            @RequestHeader("Authorization") String authHeader) {
        String summary = lessonService.getLessonSummary(lessonId);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/exit-lesson/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CourseProgressDto> exitCourse(@PathVariable Long courseId,
                                                 @RequestHeader("Authorization") String authHeader) {
        AvyUser user = avyUserService.getUserByToken(authHeader.substring(7));
        Course course = courseService.getEntityById(courseId);
        return ResponseEntity.ok(courseProgressService.exitCourse(user,course));
    }

    // endpoint for asking chatbot lesson-related questions
    @PostMapping("/ask-question")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> askLessonRelatedQuestion(@RequestBody QuestionRequest request,
                                               @RequestHeader("Authorization") String authHeader) {
        AvyUser user = avyUserService.getUserByToken(authHeader.substring(7));
        log.info("request received");
        String result = courseProgressService.askQuestion(request,user.getId());
        log.info("sending data to frontend");
        return ResponseEntity.ok(result);
    }

    // endpoint for asking chatbot lesson-related voice questions
    @PostMapping("/ask-voice-question/{lessonId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> askLessonRelatedQuestion(@PathVariable Long lessonId,
                                                    @RequestHeader("Authorization") String authHeader) {
        AvyUser user = avyUserService.getUserByToken(authHeader.substring(7));
        String result = courseProgressService.askQuestion(lessonId,user);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/request-navigation/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> requestNavigation() {
        String result = avyUserService.requestNavigation();
        return ResponseEntity.ok(result);
    }
}
