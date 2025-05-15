package com.example.avyproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@Builder
@ToString(exclude = {"avyModuleList","courseProgressList"})
@NoArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String courseCode;
    @Column(length = 1500)
    private String description;
    private String linkToImage;
    private String category;
    private String level;
    private String collectionMintAddress;

    @JsonManagedReference
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List <AvyModule> avyModuleList;
    private String status;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "admin_user_id")
    private AvyUser creator;
    private LocalDate creationDate;
    private LocalDate lastUpdateDate;

    @JsonManagedReference
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<CourseProgress> courseProgressList;

}
