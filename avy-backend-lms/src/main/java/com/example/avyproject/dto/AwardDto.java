package com.example.avyproject.dto;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AwardDto {
    private Long id;
    private Long userId;
    private String type; // Например, "medal", "certificate"
    private String description;
    private LocalDate dateEarned;
}
