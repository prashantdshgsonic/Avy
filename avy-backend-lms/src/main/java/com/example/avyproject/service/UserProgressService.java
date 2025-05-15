package com.example.avyproject.service;

import com.example.avyproject.dto.UserProgressDto;
import com.example.avyproject.entity.UserProgress;

import java.util.List;

public interface UserProgressService {
    UserProgress createUserProgress (UserProgressDto userProgressDto);
    UserProgress updateUserProgress (UserProgressDto userProgressDto);
    UserProgress updateUserProgress (UserProgress userProgress);
    List<UserProgress> getAllUserProgressByUserId (Long userId);
    UserProgress getUserProgressById (Long userProgressId);

}
