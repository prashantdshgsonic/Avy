package com.example.avyproject.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Setter
@Getter
@AllArgsConstructor
@Builder
@ToString
@NoArgsConstructor
@Table(name = "quiz_module_item")
public class QuizLesson extends Lesson{
    private int quizType;
    @Column(length = 15000)
    private String quizData;
}
