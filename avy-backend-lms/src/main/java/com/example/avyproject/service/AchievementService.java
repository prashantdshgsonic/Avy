package com.example.avyproject.service;

import com.example.avyproject.dto.AchievementDto;

import java.util.List;

/**
 * Service interface defining operations related to achievements.
 * Implementations of this interface handle functionalities for managing achievements.
 */
public interface AchievementService {
    /**
     * Creates a new achievement entry based on the provided AchievementDto.
     *
     * @param achievementDto The AchievementDto object containing details for the new achievement.
     * @return AchievementDto object representing the created achievement entry.
     */
    AchievementDto createAchievement(AchievementDto achievementDto);

    /**
     * Retrieves achievement information based on the provided identifier.
     *
     * @param id The unique identifier of the achievement entry to retrieve.
     * @return AchievementDto object representing the achievement identified by the given ID.
     */
    AchievementDto getAchievementById(Long id);

    /**
     * Retrieves a list containing all achievement entries.
     *
     * @return List of AchievementDto objects representing all achievement entries.
     */
    List<AchievementDto> getAllAchievements();

    /**
     * Updates the achievement based on the provided AchievementDto.
     *
     * @param achievementDto The AchievementDto object containing updated achievement information.
     * @return AchievementDto object representing the updated achievement entry.
     */
    AchievementDto updateAchievement(AchievementDto achievementDto);

    /**
     * Deletes the achievement entry identified by the provided identifier.
     *
     * @param id The unique identifier of the achievement entry to be deleted.
     * @return A message indicating the result of the deletion operation.
     */
    String deleteAchievementById(Long id);

    List<AchievementDto> getAchievementsByUserId(Long userId);
}
