package com.example.avyproject.converter;

import com.example.avyproject.dto.lesson.TextLessonDto;
import com.example.avyproject.entity.TextLesson;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TextLessonDtoConverter {
    private final ModelMapper mapper;

    /**
     * Converts a {@link TextLessonDto} object to a {@link TextLesson} object.
     *
     * @param textLessonDto The {@link TextLessonDto} object to be converted.
     * @return The converted {@link TextLesson} object.
     */
    public TextLesson dtoToTextLesson(TextLessonDto textLessonDto) {
        return mapper.map(textLessonDto, TextLesson.class);
    }

    /**
     * Converts a list of {@link TextLesson} objects to a list of {@link TextLessonDto} objects.
     *
     * @param textLessons The list of {@link TextLesson} objects to be converted.
     * @return The list of {@link TextLessonDto} objects.
     */
    public List<TextLessonDto> textLessonsToDtos(List<TextLesson> textLessons) {
        List<TextLessonDto> textLessonDtos = new LinkedList<>();
        for (TextLesson item : textLessons) {
            textLessonDtos.add(mapper.map(item, TextLessonDto.class));
        }
        return textLessonDtos;
    }

    /**
     * Converts a {@link TextLesson} object to a {@link TextLessonDto} object.
     *
     * @param textLesson The {@link TextLesson} object to be converted.
     * @return The converted {@link TextLessonDto} object.
     */
    public TextLessonDto textLessonToDto(TextLesson textLesson) {
        return mapper.map(textLesson, TextLessonDto.class);
    }
}
