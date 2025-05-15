package com.example.avyproject.converter;

import com.example.avyproject.dto.AdminUserDto;
import com.example.avyproject.dto.DtoConverter;
import com.example.avyproject.entity.AdminUser;
import org.springframework.stereotype.Component;

@Component
public class AdminUserConverter implements DtoConverter<AdminUser, AdminUserDto> {
    @Override
    public AdminUserDto toDto(AdminUser entity) {
        return null;
    }

    @Override
    public AdminUser toEntity(AdminUserDto dto) {
        return null;
    }
}
