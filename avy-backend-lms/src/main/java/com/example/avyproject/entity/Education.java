package com.example.avyproject.entity;

import com.example.avyproject.enums.Degrees;
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
@Builder
@EqualsAndHashCode(exclude = {"id"})
public class Education {
    @Id
    @GeneratedValue
    private Long id;
    private String institutionTitle;
    private String specialization;
    @Enumerated(EnumType.STRING)
    private Degrees degree;
    private LocalDate startDate;
    private LocalDate endDate;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AvyUser avyUser;
}
