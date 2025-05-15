package com.example.avyproject.converter;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ModuleItemDtoConverter {
    private final ModelMapper modelMapper;
/*
    public Lesson convertCreateDTOToAdminUser(CreateModuleItemDTO createDTO) {
        return modelMapper.map(createDTO, Lesson.class);
    }

    public Lesson convertUpdateDTOToAdminUser(UpdateModuleItemDTO updateDTO) {
        return modelMapper.map(updateDTO, Lesson.class);
    }

 */
}
