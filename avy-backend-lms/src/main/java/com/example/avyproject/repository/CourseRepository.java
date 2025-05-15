package com.example.avyproject.repository;

import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findCoursesByCreator(AvyUser avyUser);

}
