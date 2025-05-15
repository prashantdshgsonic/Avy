package com.example.avyproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@Builder
@ToString(exclude = "course")
@NoArgsConstructor
public class AvyModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String linkToImage;
    private Integer moduleOrder;

    @JsonBackReference
    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id")
    private Course course;

    @JsonManagedReference
    @OneToMany(mappedBy = "avyModule", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lesson> items;

}
