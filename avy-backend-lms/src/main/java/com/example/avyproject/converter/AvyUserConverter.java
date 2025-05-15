package com.example.avyproject.converter;

import com.example.avyproject.dto.AvyUserDto;
import com.example.avyproject.dto.AvyUserLightDto;
import com.example.avyproject.dto.EducationDto;
import com.example.avyproject.dto.WorkExperienceDto;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Role;
import com.example.avyproject.entity.UserProgress;
import com.example.avyproject.entity.embeddable.Location;
import com.example.avyproject.service.AchievementService;
import com.example.avyproject.service.AwardService;
import com.example.avyproject.service.CourseProgressService;
import com.example.avyproject.service.UserProgressService;
import com.example.avyproject.service.utility.RelativePathConverter;
import lombok.*;



import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class AvyUserConverter {
    private final CourseProgressService courseProgressService;
    private final CourseProgressDtoConverter courseProgressDtoConverter;
    private final AchievementService achievementService;
    private final AwardService awardService;
    private final UserProgressService userProgressService;
    private final WorkExperienceDtoConverter workExperienceDtoConverter;


    public AvyUserDto avyUserToAvyUserDto (AvyUser avyUser){
        AvyUserDto avyUserDto = new AvyUserDto();
        avyUserDto.setId(avyUser.getId());
        avyUserDto.setFirstName(avyUser.getFirstName());
        avyUserDto.setLastName(avyUser.getLastName());
        avyUserDto.setEmail(avyUser.getEmail());
        if(avyUser.getLocation() != null) {
            avyUserDto.setState(avyUser.getLocation().getState());
            avyUserDto.setCity(avyUser.getLocation().getCity());
            avyUserDto.setCountry(avyUser.getLocation().getCountry());
        }
        avyUserDto.setUserName(avyUser.getUserName());
        avyUserDto.setLinkToAvatar(avyUser.getLinkToAvatar());
        avyUserDto.setLinkToImage(RelativePathConverter.getRelativePath(avyUser.getLinkToImage()));
        avyUserDto.setLinkToCV(RelativePathConverter.getRelativePath(avyUser.getLinkToCV()));
        avyUserDto.setUserJob(avyUser.getUserJob());
        avyUserDto.setUserLinkedIn(avyUser.getUserLinkedIn());
        avyUserDto.setAvatarId(avyUser.getAvatarId());
        avyUserDto.setCreationDate(avyUser.getCreationDate());
        avyUserDto.setCoursesInProgress(courseProgressService.getCoursesInProgress(avyUser.getId())
                        .stream()
                        .map(courseProgress -> courseProgressDtoConverter.courseProgressToDto(courseProgress))
                        .collect(Collectors.toList())
        );
        avyUserDto.setCoursesCompleted(courseProgressService.getCoursesCompleted(avyUser.getId())
                .stream()
                .map(courseProgress -> courseProgressDtoConverter.courseProgressToDto(courseProgress))
                .collect(Collectors.toList())
        );
        avyUserDto.setCoursesRecommended(courseProgressService.getCoursesRecommended(avyUser.getId())
                .stream()
                .map(courseProgress -> courseProgressDtoConverter.courseProgressToDto(courseProgress))
                .collect(Collectors.toList())
        );
        if(avyUser.getWorkExperience() != null) {
            avyUserDto.setWorkExperience(avyUser.getWorkExperience().stream()
                    .map(workExperienceDtoConverter::convertWorkExperienceToDto)
                    .sorted(Comparator.comparing(WorkExperienceDto::getStartDate).reversed())
                    .collect(Collectors.toCollection(LinkedHashSet::new))
            );
        }
        if(avyUser.getEducationHistory() != null) {
            avyUserDto.setEducationHistory(avyUser.getEducationHistory().stream()
                    .map(EducationDtoConverter::convertEducationToDto)
                    .sorted(Comparator.comparing(EducationDto::getStartDate).reversed())
                    .collect(Collectors.toCollection(LinkedHashSet::new))
            );
        }
        if(avyUser.getAssets() != null) {
            avyUserDto.setAssets(avyUser.getAssets());
        }
        List<UserProgress> listUserProgress = userProgressService.getAllUserProgressByUserId(avyUserDto.getId());
        if (listUserProgress.size()>0){
            UserProgress userProgress = listUserProgress.get(0);
            int userCoins = userProgress.getCoins();
            avyUserDto.setCoins(userCoins);
        }

        avyUserDto.setAchievements(achievementService.getAchievementsByUserId(avyUserDto.getId()));
        avyUserDto.setAwards(awardService.getAwardByUserId(avyUserDto.getId()));
        return avyUserDto;
    }

    public AvyUserLightDto avyUserToAvyUserLightDto (AvyUser avyUser){
        AvyUserLightDto avyUserLightDto = new AvyUserLightDto();
        avyUserLightDto.setId(avyUser.getId());
        avyUserLightDto.setFirstName(avyUser.getFirstName());
        avyUserLightDto.setLastName(avyUser.getLastName());
        avyUserLightDto.setUserName(avyUser.getUserName());
        avyUserLightDto.setEmail(avyUser.getEmail());
        if(avyUser.getLocation() != null) {
            avyUserLightDto.setState(avyUser.getLocation().getState());
            avyUserLightDto.setCity(avyUser.getLocation().getCity());
            avyUserLightDto.setCountry(avyUser.getLocation().getCountry());
        }
        avyUserLightDto.setCoursesInProgress(courseProgressService.getCoursesInProgress(avyUser.getId()).size());
        avyUserLightDto.setCoursesCompleted(courseProgressService.getCoursesCompleted(avyUser.getId()).size());
        avyUserLightDto.setCoursesRecommended(courseProgressService.getCoursesRecommended(avyUser.getId()).size());
        List<UserProgress> listUserProgress = userProgressService.getAllUserProgressByUserId(avyUser.getId());
        if (listUserProgress.size()>0){
            UserProgress userProgress = listUserProgress.get(0);
            int userCoins = userProgress.getCoins();
            avyUserLightDto.setCoins(userCoins);
        }

        avyUserLightDto.setAchievements(achievementService.getAchievementsByUserId(avyUser.getId()));
        avyUserLightDto.setAwards(awardService.getAwardByUserId(avyUser.getId()));

        Set<Role> roles = avyUser.getRoles();
        avyUserLightDto.setRoles(roles.stream()
                .map(Role::getRoleName)
                .collect(Collectors.toList())
        );
        avyUserLightDto.setAvatarId(avyUser.getAvatarId());
        avyUserLightDto.setUserJob(avyUser.getUserJob());
        avyUserLightDto.setUserLinkedIn(avyUser.getUserLinkedIn());
        avyUserLightDto.setLinkToImage(RelativePathConverter.getRelativePath(avyUser.getLinkToImage()));
        avyUserLightDto.setLinkToCV(RelativePathConverter.getRelativePath(avyUser.getLinkToCV()));
        avyUserLightDto.setWorkExperience(avyUser.getWorkExperience().stream()
                .map(workExperienceDtoConverter::convertWorkExperienceToDto)
                .sorted(Comparator.comparing(WorkExperienceDto::getStartDate).reversed())
                .collect(Collectors.toCollection(LinkedHashSet::new)));
        avyUserLightDto.setEducationHistory(avyUser.getEducationHistory().stream()
                .map(EducationDtoConverter::convertEducationToDto)
                .sorted(Comparator.comparing(EducationDto::getStartDate).reversed())
                .collect(Collectors.toCollection(LinkedHashSet::new))
        );
        avyUserLightDto.setAssets(avyUser.getAssets());
        return avyUserLightDto;
    }

    public AvyUser avyUserDtoToEntity(AvyUserDto avyUserDto){
        return AvyUser.builder()
                .firstName(avyUserDto.getFirstName())
                .lastName(avyUserDto.getLastName())
                .email(avyUserDto.getEmail())
                .location(new Location(avyUserDto.getState(),avyUserDto.getCity(), avyUserDto.getCountry()))
                .userName(avyUserDto.getUserName())
                .linkToAvatar(avyUserDto.getLinkToAvatar())
                .linkToImage(avyUserDto.getLinkToImage())
                .creationDate(avyUserDto.getCreationDate())
                .avatarId(avyUserDto.getAvatarId())
                .userJob(avyUserDto.getUserJob())
                .userLinkedIn(avyUserDto.getUserLinkedIn())
                .build();
    }
}
