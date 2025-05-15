package com.example.avyproject.dto;

import com.example.avyproject.entity.AvyUser;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AchievementDto {
    private Long id;
    private Long userId;
    private String description;
    private LocalDate dateEarned;
}
