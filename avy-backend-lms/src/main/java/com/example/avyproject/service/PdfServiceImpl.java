package com.example.avyproject.service;

import com.example.avyproject.exceptions.NoImageAttachedException;
import com.example.avyproject.exceptions.NoPdfAttachedException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Slf4j
public class PdfServiceImpl implements PdfService{
    @Override
    public String uploadPdf(MultipartFile file) {
        if(!file.isEmpty()) {
           String ext = FilenameUtils.getExtension(file.getOriginalFilename());
           if(ext != null && !ext.equals("pdf")) {
               throw new NoImageAttachedException(String.format("Received %s extension, but expected %s",ext,"pdf"));
           }
           Path directoryPath = Paths.get(System.getProperty("user.dir"), "avy-backend", "src", "main", "resources",
                    "static", "pdf");
           Path filePath = directoryPath.resolve(generateFileName() + "." + ext);
           try {
               Files.createDirectories(directoryPath);
               file.transferTo(filePath);
               log.info("Saved file at: {}", filePath);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return filePath.toString();
        }
        throw new NoPdfAttachedException("No pdf file attached");
    }

    @Override
    public void deleteFile(String linkToFile) {
        Path path = Path.of(linkToFile);
        try {
            if(Files.exists(path)) {
                Files.delete(path);
                log.info("file {} deleted",linkToFile);
            } else {
                log.warn("file {} does not exist",linkToFile);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String generateFileName() {
        return UUID.randomUUID().toString();
    }
}
