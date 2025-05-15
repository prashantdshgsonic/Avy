package com.example.avyproject.dto;

import com.example.avyproject.entity.Lesson;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CreateAvyModuleDto {
    private String title;
    private String description;
//    private MultipartFile moduleImage;
    private Long courseId;
    private List<Lesson> items;
}
