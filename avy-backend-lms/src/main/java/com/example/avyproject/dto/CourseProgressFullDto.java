package com.example.avyproject.dto;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CourseProgressFullDto {
    private Long id;
    private Long userId;
    private Long courseId;
    private int progress; // Прогресс в процентах или какой-либо другой метрике
    private String status; // Например, "in progress", "completed","recommended"
    private LocalDate lastAccessed;

    private int moduleProgress;
    private String currentModuleTitle;
    private String nextLessonTitle;
    private long nextLessonId;


}
