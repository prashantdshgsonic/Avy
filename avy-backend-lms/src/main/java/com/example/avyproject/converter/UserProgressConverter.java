package com.example.avyproject.converter;

import com.example.avyproject.dto.UserProgressDto;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.UserProgress;
import com.example.avyproject.service.AvyUserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class UserProgressConverter {
    private final ModelMapper mapper;
    private final AvyUserService avyUserService;

    public UserProgressConverter(@Lazy AvyUserService avyUserService, ModelMapper mapper) {
        this.avyUserService = avyUserService;
        this.mapper = mapper;
    }

    public UserProgressDto toDto (UserProgress userProgress){
        UserProgressDto dto = mapper.map(userProgress, UserProgressDto.class);
        dto.setUserId(userProgress.getUser().getId());
        return dto;
    }

    public UserProgress toEntity (UserProgressDto userProgressDto){
        AvyUser user = avyUserService.getById(userProgressDto.getUserId());
        UserProgress entity = mapper.map(userProgressDto,UserProgress.class);
        entity.setUser(user);
        return entity;
    }

}
