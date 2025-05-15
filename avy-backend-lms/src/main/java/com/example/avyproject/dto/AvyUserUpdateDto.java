package com.example.avyproject.dto;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AvyUserUpdateDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String state;
    private String city;
    private String country;
    private int avatarId;
    private String userJob;
    private String userLinkedIn;
    private Set<WorkExperienceDto> workExperience = new HashSet<>();
    private Set<EducationDto> educationHistory = new HashSet<>();
//    private MultipartFile userImage;
}
