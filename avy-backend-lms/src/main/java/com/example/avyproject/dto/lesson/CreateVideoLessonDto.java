package com.example.avyproject.dto.lesson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateVideoLessonDto extends CreateLessonDto{
    private String fileName;
    private String fileType;
    private MultipartFile lessonVideo;
}
