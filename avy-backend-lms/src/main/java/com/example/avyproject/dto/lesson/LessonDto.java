package com.example.avyproject.dto.lesson;

import com.example.avyproject.entity.AvyModule;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "itemType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = VideoLessonDto.class, name = "video"),
        @JsonSubTypes.Type(value = TextLessonDto.class, name = "text"),
        @JsonSubTypes.Type(value = QuizLessonDto.class, name = "quiz"),
        @JsonSubTypes.Type(value = PdfLessonDto.class, name = "pdf")
})
public abstract class LessonDto {
    private Long id;
    private String title;
    private String itemType;
    private Integer itemOrder;
    private Long moduleId;
}
