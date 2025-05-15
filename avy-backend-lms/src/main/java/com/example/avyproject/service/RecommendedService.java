package com.example.avyproject.service;

import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;

public interface RecommendedService {
    void addCourseToRecommendedToAllUsers (Course course);
    void addAllCoursesToUserRecommended (AvyUser avyUser);
    void initRecommendedMethod();
}
