package com.example.avyproject.service;

import com.example.avyproject.dto.CreateAvyModuleDto;
import com.example.avyproject.entity.AvyModule;
import com.example.avyproject.entity.AvyUser;

public interface AvyModuleService {
    AvyModule createModule(CreateAvyModuleDto createAvyModuleDto, AvyUser creator);

    AvyModule getById(Long moduleId);

    AvyModule getByIdAndCreatorId(Long moduleId, Long creatorId);

}
