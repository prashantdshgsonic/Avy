package com.example.avyproject.repository;

import com.example.avyproject.entity.TextLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TextLessonRepository extends JpaRepository<TextLesson, Long> {

}
