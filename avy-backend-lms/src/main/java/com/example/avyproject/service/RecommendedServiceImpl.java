package com.example.avyproject.service;

import com.example.avyproject.dto.CourseProgressDto;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendedServiceImpl implements RecommendedService {

    private final CourseProgressService courseProgressService;
    private final CourseService courseService;
    private final AvyUserService avyUserService;

    public RecommendedServiceImpl(CourseProgressService courseProgressService, @Lazy CourseService courseService, @Lazy AvyUserService avyUserService) {
        this.courseProgressService = courseProgressService;
        this.courseService = courseService;
        this.avyUserService = avyUserService;
    }

    @Override
    public void addCourseToRecommendedToAllUsers(Course course) {
        List<AvyUser> allUsers = avyUserService.getAllUsers();
        for (AvyUser avyUser : allUsers) {
            CourseProgressDto courseProgressDto = new CourseProgressDto();
            courseProgressDto.setStatus("RECOMMENDED");
            if (avyUser.getRoles().stream().anyMatch(role -> "ROLE_USER".equals(role.getRoleName()))) {
//                System.out.println("Name"+avyUser.getFirstName());
                courseProgressService.createCourseProgress(courseProgressDto, course, avyUser);
            }
        }
    }

    @Override
    public void addAllCoursesToUserRecommended(AvyUser avyUser) {
        if (avyUser.getRoles().stream().noneMatch(role -> "ROLE_USER".equals(role.getRoleName()))) {
            return;
        }
        List<Course> allCourses = courseService.getAll();
        for (Course course : allCourses) {
            CourseProgressDto courseProgressDto = new CourseProgressDto();
            courseProgressDto.setStatus("RECOMMENDED");
//            System.out.println("title course "+course.getTitle());
            courseProgressService.createCourseProgress(courseProgressDto, course, avyUser);
        }
    }


    //method initial add all courses as recommended to all users
    @Override
    public void initRecommendedMethod() {
        List<AvyUser> allUsers = avyUserService.getAllUsers();
        List<Course> allCourses = courseService.getAll();
        for (AvyUser avyUser : allUsers) {
            if (avyUser.getRoles().stream().anyMatch(role -> "ROLE_USER".equals(role.getRoleName()))) {
                for (Course course : allCourses) {
                    CourseProgressDto courseProgressDto = new CourseProgressDto();
                    courseProgressDto.setStatus("RECOMMENDED");
//            System.out.println("User name "+avyUser.getLastName()+" and Id" + avyUser.getId());
//            System.out.println("Title course "+course.getTitle()+" and Id" + course.getId());
                    courseProgressService.createCourseProgress(courseProgressDto, course, avyUser);
                }
            }
        }
    }
}
