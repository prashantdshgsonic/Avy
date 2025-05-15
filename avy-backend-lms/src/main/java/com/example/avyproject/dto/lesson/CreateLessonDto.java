package com.example.avyproject.dto.lesson;

import com.example.avyproject.entity.AvyModule;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
/*@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXTERNAL_PROPERTY, property = "itemType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = CreateVideoLessonDto.class, name = "video"),
        @JsonSubTypes.Type(value = CreateTextLessonDto.class, name = "text")
        // другие типы
})*/
public abstract class CreateLessonDto {
    private String title;
    private String itemType;
    private Integer itemOrder;
    private Long moduleId;
}
