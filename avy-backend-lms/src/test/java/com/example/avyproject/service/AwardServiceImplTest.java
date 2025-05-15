package com.example.avyproject.service;

import com.example.avyproject.converter.AwardDtoConverter;
import com.example.avyproject.dto.AwardDto;
import com.example.avyproject.entity.Award;
import com.example.avyproject.repository.AwardRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AwardServiceImplTest {

    @Mock
    private AwardRepository awardRepository;

    @Mock
    private AwardDtoConverter awardDtoConverter;

    @InjectMocks
    private AwardServiceImpl awardService;

    @Test
    void createAward() {
        Award inputaward = new Award();
        AwardDto awardDto = new AwardDto();
        Award savedAward = new Award();
        Mockito
                .when(awardDtoConverter.dtoToAward(awardDto))
                .thenReturn(inputaward);
        Mockito
                .when(awardRepository.save(inputaward))
                .thenReturn(savedAward);
        Mockito
                .when(awardDtoConverter.awardToDto(savedAward))
                .thenReturn(awardDto);
        AwardDto resultDto = awardService.createAward(awardDto);
        Mockito
                .verify(awardDtoConverter).dtoToAward(awardDto);
        Mockito
                .verify(awardRepository).save(inputaward);
        Mockito
                .verify(awardDtoConverter).awardToDto(savedAward);
        assertEquals(awardDto, resultDto);
    }

    @Test
    void getAwardById() {
    }

    @Test
    void getAllAwards() {
    }

    @Test
    void updateAward() {
    }

    @Test
    void deleteAwardById() {
    }
}