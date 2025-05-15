package com.example.avyproject.dto.lesson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class VideoLessonDto extends LessonDto{
    private String fileName;
    private String fileType;
    private String linkToVideo;
}
