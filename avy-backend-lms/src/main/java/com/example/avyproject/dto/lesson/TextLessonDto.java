package com.example.avyproject.dto.lesson;

import com.example.avyproject.entity.AvyModule;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TextLessonDto extends LessonDto{
    private String textContent;
}
