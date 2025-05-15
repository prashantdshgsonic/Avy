package com.example.avyproject.service;

import com.example.avyproject.converter.AchievementDtoConverter;
import com.example.avyproject.dto.AchievementDto;
import com.example.avyproject.entity.Achievement;
import com.example.avyproject.exceptions.EntityNotFoundException;
import com.example.avyproject.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the AchievementService interface
 * providing operations related to achievements.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AchievementServiceImpl implements AchievementService{
    private final AchievementRepository achievementRepository;
    private final AchievementDtoConverter achievementDtoConverter;

    /**
     * Creates a new achievement based on the provided AchievementDto.
     *
     * @param achievementDto The AchievementDto object containing details for the new achievement.
     * @return AchievementDto object representing the created achievement entry.
     */
    @Override
    @Transactional
    public AchievementDto createAchievement(AchievementDto achievementDto) {
        Achievement achievement = achievementDtoConverter.dtoToAchievement(achievementDto);
        achievementRepository.save(achievement);
        log.info("Achievement created. " + achievement);
        return achievementDtoConverter.achievementToDto(achievement);
    }

    /**
     * Retrieves achievement information based on the provided identifier.
     *
     * @param id The unique identifier of the achievement entry to retrieve.
     * @return AchievementDto object representing the achievement identified by the given ID.
     * @throws EntityNotFoundException if no achievement with the provided ID is found.
     */
    @Override
    @Transactional
    public AchievementDto getAchievementById(Long id) {
        Achievement achievement = achievementRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Achievement with ID %d not found", id))
        );
        log.info("Get achievement with id: " + id + " achievement: " + achievement);
        return achievementDtoConverter.achievementToDto(achievement);
    }

    /**
     * Retrieves a list containing all achievement entries.
     *
     * @return List of AchievementDto objects representing all achievement entries.
     */
    @Override
    @Transactional
    public List<AchievementDto> getAllAchievements() {
        List<Achievement> achievements = achievementRepository.findAll();
        log.info("Get all achievements.");
        return achievementDtoConverter.achievementToDtos(achievements);
    }

    /**
     * Updates the achievement based on the provided AchievementDto.
     *
     * @param achievementDto The AchievementDto object containing updated achievement information.
     * @return AchievementDto object representing the updated achievement entry.
     */
    @Override
    @Transactional
    public AchievementDto updateAchievement(AchievementDto achievementDto) {
        Achievement achievement = achievementDtoConverter.dtoToAchievement(achievementDto);
        achievement = achievementRepository.save(achievement);
        log.info("Achievement updated. " + achievement);
        return achievementDtoConverter.achievementToDto(achievement);
    }

    /**
     * Deletes the achievement entry identified by the provided identifier.
     *
     * @param id The unique identifier of the achievement entry to be deleted.
     * @return A message indicating the result of the deletion operation.
     */
    @Override
    @Transactional
    public String deleteAchievementById(Long id) {
        achievementRepository.deleteById(id);
        String message = "Achievement with id: " + id + " deleted!";
        log.info(message);
        return message;
    }

    @Override
    public List<AchievementDto> getAchievementsByUserId(Long userId) {
        List<Achievement> allByUserId = achievementRepository.findAllByUserId(userId);
        List<AchievementDto> collect = allByUserId.stream()
                .map(achievementDtoConverter::achievementToDto)
                .collect(Collectors.toList());
        return collect;
    }
}
