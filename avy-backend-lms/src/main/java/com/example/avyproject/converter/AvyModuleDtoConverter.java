package com.example.avyproject.converter;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AvyModuleDtoConverter {
    private final ModelMapper modelMapper;
/*
    public AvyModule convertCreateDTOToAvyModule(CreateAvyModuleDTO createDTO) {
        return modelMapper.map(createDTO, AvyModule.class);
    }

    public  AvyModule convertUpdateDTOToAvyModule(UpdateAvyModuleDTO updateDTO) {
        return modelMapper.map(updateDTO, AvyModule.class);
    }

 */
}
