package com.example.avyproject.controller;

import com.example.avyproject.service.ImageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class TestController {
    private final ImageService imageService;

    @PostMapping("/test")
    public ResponseEntity<String> testMethod(@RequestParam("firstName") String firstName,
                                             @RequestParam("lastName") String lastName,
                                             @RequestParam("file") MultipartFile file) throws IOException {
        log.info(firstName);
        log.info(lastName);
        log.info(file.toString());
        return ResponseEntity.ok().body(file.getBytes().toString() + firstName + lastName);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if(file == null) {
            String message = "File is null!";
            log.error(message);
            return ResponseEntity.accepted().body(message);
        }
        return ResponseEntity.ok().body(imageService.uploadImage(file));
    }
}