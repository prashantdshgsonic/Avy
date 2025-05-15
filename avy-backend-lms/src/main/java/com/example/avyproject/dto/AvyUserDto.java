package com.example.avyproject.dto;

import com.example.avyproject.entity.embeddable.Asset;
import lombok.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AvyUserDto {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String state;
        private String city;
        private String country;
        private String userName;
        private String linkToAvatar;
        private String linkToImage;
        private LocalDate creationDate; // created?
        private List<CourseProgressDto> coursesInProgress;
        private List<CourseProgressDto> coursesCompleted;
        private List<CourseProgressDto> coursesRecommended;
        private Integer coins; // Общее количество монет пользователя
        private List<AchievementDto> achievements;
        private List<AwardDto> awards;
        private int avatarId;
        private String userJob;
        private String userLinkedIn;
        private Set<WorkExperienceDto> workExperience;
        private Set<EducationDto> educationHistory;
        private String linkToCV;
        private Set<Asset> assets;
}
