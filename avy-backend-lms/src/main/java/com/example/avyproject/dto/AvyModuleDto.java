package com.example.avyproject.dto;

import com.example.avyproject.dto.lesson.LessonDto;
import com.example.avyproject.entity.Lesson;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AvyModuleDto {
    private Long id;
    private String title;
    private String description;
    private Integer moduleOrder;
    private Long courseId;
    private List<LessonDto> items;
}
