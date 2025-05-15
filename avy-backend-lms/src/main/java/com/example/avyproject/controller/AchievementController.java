package com.example.avyproject.controller;

import com.example.avyproject.dto.AchievementDto;
import com.example.avyproject.service.AchievementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Achievement controller",
        description = "Provides CRUD operations to achievement")
@RestController
@AllArgsConstructor
@RequestMapping("/api/auth/achievement")
public class AchievementController {
    private final AchievementService achievementService;

    @Operation(summary = "Create achievement", description = "Create avy user achievement")
    @SecurityRequirement(name = "Authorization")
    @PostMapping("/create")
    public ResponseEntity<AchievementDto> createAchievement(@RequestBody AchievementDto achievementDto) {
        return ResponseEntity.ok(achievementService.createAchievement(achievementDto));
    }

    @Operation(summary = "Get achievement by id", description = "Get avy user achievement by id")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/by/id/{id}")
    public ResponseEntity<AchievementDto> getAchievementById(@PathVariable("id")
                                                 @Parameter(description = "Achievement ID") Long id) {
        return ResponseEntity.ok(achievementService.getAchievementById(id));
    }

    @Operation(summary = "Get all achievement", description = "Get all avy user achievement")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/all")
    public ResponseEntity<List<AchievementDto>> getAllAchievement() {
        return ResponseEntity.ok(achievementService.getAllAchievements());
    }

    @Operation(summary = "Update achievement", description = "Update achievement")
    @SecurityRequirement(name = "Authorization")
    @PutMapping("/update")
    public ResponseEntity<AchievementDto> updateAchievement(@RequestBody AchievementDto achievementDto) {
        return ResponseEntity.ok(achievementService.updateAchievement(achievementDto));
    }

    @Operation(summary = "Delete achievement by id", description = "Delete avy user achievement by id")
    @SecurityRequirement(name = "Authorization")
    @DeleteMapping("/delete/by/id/{id}")
    public ResponseEntity<String> deleteAchievementById(@PathVariable("id")
                                                  @Parameter(description = "Achievement ID") Long id) {
        return ResponseEntity.ok(achievementService.deleteAchievementById(id));
    }
}
