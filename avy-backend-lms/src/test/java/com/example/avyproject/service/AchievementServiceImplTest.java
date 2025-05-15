package com.example.avyproject.service;

import com.example.avyproject.converter.AchievementDtoConverter;
import com.example.avyproject.dto.AchievementDto;
import com.example.avyproject.entity.Achievement;
import com.example.avyproject.exceptions.EntityNotFoundException;
import com.example.avyproject.repository.AchievementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.transaction.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class AchievementServiceImplTest {

    @Mock
    private AchievementRepository achievementRepository;

    @Mock
    private AchievementDtoConverter achievementDtoConverter;

    @InjectMocks
    private AchievementServiceImpl achievementService;

    @Test
    @Transactional
    void createAchievement() {
        AchievementDto achievementDto = new AchievementDto();
        Achievement achievement = new Achievement();
        Mockito
                .when(achievementDtoConverter.dtoToAchievement(achievementDto))
                .thenReturn(achievement);
        Mockito
                .when(achievementDtoConverter.achievementToDto(achievement))
                .thenReturn(achievementDto);
        AchievementDto resultDto = achievementService.createAchievement(achievementDto);
        Mockito
                .verify(achievementDtoConverter, times(1)).dtoToAchievement(achievementDto);
        Mockito
                .verify(achievementDtoConverter, times(1)).achievementToDto(achievement);
        assertEquals(achievementDto, resultDto);
    }

    @Test
    @Transactional
    void getAchievementById_ExistingAch() {
        Long achievementId = 1L;
        Achievement achievement = new Achievement();
        achievement.setId(achievementId);
        AchievementDto achievementDto = new AchievementDto();
        achievementDto.setId(achievementId);
        Mockito
                .when(achievementRepository.findById(achievementId))
                .thenReturn(Optional.of(achievement));
        Mockito
                .when(achievementDtoConverter.achievementToDto(achievement))
                .thenReturn(achievementDto);
        AchievementDto resultDto = achievementService.getAchievementById(achievementId);
        Mockito
                .verify(achievementRepository, times(1)).findById(achievementId);
        Mockito
                .verify(achievementDtoConverter, times(1)).achievementToDto(achievement);
        assertEquals(achievementDto, resultDto);
    }

    @Test
    @Transactional
    void getAchievementById_NonExistingAch() {
        Long achievementId = 2L;
        Mockito
                .when(achievementRepository.findById(achievementId))
                .thenReturn(Optional.empty());
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> achievementService.getAchievementById(achievementId));
        assertEquals("Achievement with ID 2 not found", exception.getMessage());
    }

    @Test
    @Transactional
    void getAllAchievements() {
        List<Achievement> achievements = Arrays.asList(new Achievement(),
                new Achievement());
        List<AchievementDto> achievementsDto = Arrays.asList(new AchievementDto(),
                new AchievementDto());

        Mockito
                .when(achievementRepository.findAll())
                .thenReturn(achievements);
        Mockito
                .when(achievementDtoConverter.achievementToDtos(achievements))
                .thenReturn(achievementsDto);
        List<AchievementDto> resultDtos = achievementService.getAllAchievements();
        Mockito
                .verify(achievementRepository, times(1)).findAll();
        Mockito
                .verify(achievementDtoConverter, times(1)).achievementToDtos(achievements);
        assertEquals(achievementsDto, resultDtos);
    }

    @Test
    void updateAchievement() {
        AchievementDto inputAchievementDto = new AchievementDto();
        Achievement inputAchievement = new Achievement();
        Achievement savedAchievement = new Achievement();
        Mockito
                .when(achievementDtoConverter.dtoToAchievement(inputAchievementDto))
                .thenReturn(inputAchievement);
        Mockito
                .when(achievementRepository.save(inputAchievement))
                .thenReturn(savedAchievement);
        Mockito
                .when(achievementDtoConverter.achievementToDto(savedAchievement))
                .thenReturn(inputAchievementDto);
        AchievementDto resultAchievementDto = achievementService.updateAchievement(inputAchievementDto);
        Mockito
                .verify(achievementDtoConverter).dtoToAchievement(inputAchievementDto);
        Mockito
                .verify(achievementRepository).save(inputAchievement);
        Mockito
                .verify(achievementDtoConverter).achievementToDto(savedAchievement);
        assertEquals(inputAchievementDto, resultAchievementDto);
    }
}