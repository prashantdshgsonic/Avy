package com.example.avyproject.service;

import org.springframework.web.multipart.MultipartFile;

public interface PdfService {
    String uploadPdf(MultipartFile file);
    void deleteFile(String linkToFile);
}
