package com.example.avyproject.dto;

import com.example.avyproject.entity.Award;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CourseProgressDto {
    private Long id;
    private Long userId;
    private Long courseId;
    private int progress; // Прогресс в процентах или какой-либо другой метрике
    private String status; // Например, "in progress", "completed","recommended"
    private LocalDate lastAccessed;
    private long nextLessonId;
    private boolean isModuleCompleted;

    private List<AchievementDto> userAchievements;
    private List<AwardDto> userAwards;
    private AwardDto currentModuleAward;
    private int userCoins;
    private String nextModuleTitle;
    private String completedModuleTitle;
    private String nextLessonTitle;
    private Boolean isExited;
    private LocalDate lastExited;
}
