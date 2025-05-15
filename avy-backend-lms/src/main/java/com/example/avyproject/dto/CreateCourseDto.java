package com.example.avyproject.dto;

import com.example.avyproject.entity.AvyUser;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CreateCourseDto {
    private String title;
    private String courseCode;
    private String description;
    private MultipartFile courseImage;
    private String category;
    private String level;
    private List<Integer> modulesId;
}