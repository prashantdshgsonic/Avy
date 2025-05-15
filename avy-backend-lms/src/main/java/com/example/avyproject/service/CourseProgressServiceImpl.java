package com.example.avyproject.service;

import com.example.avyproject.converter.CourseProgressDtoConverter;
import com.example.avyproject.dto.*;
import com.example.avyproject.dto.lesson.QuestionRequest;
import com.example.avyproject.entity.*;
import com.example.avyproject.enums.AchievementCategory;
import com.example.avyproject.enums.AwardType;
import com.example.avyproject.exceptions.CourseProgressNotFoundException;
import com.example.avyproject.exceptions.EntityNotFoundException;
import com.example.avyproject.exceptions.LessonProgressNotFoundException;
import com.example.avyproject.repository.CourseProgressRepository;
import com.example.avyproject.service.utility.RestUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Implementation of CourseProgressService providing methods to manage course progress.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CourseProgressServiceImpl implements CourseProgressService {
    private final CourseProgressRepository courseProgressRepository;
    private final CourseProgressDtoConverter courseProgressDtoConverter;
    private final LessonProgressService lessonProgressService;
    private final AchievementService achievementService;
    private final AwardService awardService;
    private final UserProgressService userProgressService;
    private final RestTemplate restTemplate;
    @Value("${ask.question.url}")
    private String askQuestionUrl;
    @Value("${ask.voice.question.url}")
    private String askVoiceQuestionUrl;
    /**
     * Creates a new course progress record.
     *
     * @param courseProgressDto The CourseProgressDto object containing progress details.
     * @return The created CourseProgressDto.
     */
    @Override
    @Transactional
    public CourseProgressDto createCourseProgress(CourseProgressDto courseProgressDto, Course courseById, AvyUser avyUserById) {
        CourseProgress courseProgress = courseProgressDtoConverter.dtoToCourseProgress(courseProgressDto, courseById, avyUserById);
//        log.info("Course progress created. " + courseProgress);
        return courseProgressDtoConverter.courseProgressToDto(courseProgressRepository.save(courseProgress));
    }

    /**
     * Retrieves the course progress information by its unique identifier.
     *
     * @param id The ID of the course progress to retrieve.
     * @return A CourseProgressDto object containing the progress details for the specified ID,
     *         or null if no progress is found with the provided ID.
     * @throws EntityNotFoundException if no course progress is found for the given ID.
     */
    @Override
    @Transactional
    public CourseProgressDto getCourseProgressById(Long id) {
        CourseProgress courseProgress = courseProgressRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("COurse progress with ID %d not found", id))
        );
        log.info("Get course progress with id: " + id + " course progress " + courseProgress);
        return courseProgressDtoConverter.courseProgressToDto(courseProgress);
    }

    /**
     * Retrieves a list of courses in progress for a specific user.
     *
     * @param userId The ID of the user.
     * @return A list of CourseProgress objects representing courses in progress.
     */
    @Override
    public List<CourseProgress> getCoursesInProgress(Long userId) {
        String inProgressStatus = "IN_PROGRESS";
        return courseProgressRepository.findByUserIdAndStatus(userId, inProgressStatus);

    }

    /**
     * Retrieves a list of completed courses for a specific user.
     *
     * @param userId The ID of the user.
     * @return A list of CourseProgress objects representing completed courses.
     */
    @Override
    public List<CourseProgress> getCoursesCompleted(Long userId) {
        String completedStatus = "COMPLETED";
        return courseProgressRepository.findByUserIdAndStatus(userId, completedStatus);
    }

    /**
     * Retrieves a list of recommended courses for a specific user.
     *
     * @param userId The ID of the user.
     * @return A list of CourseProgress objects representing recommended courses.
     */
    public List<CourseProgress> getCoursesRecommended(Long userId) {
        String recommendedStatus = "RECOMMENDED";
        return courseProgressRepository.findByUserIdAndStatus(userId, recommendedStatus);
    }

    /**
     * Retrieves a list of all course progresses.
     *
     * @return A list of CourseProgressDto objects representing all course progresses.
     */
    @Override
    @Transactional
    public List<CourseProgressDto> getAllCourseProgresses() {
        List<CourseProgress> courseProgresses = courseProgressRepository.findAll();
        log.info("Get all course progresses.");
        return courseProgressDtoConverter.courseProgressToDtos(courseProgresses);
    }

    /**
     * Updates an existing course progress record.
     *
     * @param courseProgressDto The CourseProgressDto object containing updated progress details.
     * @return The updated CourseProgressDto.
     */
    @Override
    @Transactional
    public CourseProgressDto updateCourseProgress(CourseProgressDto courseProgressDto, Course courseById, AvyUser avyUserById) {
        CourseProgress courseProgress = courseProgressDtoConverter.dtoToCourseProgress(courseProgressDto, courseById, avyUserById);
        courseProgress = courseProgressRepository.save(courseProgress);
        log.info("Course progress updated. " + courseProgress);
        return courseProgressDtoConverter.courseProgressToDto(courseProgress);
    }

    /**
     * Deletes a course progress record by its ID.
     *
     * @param id The ID of the course progress to delete.
     * @return A message indicating the result of the deletion.
     */
    @Override
    @Transactional
    public String deleteCourseProgressById(Long id) {
        courseProgressRepository.deleteById(id);
        String message = "Course progress with id: " + id + " deleted!";
        log.info(message);
        return message;
    }

    @Override
    public List<CourseProgress> getAllCourseProgressByUserId(Long userId) {
        return courseProgressRepository.findByUserId(userId);
    }

    @Override
    public List<CourseProgress> getAllCourseProgressByCourseId(Long courseId) {
        return courseProgressRepository.findByCourseId(courseId);
    }

    @Override
    public Optional<CourseProgress> getCourseProgressByUserIdAndCourseId(Long userId, Long courseId) {
        return courseProgressRepository.findCourseProgressByUserIdAndCourseId(userId,courseId);
    }

    @Override
    @Transactional
    public void deleteListCourseProgress(List<CourseProgress> courseProgressList) {
        courseProgressRepository.deleteAll(courseProgressList);
    }

    @Override
    public List<Long> getAllUserByCourse (Long courseId){
        List<CourseProgress> courseProgressByCourseId = courseProgressRepository.findCourseProgressByCourse_IdAndStatusNot(courseId,"RECOMMENDED");
        return courseProgressByCourseId.stream()
                .map(CourseProgress::getUser)
                .map(AvyUser::getId)
                .collect(Collectors.toList());
    }

    @Override
    public CourseProgressFullDto startCourseByUser(Course course, AvyUser user) {
        // ДОПИСАТЬ ЗАПОЛНЕНИЕ ЛИСТОВ ЛЕССОН ПРОГРЕССОВ ПО ВСЕМ УРОКАМ КУРСА
        // ПОТОМ ПОСТАВИТЬ ЭТО В КУРС ПРОГРЕСС

        Optional<CourseProgress> optionalCourseProgress = getCourseProgressByUserIdAndCourseId(user.getId(), course.getId());
        if(optionalCourseProgress.isPresent()){
            CourseProgress courseProgress = optionalCourseProgress.get();
            if(courseProgress.getIsExited()) {
                //if a user exited the course before then calculate the time they have been absent
                //to display it in welcoming message(through chatBubbles)
                Duration duration = Duration.between(courseProgress.getLastExited(),LocalDate.now());
                //duration.toDays()

                //set the isExited field back to the default value
                courseProgress.setIsExited(false);
            }
            if (courseProgress.getStatus().equals("IN_PROGRESS")){
                courseProgress.setLastAccessed(LocalDate.now());
                courseProgressRepository.save(courseProgress);
                return courseProgressDtoConverter.courseProgressToFullDto(courseProgress);
            }
            if (courseProgress.getStatus().equals("COMPLETED")){
                return courseProgressDtoConverter.courseProgressToFullDto(courseProgress);
            }
            courseProgress.setLessonProgresses(createLessonProgressesList(course,courseProgress));
            courseProgress.setStatus("IN_PROGRESS");
            courseProgress.setLastAccessed(LocalDate.now());
            log.info(courseProgress.toString());
            courseProgressRepository.save(courseProgress);
            log.info("Course progress updated. " + courseProgress);
            return courseProgressDtoConverter.courseProgressToFullDto(courseProgress);
        } else {
            CourseProgress courseProgress = new CourseProgress();
            courseProgress.setUser(user);
            courseProgress.setCourse(course);
            courseProgress.setLessonProgresses(createLessonProgressesList(course,courseProgress));
            courseProgress.setStatus("IN_PROGRESS");
            courseProgress.setLastAccessed(LocalDate.now());
            courseProgressRepository.save(courseProgress);
            log.info("Course progress created. " + courseProgress);
            return courseProgressDtoConverter.courseProgressToFullDto(courseProgress);
        }
    }

    @Override
    public int calculateCourseProgress(Long courseProgressId) {
        CourseProgress courseProgress = courseProgressRepository.findById(courseProgressId)
                .orElseThrow(()-> new CourseProgressNotFoundException("Course progress with id "+courseProgressId+" not found"));
        List<LessonProgress> lessonProgresses = courseProgress.getLessonProgresses();
        long total = lessonProgresses.size();
        long completedLesson = lessonProgresses.stream()
                .filter(LessonProgress::isDone)
                .count();
        int result = (int) (((double) completedLesson / total) * 100);
        if(result==100){
            courseProgress.setStatus("COMPLETED");
            addAchievementToUser(courseProgress.getCourse().getCategory(), courseProgress.getUser());
            courseProgressRepository.save(courseProgress);
        }
        return result;
    }

    @Override
    public CourseProgress completeLesson (Lesson lesson, AvyUser avyUser) {
        Course course = lesson.getAvyModule().getCourse();
        CourseProgress courseProgress = getCourseProgressByUserIdAndCourseId(avyUser.getId(), course.getId())
                .orElseThrow(()-> new CourseProgressNotFoundException("Course progress for course id "+course.getId()+" and UserId "+avyUser.getId()+" not found"));
        if (courseProgress.getStatus().equals("COMPLETED")){
            return courseProgress;
        }
        List<LessonProgress> lessonProgresses = courseProgress.getLessonProgresses();

        LessonProgress lessonProgressForUpdate = lessonProgresses.stream()
                .filter(lessonProgress -> lessonProgress.getLesson().getId().equals(lesson.getId()))
                .findAny()
                .orElseThrow(()-> new LessonProgressNotFoundException("Lesson progress for UserId "+avyUser.getId()+" and Lesson Id" +lesson.getId()+" not found"));

        lessonProgressService.updateStatus(lessonProgressForUpdate);
        int progress = calculateCourseProgress(courseProgress.getId());
        courseProgress.setProgress(progress);
        CourseProgress save = courseProgressRepository.save(courseProgress);
        if(moduleIsCompleted(lesson,save)){
            addAwardToUser(course, lesson, avyUser);
        }
        updateUserProgress(avyUser);
        return save;
    }

    @Override
    public CourseProgressDto exitCourse(AvyUser avyUser, Course course) {
        CourseProgress courseProgress = courseProgressRepository.findCourseProgressByUserIdAndCourseId(avyUser.getId(), course.getId())
                .orElseThrow(() -> new CourseProgressNotFoundException("Course progress for course id " + course.getId() + " and UserId " + avyUser.getId() + " not found"));
        courseProgress.setIsExited(true);
        courseProgress.setLastExited(LocalDate.now());
        CourseProgress savedCourseProgress = courseProgressRepository.save(courseProgress);
        return courseProgressDtoConverter.courseProgressToDto(savedCourseProgress);
    }

    @Override
    public String askQuestion(QuestionRequest request,Long userId) {
        //Prepare data for sending it to the LMM service
        Map<String,Object> map = new HashMap<>();
        map.put("lesson_id",request.getLessonId());
        map.put("question",request.getQuestion());
        map.put("user_id",userId);
        try {
            // Sending POST request and expecting answer from LLM
            Map answer = restTemplate.postForObject(askQuestionUrl,RestUtil.createHttpEntity(map),Map.class);
            String result = (String) answer.get("answer");
            log.info("answer received: {} ", result);
            return result;
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    @Override
    public String askQuestion(Long lessonId,AvyUser user) {
        if(!user.getHasVoicePass()) {
            return "Unfortunately you cannot send voice messages. You need to register your voice at first";
        }
        Map<String,Object> map = new HashMap<>();
        map.put("lesson_id",lessonId);
        map.put("user_id",user.getId());
        try {
            Map answer = restTemplate.postForObject(askVoiceQuestionUrl,RestUtil.createHttpEntity(map),Map.class);
            String result = (String) answer.get("answer");
            log.info("answer received: {} ", result);
            return result;
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    private List<LessonProgress> createLessonProgressesList (Course course, CourseProgress  courseProgress){
        return course.getAvyModuleList().stream()
                .flatMap(module -> module.getItems().stream())
                .map(lesson -> lessonProgressService.create(courseProgress, lesson))
                .collect(Collectors.toList());
    }

    private void updateUserProgress (AvyUser avyUser){
        List<UserProgress> userProgressList = userProgressService.getAllUserProgressByUserId(avyUser.getId());
        UserProgress userProgress;
        if(userProgressList.size()>0){
            userProgress = userProgressList.get(0);
        } else {
            UserProgressDto userProgressDto = UserProgressDto.builder()
                    .userId(avyUser.getId())
                    .build();
            userProgress = userProgressService.createUserProgress(userProgressDto);
        }
        userProgress.setCoins(userProgress.getCoins()+10);
        UserProgress savedUP = userProgressService.updateUserProgress(userProgress);
        log.info("coins added to user "+savedUP.getCoins());
    }
    private void addAchievementToUser(String category, AvyUser avyUser){
        AchievementCategory achievementCategory = AchievementCategory.valueOf(category);
        AchievementDto achievement = new AchievementDto();
        achievement.setUserId(avyUser.getId());
        achievement.setDescription(achievementCategory.getDescription());
        achievement.setDateEarned(LocalDate.now());
        AchievementDto dto = achievementService.createAchievement(achievement);
        log.info("achievement successfully saved with id "+ dto.getId()+" and category "+dto.getDescription());
    }

    private void addAwardToUser(Course course, Lesson lesson, AvyUser user){
        List<AvyModule> avyModuleList = course.getAvyModuleList();
        int numberOfModules = avyModuleList.size();
        AvyModule avyModule = lesson.getAvyModule();
        LocalDate localDate = LocalDate.now();
        AwardDto award = AwardDto.builder()
                .userId(user.getId())
                .dateEarned(localDate)
                .description(avyModule.getTitle()+" from course "+course.getTitle())
                .build();
        if (numberOfModules == 1){
            //granted gold
            award.setType(AwardType.GOLD.name());
            awardService.createAward(award);
        } else if (numberOfModules == 2){
            //granted silver and gold
            if(avyModule.getModuleOrder()<=0){
                award.setType(AwardType.SILVER.name());
                awardService.createAward(award);
            } else {
                award.setType(AwardType.GOLD.name());
                awardService.createAward(award);
            }
        } else{
            int percent = (int)(((double)(avyModule.getModuleOrder()+1)/numberOfModules)*100);
            if(percent<=33){
                award.setType(AwardType.BRONZE.name());
                awardService.createAward(award);
            }
            if(percent<=66){
                //granted silver award
                award.setType(AwardType.SILVER.name());
                awardService.createAward(award);
            } else {
                //granted gold award
                award.setType(AwardType.GOLD.name());
                awardService.createAward(award);
            }
        }



    }

    private boolean moduleIsCompleted(Lesson completedLesson, CourseProgress courseProgress){
        List<LessonProgress> lessonProgresses = courseProgress.getLessonProgresses();
        AvyModule avyModule = completedLesson.getAvyModule();
        List<Lesson> moduleItems = avyModule.getItems();
        // проверить на комплитед
        // Преобразуем List<LessonProgress> в Map
        Map<Long, Boolean> lessonProgressMap = lessonProgresses.stream()
                .collect(Collectors.toMap(lessonProgress -> lessonProgress.getLesson().getId(), LessonProgress::isDone));
        // Подсчитаем завершенные уроки в moduleItems
        long completedLessonsCount = moduleItems.stream()
                .filter(lesson -> lessonProgressMap.getOrDefault(lesson.getId(), false))
                .count();
        log.info("module size = "+moduleItems.size() + "lesson completed "+completedLessonsCount);
        return moduleItems.size() > 0 && moduleItems.size() == completedLessonsCount;
    }

    @PostConstruct
    public void mockCompletedCoursesByUsers() {
        List<CourseProgress> all = courseProgressRepository.findAll();
        all.forEach(e -> e.setStatus("COMPLETED"));
        System.out.println(all.size() + " courses must be completed!");
        courseProgressRepository.saveAll(all);
    }

}
