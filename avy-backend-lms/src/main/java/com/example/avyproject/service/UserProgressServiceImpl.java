package com.example.avyproject.service;

import com.example.avyproject.converter.UserProgressConverter;
import com.example.avyproject.dto.UserProgressDto;
import com.example.avyproject.entity.UserProgress;
import com.example.avyproject.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserProgressServiceImpl implements UserProgressService {

    @Autowired
    UserProgressRepository userProgressRepository;
    @Lazy
    @Autowired
    UserProgressConverter converter;

    @Override
    public UserProgress createUserProgress(UserProgressDto userProgressDto) {
        UserProgress entity = converter.toEntity(userProgressDto);
        return userProgressRepository.save(entity);
    }

    @Override
    public UserProgress updateUserProgress(UserProgressDto userProgressDto) {
        userProgressRepository.findById(userProgressDto.getId())
                .orElseThrow(()->new RuntimeException("User Progress with id "+userProgressDto.getId()+" not found"));
        UserProgress entityForUpdate = converter.toEntity(userProgressDto);
        return userProgressRepository.save(entityForUpdate);
    }

    @Override
    @Transactional
    public UserProgress updateUserProgress(UserProgress userProgress) {
        userProgressRepository.findById(userProgress.getId())
                .orElseThrow(()->new RuntimeException("User Progress with id "+userProgress.getId()+" not found"));
        return userProgressRepository.save(userProgress);
    }

    @Override
    @Transactional
    public List<UserProgress> getAllUserProgressByUserId(Long userId) {
        List<UserProgress> allByUserId = userProgressRepository.findAllByUserId(userId);
        return allByUserId;
    }

    @Override
    public UserProgress getUserProgressById(Long userProgressId) {
        return userProgressRepository.findById(userProgressId)
                .orElseThrow(()-> new RuntimeException ("User Progress with id "+userProgressId+" not found"));
    }

}
