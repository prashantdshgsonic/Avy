package com.example.avyproject.service;

import com.example.avyproject.dto.CourseProgressDto;
import com.example.avyproject.dto.CourseProgressFullDto;
import com.example.avyproject.dto.lesson.QuestionRequest;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;
import com.example.avyproject.entity.CourseProgress;
import com.example.avyproject.entity.Lesson;

import java.util.List;
import java.util.Optional;

/**
 * Interface representing operations related to managing course progress.
 */
public interface CourseProgressService {
    /**
     * Creates a new course progress record.
     *
     * @param courseProgressDto The CourseProgressDto object containing progress details.
     * @return The created CourseProgressDto.
     */
    CourseProgressDto createCourseProgress(CourseProgressDto courseProgressDto, Course course, AvyUser avyUser);

    /**
     * Retrieves the course progress information by its unique identifier.
     *
     * @param id The ID of the course progress to retrieve.
     * @return A CourseProgressDto object containing the progress details for the specified ID,
     *         or null if no progress is found with the provided ID.
     */
    CourseProgressDto getCourseProgressById(Long id);

    /**
     * Retrieves a list of courses in progress for a specific user.
     *
     * @param userId The ID of the user.
     * @return A list of CourseProgress objects representing courses in progress.
     */
    List<CourseProgress> getCoursesInProgress(Long userId);

    /**
     * Retrieves a list of completed courses for a specific user.
     *
     * @param userId The ID of the user.
     * @return A list of CourseProgress objects representing completed courses.
     */
    List<CourseProgress> getCoursesCompleted(Long userId);

    /**
     * Retrieves a list of recommended courses for a specific user.
     *
     * @param userId The ID of the user.
     * @return A list of CourseProgress objects representing recommended courses.
     */
    List<CourseProgress> getCoursesRecommended(Long userId);

    /**
     * Retrieves a list of all course progresses by UserId.
     *
     * @return A list of CourseProgress objects representing all course progresses by UserID.
     */
    List<CourseProgress> getAllCourseProgressByUserId(Long userId);

    /**
     * Retrieves a list of all course progresses by CourseId.
     *
     * @return A list of CourseProgress objects representing all course progresses by CourseID.
     */
    List<CourseProgress> getAllCourseProgressByCourseId(Long courseId);
    /**
     * Retrieves a list of all course progresses.
     *
     * @return A list of CourseProgressDto objects representing all course progresses.
     */
    List<CourseProgressDto> getAllCourseProgresses();

    Optional<CourseProgress> getCourseProgressByUserIdAndCourseId(Long userId, Long courseId);

    /**
     * Updates an existing course progress record.
     *
     * @param courseProgressDto The CourseProgressDto object containing updated progress details.
     * @return The updated CourseProgressDto.
     */
    CourseProgressDto updateCourseProgress(CourseProgressDto courseProgressDto, Course courseById, AvyUser avyUserById);

    /**
     * Deletes a course progress record by its ID.
     *
     * @param id The ID of the course progress to delete.
     * @return A message indicating the result of the deletion.
     */
    String deleteCourseProgressById(Long id);

    void deleteListCourseProgress (List<CourseProgress> courseProgressList);

    List<Long> getAllUserByCourse (Long courseId);

    CourseProgressFullDto startCourseByUser (Course course, AvyUser user);

    int calculateCourseProgress (Long courseProgressId);

    CourseProgress completeLesson (Lesson lesson, AvyUser avyUser);

    CourseProgressDto exitCourse(AvyUser user, Course course);

    String askQuestion(QuestionRequest request, Long userId);

    String askQuestion(Long lessonId,AvyUser avyUser);
}
