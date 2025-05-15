package com.example.avyproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString(exclude = "avyUser")
@EqualsAndHashCode(exclude = "id")
public class WorkExperience {
    @Id
    @GeneratedValue
    private Long id;
    private String companyTitle;
    private String position;
    private String description;
//    @Past(message = "Invalid start date value")
    private LocalDate startDate;
    private LocalDate endDate;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private AvyUser avyUser;
}
