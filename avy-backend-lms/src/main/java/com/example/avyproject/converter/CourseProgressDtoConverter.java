package com.example.avyproject.converter;

import com.example.avyproject.dto.AchievementDto;
import com.example.avyproject.dto.AwardDto;
import com.example.avyproject.dto.CourseProgressDto;
import com.example.avyproject.dto.CourseProgressFullDto;
import com.example.avyproject.entity.*;
import com.example.avyproject.service.*;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class CourseProgressDtoConverter {
    private final ModelMapper mapper;
    private final AchievementService achievementService;
    private final AwardService awardService;
    private final UserProgressService userProgressService;

    public CourseProgress dtoToCourseProgress(CourseProgressDto courseDto, Course course, AvyUser avyUser) {
        CourseProgress map = mapper.map(courseDto, CourseProgress.class);
        map.setCourse(course);
        map.setUser(avyUser);
        return map;
    }

    public List<CourseProgressDto> courseProgressToDtos(List<CourseProgress> courseProgresses) {
        return courseProgresses.stream()
                .map(el -> mapper.map(el,CourseProgressDto.class))
                .toList();
    }

    public CourseProgressDto courseProgressToDto(CourseProgress courseProgress) {
        CourseProgressDto map = mapper.map(courseProgress, CourseProgressDto.class);
        map.setCourseId(courseProgress.getCourse().getId());
        map.setUserId(courseProgress.getUser().getId());
        map.setModuleCompleted(false);
        if(courseProgress.getStatus().equals("RECOMMENDED")){
            return map;
        }
        //find current lesson
        if (courseProgress.getLessonProgresses()!= null) {
            List<LessonProgress> lessonProgresses = courseProgress.getLessonProgresses();
            Lesson nextLesson = findNextLesson(lessonProgresses);
            long nextLessonId = nextLesson.getId();
            map.setNextLessonId(nextLessonId);
            if ((nextLesson.getItemOrder() == 0 && nextLesson.getAvyModule().getModuleOrder() != 0) || map.getStatus().equals("COMPLETED")) {
                map.setModuleCompleted(true);
            }
            if (map.isModuleCompleted()){
                //взять current lesson так же как берем next lesson
                Lesson currentLesson = findCurrentLesson(lessonProgresses);
                AvyModule currentModule = currentLesson.getAvyModule();
                map.setCompletedModuleTitle(currentModule.getTitle());
                map.setNextLessonTitle(nextLesson.getTitle());
                map.setNextModuleTitle(nextLesson.getAvyModule().getTitle());
                long userId = courseProgress.getUser().getId();
                List<AchievementDto> userAchievements = getUserAchievements(userId);
                map.setUserAchievements(userAchievements);
                List<AwardDto> userAwards = getUserAwards(userId);
                map.setUserAwards(userAwards);
                AwardDto currentModuleAward = userAwards.stream()
                        .sorted(Comparator.comparing(AwardDto::getId).reversed())
                        .findFirst().get();
                map.setCurrentModuleAward(currentModuleAward);
                List<UserProgress> listUserProgress = userProgressService.getAllUserProgressByUserId(userId);
                if (listUserProgress.size()>0){
                    UserProgress userProgress = listUserProgress.get(0);
                    log.info("find userProgress "+userProgress.toString());
                    int userCoins = userProgress.getCoins();
                    log.info("read coins sum "+userCoins);
                    map.setUserCoins(userCoins);
                }
            }
        }
        return map;
    }

    public CourseProgressFullDto courseProgressToFullDto (CourseProgress courseProgress){
        CourseProgressFullDto progressFullDto = mapper.map(courseProgress, CourseProgressFullDto.class);
        progressFullDto.setCourseId(courseProgress.getCourse().getId());
        progressFullDto.setUserId(courseProgress.getUser().getId());
        if(courseProgress.getStatus().equals("RECOMMENDED")){
            return progressFullDto;
        }
        //find current lesson
        List<LessonProgress> lessonProgresses = courseProgress.getLessonProgresses();
        Lesson nextLesson = findNextLesson(lessonProgresses);
        long nextLessonId = nextLesson.getId();
        // у него взять данные модуля
        AvyModule currentModule = nextLesson.getAvyModule();
        String currentModuleTitle = currentModule.getTitle();
        // взять все уроки модуля
        List<Lesson> moduleItems = currentModule.getItems();
        // проверить на комплитед
        // Преобразуем List<LessonProgress> в Map
        Map<Long, Boolean> lessonProgressMap = lessonProgresses.stream()
                .collect(Collectors.toMap(lessonProgress -> lessonProgress.getLesson().getId(), LessonProgress::isDone));
        // Подсчитаем завершенные уроки в moduleItems
        long completedLessonsCount = moduleItems.stream()
                .filter(lesson -> lessonProgressMap.getOrDefault(lesson.getId(), false))
                .count();

        // выдать процент
        int moduleProgress;
        if (moduleItems.size() > 0) {
            moduleProgress = (int) (((double) completedLessonsCount / moduleItems.size()) * 100);
        } else {
            moduleProgress = 0;
        }
        progressFullDto.setModuleProgress(moduleProgress);
        progressFullDto.setCurrentModuleTitle(currentModuleTitle);
        progressFullDto.setNextLessonId(nextLessonId);
        progressFullDto.setNextLessonTitle(nextLesson.getTitle());
        return progressFullDto;
    }

    private Lesson findNextLesson (List<LessonProgress> lessonProgresses){
        // взять все уроки, которые не комплитед
        List <LessonProgress> uncompletedLessons = lessonProgresses.stream()
                .filter(lessonProgress -> !lessonProgress.isDone())
                .collect(Collectors.toList());
        // все не комплитед - упорядочить по ордеру
        List<Lesson> orderedByOrder = uncompletedLessons.stream()
                .map(LessonProgress::getLesson)
                .sorted(Comparator.comparing((Lesson lesson) -> lesson.getAvyModule().getModuleOrder())
                        .thenComparing(Lesson::getItemOrder))
                .collect(Collectors.toList());
        //проверка на то, что еще есть не законченные уроки
        Lesson nextLesson;
        if(uncompletedLessons.isEmpty()){
            nextLesson = lessonProgresses.stream()
                    .map(LessonProgress::getLesson)
                    .sorted(Comparator.comparing((Lesson lesson) -> lesson.getAvyModule().getModuleOrder())
                            .thenComparing(Lesson::getItemOrder))
                    .findFirst()
                    .get();
        } else {
            // взять первый из упорядоченных
            nextLesson = orderedByOrder.get(0);
        }

        return nextLesson;
    }

    private Lesson findCurrentLesson (List<LessonProgress> lessonProgresses){
        // взять все уроки, которые не комплитед
        List <LessonProgress> completedLessons = lessonProgresses.stream()
                .filter(LessonProgress::isDone)
                .collect(Collectors.toList());
        // все не комплитед - упорядочить по ордеру
        List<Lesson> orderedByOrder = completedLessons.stream()
                .map(LessonProgress::getLesson)
                .sorted(Comparator.comparing((Lesson lesson) -> lesson.getAvyModule().getModuleOrder())
                        .thenComparing(Lesson::getItemOrder))
                .collect(Collectors.toList());
        int lastLessonInRow = orderedByOrder.size();
        Lesson currenLesson = orderedByOrder.get(lastLessonInRow-1);
        return currenLesson;
    }

    private List <AchievementDto> getUserAchievements (long userId){
       return achievementService.getAchievementsByUserId(userId);
    }

    private List <AwardDto> getUserAwards (long userId){
        return awardService.getAwardByUserId(userId);
    }
}