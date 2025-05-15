package com.example.avyproject.dto.lesson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateQuizLessonDto extends CreateLessonDto{
    private int quizType;
    private String quizData;
}
