package com.example.avyproject.converter;

import com.example.avyproject.dto.CourseProgressDto;
import com.example.avyproject.entity.CourseProgress;
import org.springframework.stereotype.Component;

@Component
public class CourseProgressConverter {
    public CourseProgressDto convertToDTO (CourseProgress courseProgress) {
        if (courseProgress == null) {
            return null;
        }

        return CourseProgressDto.builder()
                .id(courseProgress.getId())
                .userId(courseProgress.getUser() != null ? courseProgress.getUser().getId() : null)
                .courseId(courseProgress.getCourse() != null ? courseProgress.getCourse().getId() : null)
                .progress(courseProgress.getProgress())
                .status(courseProgress.getStatus())
                .lastAccessed(courseProgress.getLastAccessed())
                .build();
    }
}
