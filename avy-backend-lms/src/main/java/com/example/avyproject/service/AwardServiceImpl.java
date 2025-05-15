package com.example.avyproject.service;

import com.example.avyproject.converter.AwardDtoConverter;
import com.example.avyproject.dto.AwardDto;
import com.example.avyproject.entity.Award;
import com.example.avyproject.exceptions.EntityNotFoundException;
import com.example.avyproject.repository.AwardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the AwardService interface handling award-related operations.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AwardServiceImpl implements AwardService {
    // @Autowired ?
    private final AwardRepository awardRepository;
    private final AwardDtoConverter awardDtoConverter;

    /**
     * Creates a new award based on the provided {@link AwardDto}.
     *
     * @param awardDto The {@link AwardDto} object containing information about the new award.
     * @return The created {@link AwardDto} object.
     */
    @Override
    @Transactional
    public AwardDto createAward(AwardDto awardDto) {
        Award award = awardDtoConverter.dtoToAward(awardDto);
        AwardDto save = awardDtoConverter.awardToDto(awardRepository.save(award));
        log.info("Award created. " + save);
        return save;
    }


    /**
     * Retrieves an {@link AwardDto} object by its unique identifier.
     *
     * @param id The unique identifier of the award.
     * @return The {@link AwardDto} object corresponding to the provided ID.
     * @throws EntityNotFoundException if the award with the given ID is not found.
     */
    @Override
    @Transactional
    public AwardDto getAwardById(Long id) {
        Award award = awardRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Award with ID %d not found", id))
        );
        log.info("Get award with id: " + id + " award: " + award);
        return awardDtoConverter.awardToDto(award);
    }

    /**
     * Retrieves a list of all {@link AwardDto} objects.
     *
     * @return A list containing all available {@link AwardDto} objects.
     */
    @Override
    @Transactional
    public List<AwardDto> getAllAwards() {
        List<Award> awards = awardRepository.findAll();
        log.info("Get all awards.");
        return awardDtoConverter.awardsToDtos(awards);
    }

    /**
     * Updates an {@link AwardDto} object in the database.
     *
     * @param awardDto The {@link AwardDto} object containing updated information.
     * @return The updated {@link AwardDto} object.
     */
    @Override
    @Transactional
    public AwardDto updateAward(AwardDto awardDto) {
        Award award = awardDtoConverter.dtoToAward(awardDto);
        award = awardRepository.save(award);
        log.info("Award updated. " + award);
        return awardDtoConverter.awardToDto(award);
    }

    /**
     * Deletes an {@link Award} by its unique identifier.
     *
     * @param id The unique identifier of the award to be deleted.
     * @return A message indicating the result of the deletion operation.
     */
    @Override
    @Transactional
    public String deleteAwardById(Long id) {
        awardRepository.deleteById(id);
        String message = "Award with id: " + id + " deleted!";
        log.info(message);
        return message;
    }

    @Override
    public List<AwardDto> getAwardByUserId(Long userId) {
        List<Award> allByUserId = awardRepository.findAllByUserId(userId);
        return allByUserId.stream()
                .map(awardDtoConverter::awardToDto)
                .collect(Collectors.toList());
    }
}
