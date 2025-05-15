package com.example.avyproject.service;

import com.example.avyproject.dto.WorkExperienceDto;
import com.example.avyproject.entity.WorkExperience;

public interface WorkExperienceService {
    WorkExperience createWorkExperience(WorkExperienceDto workExperienceDto);
}
