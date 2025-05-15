package com.example.avyproject.dto;

import com.example.avyproject.entity.embeddable.Asset;
import lombok.*;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AvyUserLightDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String state;
    private String city;
    private String country;
    private String userName;
    private int coursesInProgress; // int количество
    private int coursesCompleted; // int количество
    private int coursesRecommended; // int количество
    private Integer coins; // Общее количество монет пользователя
    private List<AchievementDto> achievements;
    private List<AwardDto> awards;
    private List<String> roles; //стринги ролей
    private int avatarId;
    private String userJob;
    private String userLinkedIn;
    private String linkToImage;
    private Set<WorkExperienceDto> workExperience;
    private Set<EducationDto> educationHistory;
    private String linkToCV;
    private Set<Asset> assets;
}
