package com.example.avyproject.converter;

import com.example.avyproject.dto.AvyModuleDto;
import com.example.avyproject.dto.CreateAvyModuleDto;
import com.example.avyproject.entity.AvyModule;
import com.example.avyproject.service.LessonService;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class AvyModuleConverter {
    private final LessonService lessonService;

    public AvyModuleConverter(@Lazy LessonService lessonService) {
        this.lessonService = lessonService;
    }

    public AvyModule createModuleDtoToModule (CreateAvyModuleDto createAvyModuleDto){
        return AvyModule.builder()
                .title(createAvyModuleDto.getTitle())
                .description(createAvyModuleDto.getDescription())
                .build();
    }

    public AvyModuleDto moduleToModuleDto (AvyModule module){
       return AvyModuleDto.builder()
                .id(module.getId())
                .title(module.getTitle())
                .description(module.getDescription())
//                .moduleImage(module.getLinkToImage())
                .moduleOrder(module.getModuleOrder())
                .courseId(module.getCourse().getId())
                .items(module.getItems().stream()
                        .map(lessonService::toDto)
                        .collect(Collectors.toList()))
                .build();
    }
}
