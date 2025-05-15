package com.example.avyproject.service;

import com.example.avyproject.dto.WorkExperienceDto;
import com.example.avyproject.entity.WorkExperience;
import com.example.avyproject.repository.WorkExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkExperienceServiceImpl implements WorkExperienceService {

    private final WorkExperienceRepository workExperienceRepository;

    @Override
    public WorkExperience createWorkExperience(WorkExperienceDto workExperienceDto) {
//        workExperienceRepository.save()
        return null;
    }
}
