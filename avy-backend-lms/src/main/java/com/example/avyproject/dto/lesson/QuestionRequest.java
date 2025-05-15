package com.example.avyproject.dto.lesson;

import lombok.*;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionRequest {
    private String question;
    private Long lessonId;
}
