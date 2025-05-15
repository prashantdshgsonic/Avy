package com.example.avyproject.service;

import com.example.avyproject.converter.TextLessonDtoConverter;
import com.example.avyproject.dto.lesson.TextLessonDto;
import com.example.avyproject.entity.TextLesson;
import com.example.avyproject.exceptions.TextLessonNotFoundException;
import com.example.avyproject.repository.TextLessonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Implementation of the TextLessonService interface responsible for handling text module item-related operations.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TextLessonServiceImpl implements TextLessonService {
    private final TextLessonRepository textLessonRepository;
    private final TextLessonDtoConverter textLessonConverter;

    /**
     * Creates a new TextLesson based on the provided {@link TextLessonDto}.
     *
     * @param textLessonDto The {@link TextLessonDto} object containing information for the new TextLesson.
     * @return The created {@link TextLessonDto} object.
     */
    @Override
    @Transactional
    public TextLessonDto createTextLesson(TextLessonDto textLessonDto) {
        TextLesson textLesson = textLessonConverter.dtoToTextLesson(textLessonDto);
        log.info("Text module item created. " + textLesson);
        return textLessonConverter.textLessonToDto(textLessonRepository.save(textLesson));
    }

    /**
     * Retrieves a {@link TextLessonDto} object by its unique identifier.
     *
     * @param id The unique identifier of the TextLesson.
     * @return The {@link TextLessonDto} object corresponding to the provided ID.
     * @throws TextLessonNotFoundException if the TextLesson with the given ID is not found.
     */
    @Override
    @Transactional
    public TextLessonDto getTextLessonById(Long id) {
        TextLesson textLesson = textLessonRepository.findById(id).orElseThrow(
                () -> new TextLessonNotFoundException(String.format("Text module item with ID %d not found", id))
        );
        log.info("Get text module item with id: " + id + " award: " + textLesson);
        return textLessonConverter.textLessonToDto(textLesson);
    }

    /**
     * Retrieves a list of all {@link TextLessonDto} objects.
     *
     * @return A list containing all available {@link TextLessonDto} objects.
     */
    @Override
    @Transactional
    public List<TextLessonDto> getAllTextLessons() {
        List<TextLesson> textLessons = textLessonRepository.findAll();
        log.info("Get all text module items.");
        return textLessonConverter.textLessonsToDtos(textLessons);
    }

    /**
     * Updates a TextLesson based on the provided {@link TextLessonDto}.
     *
     * @param textLessonDto The {@link TextLessonDto} object containing updated information for the TextLesson.
     * @return The updated {@link TextLessonDto} object.
     */
    @Override
    @Transactional
    public TextLessonDto updateTextLesson(TextLessonDto textLessonDto) {
        TextLesson textLesson = textLessonConverter.dtoToTextLesson(textLessonDto);
        textLesson = textLessonRepository.save(textLesson);
        log.info("Text module. " + textLesson);
        return textLessonConverter.textLessonToDto(textLesson);
    }

    /**
     * Deletes a TextLesson by its unique identifier.
     *
     * @param id The unique identifier of the TextLesson to be deleted.
     * @return A message indicating the result of the deletion operation.
     */
    @Override
    @Transactional
    public String deleteTextLessonById(Long id) {
        textLessonRepository.deleteById(id);
        String message = "Text module item " + id + " deleted!";
        log.info(message);
        return message;
    }
}
