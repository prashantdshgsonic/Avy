package com.example.avyproject.controller;

import com.example.avyproject.converter.AvyModuleConverter;
import com.example.avyproject.dto.AvyModuleDto;
import com.example.avyproject.dto.CourseDto;
import com.example.avyproject.dto.CreateAvyModuleDto;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.service.AvyModuleService;
import com.example.avyproject.service.AvyUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/module")
@RequiredArgsConstructor
public class AvyModuleController {
    private final AvyUserService avyUserService;
    private final AvyModuleService moduleService;
    private final AvyModuleConverter converter;

    @PostMapping("/create-module")
    @PreAuthorize("isAuthenticated()")
    ResponseEntity<AvyModuleDto> create(@ModelAttribute CreateAvyModuleDto createModuleDto, @RequestHeader("Authorization") String authHeader){
        AvyUser creator = avyUserService.getUserByToken(authHeader.substring(7));
        return ResponseEntity.ok(converter.moduleToModuleDto(moduleService.createModule(createModuleDto,creator)));
    }
}
