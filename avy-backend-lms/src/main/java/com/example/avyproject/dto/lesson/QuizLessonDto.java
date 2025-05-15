package com.example.avyproject.dto.lesson;

import com.fasterxml.jackson.annotation.JsonRawValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QuizLessonDto extends LessonDto{
    private int quizType;
    @JsonRawValue
    private String quizData;
}
