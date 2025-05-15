package com.example.avyproject.service;

import com.example.avyproject.exceptions.NoImageAttachedException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Slf4j
public class LocalVideoServiceImpl implements VideoService {
    @Override
    public String uploadVideo(MultipartFile file) {
        if (file.isEmpty()) {
            throw new NoImageAttachedException("No video attached");
        }

        try {
            byte[] bytes = file.getBytes();
            String ext = FilenameUtils.getExtension(file.getOriginalFilename()); // Apache Commons IO
            Path directoryPath = Paths.get(System.getProperty("user.dir"), "avy-backend", "src", "main", "resources", "video");
            Path filePath = directoryPath.resolve(generateVideoName() + "." + ext);

            Files.createDirectories(directoryPath); // Ensure directory exists
            Files.write(filePath, bytes); // Write bytes to file

            return filePath.toString();
        } catch (Exception e) {
            throw new RuntimeException("File upload ERROR!", e);
        }
    }

    private String generateVideoName() {
        return UUID.randomUUID().toString();
    }
}
