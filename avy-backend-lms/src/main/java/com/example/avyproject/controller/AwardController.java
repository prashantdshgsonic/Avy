package com.example.avyproject.controller;

import com.example.avyproject.dto.AwardDto;
import com.example.avyproject.service.AwardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Award controller",
        description = "Provides CRUD operations to award")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/award")
public class AwardController {
    private final AwardService awardService;

    @Operation(summary = "Create award", description = "Create avy user award")
    @PostMapping("/create")
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<AwardDto> createAward(@RequestBody AwardDto awardDto) {
        return ResponseEntity.ok(awardService.createAward(awardDto));
    }

    @Operation(summary = "Get award by id", description = "Get avy user award by id")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/by/id/{id}")
    public ResponseEntity<AwardDto> getAwardById(@PathVariable("id")
                                                 @Parameter(description = "Award ID") Long id) {
        return ResponseEntity.ok(awardService.getAwardById(id));
    }

    @Operation(summary = "Get all awards", description = "Get all avy user awards")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/all")
    public ResponseEntity<List<AwardDto>> getAllAwards() {
        return ResponseEntity.ok(awardService.getAllAwards());
    }

    @Operation(summary = "Update award", description = "Update award")
    @SecurityRequirement(name = "Authorization")
    @PutMapping("/update")
    public ResponseEntity<AwardDto> updateAward(@RequestBody AwardDto awardDto) {
        return ResponseEntity.ok(awardService.updateAward(awardDto));
    }

    @Operation(summary = "Delete award by id", description = "Delete avy user award by id")
    @SecurityRequirement(name = "Authorization")
    @DeleteMapping("/delete/by/id/{id}")
    public ResponseEntity<String> deleteAwardById(@PathVariable("id")
                                                  @Parameter(description = "Award ID") Long id) {
        return ResponseEntity.ok(awardService.deleteAwardById(id));
    }
}
