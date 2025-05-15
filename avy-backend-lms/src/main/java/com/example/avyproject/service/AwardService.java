package com.example.avyproject.service;

import com.example.avyproject.dto.AchievementDto;
import com.example.avyproject.dto.AwardDto;
import java.util.List;

/**
 * Interface that defines operations related to Awards.
 */
public interface AwardService {
    /**
     * Creates a new award based on the provided {@link AwardDto} object.
     *
     * @param awardDto An object of type {@link AwardDto} containing information about the new award.
     * @return The created award as an object of type {@link AwardDto}.
     * //@throws SomeException if there is a specific error while creating the award.
     */
    AwardDto createAward(AwardDto awardDto);

    /**
     * Retrieves an {@link AwardDto} object by its unique identifier.
     *
     * @param id The unique identifier of the award.
     * @return The {@link AwardDto} object corresponding to the provided ID, or null if not found.
     * //@throws SomeException if there is a specific error while retrieving the award.
     */
    AwardDto getAwardById(Long id);

    /**
     * Retrieves a list of all {@link AwardDto} objects.
     *
     * @return A {@link List} containing all available {@link AwardDto} objects, or an empty list if none are found.
     * //@throws SomeException if there is a specific error while retrieving the awards.
     */
    List<AwardDto> getAllAwards();

    /**
     * Updates an {@link AwardDto} object with new information.
     *
     * @param awardDto The {@link AwardDto} object containing updated information.
     * @return The updated {@link AwardDto} object after the modification.
     * //@throws SomeException if there is a specific error while updating the award.
     */
    AwardDto updateAward(AwardDto awardDto);

    /**
     * Deletes an {@link AwardDto} object identified by the given ID.
     *
     * @param id The unique identifier of the award to be deleted.
     * @return A message indicating the result of the deletion operation.
     * //@throws SomeException if there is a specific error while deleting the award.
     */
    String deleteAwardById(Long id);

    List<AwardDto> getAwardByUserId(Long userId);
}
