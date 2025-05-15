package com.example.avyproject.service;

import com.example.avyproject.dto.lesson.TextLessonDto;

import java.util.List;

public interface TextLessonService {
    /**
     * Creates a new TextLesson based on the provided {@link TextLessonDto}.
     *
     * @param textLessonDto The {@link TextLessonDto} object containing information for the new TextLesson.
     * @return The created {@link TextLessonDto} object.
     */
    TextLessonDto createTextLesson(TextLessonDto textLessonDto);

    /**
     * Retrieves a {@link TextLessonDto} object by its unique identifier.
     *
     * @param id The unique identifier of the TextLesson.
     * @return The {@link TextLessonDto} object corresponding to the provided ID, or null if not found.
     */
    TextLessonDto getTextLessonById(Long id);

    /**
     * Retrieves a list of all {@link TextLessonDto} objects.
     *
     * @return A list containing all available {@link TextLessonDto} objects, or an empty list if none are found.
     */
    List<TextLessonDto> getAllTextLessons();

    /**
     * Updates a TextLesson based on the provided {@link TextLessonDto}.
     *
     * @param textLessonDto The {@link TextLessonDto} object containing updated information for the TextLesson.
     * @return The updated {@link TextLessonDto} object.
     */
    TextLessonDto updateTextLesson(TextLessonDto textLessonDto);

    /**
     * Deletes a TextLesson by its unique identifier.
     *
     * @param id The unique identifier of the TextLesson to be deleted.
     * @return A message indicating the result of the deletion operation.
     */
    String deleteTextLessonById(Long id);
}
