package com.example.avyproject.service;

import com.example.avyproject.converter.CourseConverter;
import com.example.avyproject.dto.CourseDto;
import com.example.avyproject.dto.CourseFullDto;
import com.example.avyproject.dto.CreateCourseDto;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;
import com.example.avyproject.entity.CourseProgress;
import com.example.avyproject.exceptions.CourseNotFoundException;
import com.example.avyproject.repository.CourseProgressRepository;
import com.example.avyproject.repository.CourseRepository;
import com.example.avyproject.service.utility.WebClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    // @Qualifier("imageServiceImpl") // or "localImageService"
    private final ImageService imageService;
    private final RecommendedService recommendedService;
    private final CourseConverter converter;
    private final RestTemplate restTemplate;
    private final CourseProgressRepository courseProgressRepository;
    private final WebClient webClient;
    @Value("${create.collection.url}")
    private String createCollectionUrl;

    @Override
    @Transactional
    public CourseDto createCourse(CreateCourseDto createCourseDto, AvyUser creator) {
        String pathToImage = imageService.uploadImage(createCourseDto.getCourseImage());
        Course course = converter.createCourseDtoToCourse(createCourseDto);
        course.setLinkToImage(pathToImage);
        course.setCreator(creator);
        Course savedCourse = courseRepository.save(course);
        recommendedService.addCourseToRecommendedToAllUsers(savedCourse);
        try {
            Map collectionData = createCollection(savedCourse);
            String collectionAddress = String.valueOf(collectionData.get("collectionAddress"));
            log.info("returned collection address - " + collectionAddress);
            savedCourse.setCollectionMintAddress(collectionAddress);
            return converter.courseToCourseDto(courseRepository.save(savedCourse));
        } catch (RuntimeException e) {
            imageService.deleteImage(pathToImage);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw e;
        }
    }

    public Map createCollection(Course savedCourse) {
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("name", savedCourse.getTitle());
        requestData.put("symbol", savedCourse.getCourseCode());
        requestData.put("description", savedCourse.getDescription());
        requestData.put("imageUri", savedCourse.getLinkToImage());  // Send URL as string
        requestData.put("attributes",List.of(savedCourse.getCategory(),savedCourse.getLevel()));
        try {
            return WebClientUtil.webClientSendPost(webClient,createCollectionUrl,requestData, Map.class);
        } catch (RuntimeException e) {
            log.error(e.getMessage());
            throw e;
        }
//        return webClient.post()
//                .uri(createCollectionUrl)
//                .contentType(MediaType.APPLICATION_JSON)
//                .bodyValue(requestData)
//                .retrieve().bodyToMono(Map.class).block();
    }

    @Override
    public void initRecommendedMethod() {
        recommendedService.initRecommendedMethod();
    }

    @Override
    public List<AvyUser> findCompletedCourse(Long courseId,AvyUser client) {
        Course course = getEntityById(courseId);
        if (Objects.equals(course.getCreator(), client)) {
            List<CourseProgress> courseProgresses = courseProgressRepository
                    .findByCourseIdAndStatus(course.getId(), "COMPLETED");
            System.out.println(courseProgresses.size() + " courses are actually completed!");
            return courseProgresses.stream()
                    .map(CourseProgress::getUser)
                    .toList();
        }
        throw new AccessDeniedException("You are not the creator of this course.");
    }

    @Override
    public List<AvyUser> findInProgressCourse(Long courseId, AvyUser client) {
        Course course = getEntityById(courseId);
        if(Objects.equals(course.getCreator(), client)) {
            List<CourseProgress> courseProgresses = courseProgressRepository
                    .findByCourseIdAndStatus(course.getId(),"IN_PROGRESS");
            return courseProgresses.stream()
                    .map(CourseProgress::getUser)
                    .toList();
        }
        throw new AccessDeniedException("You are not the creator of this course.");
    }

    @Override
    public CourseFullDto getById(Long courseId) {
        return converter.courseToCourseFullDto(courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course with id " + courseId + " not found")));
    }

    @Override
    public Course getEntityById(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course with id " + courseId + " not found"));
    }

    @Override
    public CourseDto getByIdAndCreatorId(Long courseId, Long creatorId) {
        CourseFullDto byId = getById(courseId);
        Long adminId = byId.getCreator().getId();
        if (!Objects.equals(creatorId, adminId)) {
            throw new CourseNotFoundException(
                    "Course with id " + courseId + " does not belong to User with id " + creatorId);
        }
        return converter.courseFullToCourseDto(byId);
    }

    @Override
    public CourseFullDto getFullCourseById(Long courseId) {
        return getById(courseId);
    }


    @Override
    public Course getCourseByIdAndCreatorId(Long courseId, Long creatorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course with id " + courseId + " not found"));
        Long adminId = course.getCreator().getId();
        if (!Objects.equals(creatorId, adminId)) {
            throw new CourseNotFoundException(
                    "Course with id " + courseId + " does not belong to User with id " + creatorId);
        }
        return course;
    }

    @Override
    public List<Course> getAllCoursesByCreator(AvyUser avyUser) {
        List<Course> courses = courseRepository.findCoursesByCreator(avyUser);
        return courses;
    }

    @Override
    public List<Course> getAll() {
        return courseRepository.findAll();
    }

    @Override
    public void deleteCourseById(Long courseId) {
        courseRepository.deleteById(courseId);
        String message = "Course # " + courseId + " deleted!";
        log.info(message);
    }

    @Override
    public void deleteCourse(Course courseName) {
        courseRepository.delete(courseName);
        String message = "Course # " + courseName + " deleted!";
        log.info(message);
    }

}
