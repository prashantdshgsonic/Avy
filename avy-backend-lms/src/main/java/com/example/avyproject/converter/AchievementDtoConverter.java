package com.example.avyproject.converter;
import com.example.avyproject.dto.AchievementDto;
import com.example.avyproject.entity.Achievement;
import com.example.avyproject.service.AvyUserService;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
public class AchievementDtoConverter{
    private final ModelMapper mapper;
    private final AvyUserService avyUserService;

    public AchievementDtoConverter(@Lazy AvyUserService avyUserService,ModelMapper mapper) {
        this.avyUserService = avyUserService;
        this.mapper = mapper;
    }

    /**
     * Maps an AchievementDto object to an Achievement entity.
     *
     * @param achievementDto The AchievementDto object to be mapped.
     * @return Achievement entity representing the mapped AchievementDto.
     */
    public Achievement dtoToAchievement(AchievementDto achievementDto) {
        Achievement entity = mapper.map(achievementDto, Achievement.class);
        entity.setUser(avyUserService.getById(achievementDto.getUserId()));
        return entity;
    }

    /**
     * Maps a list of Achievement entities to a list of AchievementDto objects.
     *
     * @param achievements The list of Achievement entities to be mapped.
     * @return List of AchievementDto objects representing the mapped Achievement entities.
     */
    public List<AchievementDto> achievementToDtos(List<Achievement> achievements) {
        return achievements.stream()
                .map(el -> mapper.map(el,AchievementDto.class))
                .toList();
    }

    /**
     * Maps an Achievement entity to an AchievementDto object.
     *
     * @param achievement The Achievement entity to be mapped.
     * @return AchievementDto object representing the mapped Achievement entity.
     */
    public AchievementDto achievementToDto(Achievement achievement) {
        AchievementDto dto = mapper.map(achievement, AchievementDto.class);
        dto.setUserId(achievement.getUser().getId());
        return dto;
    }
}
