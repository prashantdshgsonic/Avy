package com.example.avyproject.controller;

import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.service.AvyUserService;
import com.example.avyproject.service.utility.RelativePathConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@RestController
@RequestMapping("/pdf")
@RequiredArgsConstructor
@Slf4j
public class PdfController {
    private final AvyUserService avyUserService;

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> servePdf(@PathVariable String filename) {
        Path filePath = Paths.get(System.getProperty("user.dir") + "/avy-backend/src/main/resources/static/pdf/")
                .resolve(filename);

        Resource resource = new FileSystemResource(filePath.toFile());
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @GetMapping("/openCV/{userId}")
    public ResponseEntity<Resource> openCV(@PathVariable Long userId) {
        AvyUser avyUser = avyUserService.getById(userId);
        Path filePath = Paths.get(avyUser.getLinkToCV());
        log.info(filePath.toString());
        Resource resource = new FileSystemResource(filePath.toFile());
        if (!resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        }
    }
