package com.example.avyproject.service;

import com.example.avyproject.dto.*;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.embeddable.Asset;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface AvyUserService {
    AvyUser getByLogin(String login);
    AvyUser getEntityById(Long avyUserId);
    AvyUser registerUser(AvyUser avyUser);
    List<AvyUserDto> getUserByUsername(String name);
    AvyUserDto createNewAvyUser (AvyUserCreateDto avyUserCreateDto);
    AvyUser updateAvyUser (AvyUserUpdateDto userUpdateDto);
    AvyUserDto getUserDtoByEmail (String email);
    AvyUserLightDto getAvyUserLightDtoByEmail (String email);
    AvyUser getUserByToken (String token);
    List<CourseDto> getCoursesInProgress (String email);
    List<CourseDto> getCoursesCompleted (String email);
    List<CourseDto> getCoursesRecommended (String email);
    List<CourseDto> getAllCoursesByCreator (AvyUser avyUser);
    List<AvyUser> getAllUsers ();
    AvyUserDto updateAvyUserInfo (AvyUserUpdateDto avyUserUpdateDto,AvyUser avyUser);
    AvyUserDto updateAvyUserImage(MultipartFile file, AvyUser avyUser);
    void deleteById (Long userId);
    AvyUser getById (Long userId);
    void registerVoicePass(Long id);
    String requestNavigation();
    AvyUserDto updateAvyUserEducationInfo(EducationDto educationHistory, AvyUser avyUser);
    AvyUserDto updateAvyUserWorkExperienceInfo(WorkExperienceDto workExperience, AvyUser avyUser);
    AvyUserDto deleteAvyUserWorkExperienceInfo(Long id, AvyUser avyUser);
    AvyUserDto deleteAvyUserEducationInfo(Long id, AvyUser avyUser);
    AvyUserDto editAvyUserWorkExperience(WorkExperienceDto workExperience, AvyUser avyUser);
    AvyUserDto editAvyUserEducation(EducationDto educationHistory, AvyUser avyUser);
    AvyUserDto updateAvyUserCV(MultipartFile file, AvyUser avyUser);
    AvyUserDto deleteCV(AvyUser avyUser);
    Page<AvyUser> searchUsers(SearchFilterDto searchFilterDto);
    void createAsset(AvyUser avyUser, Asset asset);
}
