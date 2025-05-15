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
@Table(name = "text_module_item")
public class TextLesson extends Lesson {

    @Column(length = 10000)
    private String textContent;
}
