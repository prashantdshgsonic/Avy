package com.example.avyproject.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.avyproject.exceptions.NoVideoAttachedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Slf4j
public class S3VideoServiceImpl implements VideoService {
    private final AmazonS3 amazonS3Client;
    private final String bucketName;

    public S3VideoServiceImpl(AmazonS3 amazonS3Client, String bucketName) {
        this.amazonS3Client = amazonS3Client;
        this.bucketName = bucketName;
        log.info("video bucket " + bucketName);
    }

    @Override
    public String uploadVideo(MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                log.warn("inside upload Image");
                String keyName = "video/" + generateImageName() + ".mp4";
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentLength(file.getSize());
                metadata.setContentType(file.getContentType());

                amazonS3Client.putObject(new PutObjectRequest(bucketName, keyName, file.getInputStream(), metadata));
                log.warn("successfully upload video");
                // Возвращаем URL файла на S3
                return amazonS3Client.getUrl(bucketName, keyName).toString();
            } catch (AmazonServiceException e) {
                throw new RuntimeException("Error during file upload to S3: " + e.getMessage());
            } catch (IOException e) {
                throw new RuntimeException("Error reading file content: " + e.getMessage());
            }
        } else {
            throw new NoVideoAttachedException("No video attached");
        }
    }

    private String generateImageName() {
        return UUID.randomUUID().toString();
    }
}
