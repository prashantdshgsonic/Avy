package com.example.avyproject.converter;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminUserDtoConverter {
    private final ModelMapper modelMapper;
/*
    public AdminUser convertCreateDTOToAdminUser(CreateAdminUserDTO createDTO) {
        return modelMapper.map(createDTO, AdminUser.class);
    }

    public AdminUser convertUpdateDTOToAdminUser(UpdateAdminUserDTO updateDTO) {
        return modelMapper.map(updateDTO, AdminUser.class);
    }

 */
}
