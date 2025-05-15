package com.example.avyproject.controller;

import com.example.avyproject.converter.OfferDtoConverter;
import com.example.avyproject.dto.CreateOfferDto;
import com.example.avyproject.dto.OfferDto;
import com.example.avyproject.service.OfferService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/offer")
public class OfferController {

    private final OfferService offerService;
    private final OfferDtoConverter offerDtoConverter;

    @Operation(summary = "Create offer", description = "Creates new offer")
    @SecurityRequirement(name = "Authorization")
    @PostMapping("/create")
    public ResponseEntity<OfferDto> create(@RequestBody CreateOfferDto offerDto) {
        return ResponseEntity.ok(offerDtoConverter.offerToDto(offerService.create(offerDto)));
    }

    @Operation(summary = "Get offers", description = "Get all offers")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/all")
    public ResponseEntity<List<OfferDto>> getAll() {
        return ResponseEntity.ok(offerService.getAll());
    }

    @Operation(summary = "Get offer by ID", description = "Get the offer by specified ID")
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/get/by/id/{id}")
    public ResponseEntity<OfferDto> getById(@PathVariable("id")
                                            @Parameter(description = "Offer ID") Long id) {
        return ResponseEntity.ok(offerService.getById(id));
    }

    @Operation(summary = "Update offer", description = "Updates specified offer")
    @SecurityRequirement(name = "Authorization")
    @PutMapping("/update")
    public ResponseEntity<OfferDto> update(@RequestBody OfferDto offerDto) {
        return ResponseEntity.ok(offerService.update(offerDto));
    }

    @Operation(summary = "Delete offer", description = "Deletes offer by specified ID")
    @SecurityRequirement(name = "Authorization")
    @PutMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id")
                                         @Parameter(description = "Offer ID") Long id) {
        return ResponseEntity.ok(offerService.delete(id));
    }
}
