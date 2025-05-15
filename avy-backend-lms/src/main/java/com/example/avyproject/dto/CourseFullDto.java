package com.example.avyproject.dto;

import com.example.avyproject.entity.AvyModule;
import com.example.avyproject.entity.AvyUser;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CourseFullDto {
    private Long id;
    private String title;
    private String courseCode;
    private String description;
    private String courseImage;
    private String category;
    private String level;
    private String status;
    private AvyUserLightDto creator;
    private LocalDate creationDate; // created?
    private LocalDate lastUpdateDate; // updated?
    private List<AvyModuleDto> modules;
    private String collectionMintAddress;
    private List<Long> participants;
}
