/*
package com.example.avyproject.service;

import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;
import com.example.avyproject.entity.CourseProgress;
import com.example.avyproject.entity.Role;
import com.example.avyproject.repository.CourseProgressRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class CourseProgressServiceImplTest {

    @Mock
    private CourseProgressRepository courseProgressRepository;

    @InjectMocks
    private CourseProgressServiceImpl courseProgressService;

    @Test
    void getCoursesInProgress() {
        Long userId = 1L;
        String inProgressStatus = "IN_PROGRESS";
        List<CourseProgress> expectedCourseProgressList = createCourseProgressList(inProgressStatus);
        Mockito
                .when(courseProgressRepository.findByUserIdAndStatus(userId, inProgressStatus))
                .thenReturn(expectedCourseProgressList);
        List<CourseProgress> resultList = courseProgressService.getCoursesInProgress(userId);
        Mockito
                .verify(courseProgressRepository).findByUserIdAndStatus(userId, inProgressStatus);
        assertEquals(expectedCourseProgressList, resultList);
    }

    @Test
    void getCoursesCompleted() {
        Long userId = 1L;
        String inProgressStatus = "COMPLETED";
        List<CourseProgress> expectedCourseProgressList = createCourseProgressList(inProgressStatus);
        Mockito
                .when(courseProgressRepository.findByUserIdAndStatus(userId, inProgressStatus))
                .thenReturn(expectedCourseProgressList);
        List<CourseProgress> resultList = courseProgressService.getCoursesCompleted(userId);
        Mockito
                .verify(courseProgressRepository).findByUserIdAndStatus(userId, inProgressStatus);
        assertEquals(expectedCourseProgressList, resultList);
    }

*/
/*    private List<CourseProgress> createCourseProgressList(String status) {
        return Arrays.asList(new CourseProgress(1L,
                        new AvyUser(1L, "FirstNameOne", "LastNameOne", "emailOne@gmail.com",
                                "userNameOne", "Password10", "lintToAvatarOne",
                                "linkToImageOne", LocalDate.now(), Set.of(new Role(1L, "user"))
                        ), new Course(), "PROGRESS", status, LocalDate.now()),
                new CourseProgress(2L,
                        new AvyUser(2L, "FirstNameTwo", "LastNameTwo", "emailTwo@gmail.com",
                                "userNameTwo", "Password20", "lintToAvatarTwo",
                                "linkToImageTwo", LocalDate.now(), Set.of(new Role(1L, "user"))
                        ), new Course(), "PROGRESS", status, LocalDate.now()));
    }*//*

}*/
