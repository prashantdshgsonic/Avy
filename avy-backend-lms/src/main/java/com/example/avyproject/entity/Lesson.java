package com.example.avyproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String itemType; // например "text", "video", "crossword", "quiz"
    private Integer itemOrder;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avymodule_id")
    private AvyModule avyModule;
    private Long moduleId;
    @JsonBackReference
    @OneToMany(orphanRemoval = true, mappedBy = "lesson", cascade = CascadeType.ALL)
    private Set<LessonProgress> lessonProgresses;
}