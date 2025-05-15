package com.example.avyproject.controller;

import com.example.avyproject.dto.lesson.TextLessonDto;
import com.example.avyproject.service.TextLessonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Text module item controller",
        description = "Provides CRUD operations to text module item")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/text-module-item")
public class TextLessonController {
    private final TextLessonService textLessonService;

    @Operation(summary = "Create text module item", description = "Create text module item")
    @SecurityRequirement(name = "Authorization")
    @PostMapping("/create")
    public ResponseEntity<TextLessonDto> createTextLesson(@RequestBody TextLessonDto textLessonDto) {
        return ResponseEntity.ok(textLessonService.createTextLesson(textLessonDto));
    }

    @Operation(summary = "Get text module item by id", description = "Get text module item by id")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/by/id/{id}")
    public ResponseEntity<TextLessonDto> getTextLessonById(@PathVariable("id")
                                                                   @Parameter(description = "Award ID") Long id) {
        return ResponseEntity.ok(textLessonService.getTextLessonById(id));
    }

    @Operation(summary = "Get all text module items", description = "Get all text module items")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/all")
    public ResponseEntity<List<TextLessonDto>> getAllTextLessons() {
        return ResponseEntity.ok(textLessonService.getAllTextLessons());
    }

    @Operation(summary = "Update text module item", description = "Update text module item")
    @SecurityRequirement(name = "Authorization")
    @PutMapping("/update")
    public ResponseEntity<TextLessonDto> updateTextLesson(@RequestBody TextLessonDto textLessonDto) {
        return ResponseEntity.ok(textLessonService.updateTextLesson(textLessonDto));
    }

    @Operation(summary = "Delete text module item by id", description = "Delete text module item by id")
    @SecurityRequirement(name = "Authorization")
    @DeleteMapping("/delete/by/id/{id}")
    public ResponseEntity<String> deleteTextLessonById(@PathVariable("id")
                                                           @Parameter(description = "Text module item ID") Long id) {
        return ResponseEntity.ok(textLessonService.deleteTextLessonById(id));
    }
}
