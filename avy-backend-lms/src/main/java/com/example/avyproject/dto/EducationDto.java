package com.example.avyproject.dto;

import com.example.avyproject.service.utility.customAnnotation.Degree;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class EducationDto {
    private Long id;

    @NotNull(message = "empty institution title value")
    @Size(min = 3, max = 244, message = "Invalid number of characters")
    private String institutionTitle;

    @NotNull(message = "empty specialization value")
    @Size(min = 3, max = 244, message = "Invalid number of characters")
    private String specialization;

    @Degree
    private String degree;

    @NotNull(message = "empty start date value")
    @Past(message = "invalid start date")
    private LocalDate startDate;

    @NotNull(message = "empty end date value")
    private LocalDate endDate;
}
