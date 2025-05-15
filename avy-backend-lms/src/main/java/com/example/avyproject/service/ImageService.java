package com.example.avyproject.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String uploadImage(MultipartFile file);
    void deleteImage(String path);
}
