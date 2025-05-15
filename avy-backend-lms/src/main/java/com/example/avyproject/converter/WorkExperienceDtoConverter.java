package com.example.avyproject.converter;

import com.example.avyproject.dto.WorkExperienceDto;
import com.example.avyproject.entity.WorkExperience;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WorkExperienceDtoConverter {
    private final ModelMapper modelMapper;
    public WorkExperience convertDtoToWorkExperience(WorkExperienceDto workExperienceDto) {
        return modelMapper.map(workExperienceDto,WorkExperience.class);
    }
    public WorkExperienceDto convertWorkExperienceToDto(WorkExperience workExperience) {
        return modelMapper.map(workExperience, WorkExperienceDto.class);
    }
}
