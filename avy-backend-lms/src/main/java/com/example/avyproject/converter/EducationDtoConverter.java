package com.example.avyproject.converter;

import com.example.avyproject.dto.EducationDto;
import com.example.avyproject.entity.Education;
import com.example.avyproject.enums.Degrees;
import org.springframework.stereotype.Component;

@Component
public class EducationDtoConverter {
    public static Education convertDtoToEducation(EducationDto educationDto) {
       return Education.builder()
                .institutionTitle(educationDto.getInstitutionTitle())
                .specialization(educationDto.getSpecialization())
                .degree(Degrees.fromText(educationDto.getDegree()))
                .startDate(educationDto.getStartDate())
                .endDate(educationDto.getEndDate())
                .build();
    }
    public static EducationDto convertEducationToDto(Education education) {
        return EducationDto.builder()
                .id(education.getId())
                .institutionTitle(education.getInstitutionTitle())
                .specialization(education.getSpecialization())
                .degree(education.getDegree().toString())
                .startDate(education.getStartDate())
                .endDate(education.getEndDate())
                .build();
    }
}
