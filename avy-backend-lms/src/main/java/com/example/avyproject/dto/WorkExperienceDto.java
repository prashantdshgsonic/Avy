package com.example.avyproject.dto;

import lombok.*;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class WorkExperienceDto {
    private Long id;

    @NotNull(message = "empty company title value")
    @Size(min = 3, max = 255, message = "Invalid number of characters")
    private String companyTitle;

    @NotNull(message = "empty position value")
    @Size(min = 3, max = 255, message = "Invalid number of characters")
    private String position;

    @NotNull(message = "empty description value")
    @Size(min = 3, max = 255, message = "Invalid number of characters")
    private String description;

    @NotNull(message = "empty start date value")
    @Past(message = "invalid start date")
    private LocalDate startDate;

    @NotNull(message = "empty end date value")
    private LocalDate endDate;
}
