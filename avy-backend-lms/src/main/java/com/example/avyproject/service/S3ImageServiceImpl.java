package com.example.avyproject.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.avyproject.exceptions.NoImageAttachedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Slf4j
public class S3ImageServiceImpl implements ImageService{

    private final AmazonS3 amazonS3Client;
    private final String bucketName;

    public S3ImageServiceImpl(AmazonS3 amazonS3Client, String bucketName) {
        this.amazonS3Client = amazonS3Client;
        this.bucketName = bucketName;
        log.info("image bucket " + bucketName);
        log.info("region name " + amazonS3Client.getRegionName());
    }
    @Override
    public String uploadImage(MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                log.warn("inside upload Image");
                String keyName = "images/" + generateImageName() + ".png";
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentLength(file.getSize());
                metadata.setContentType(file.getContentType());

                amazonS3Client.putObject(new PutObjectRequest(bucketName, keyName, file.getInputStream(), metadata));
                log.warn("successfully upload image");
                // Возвращаем URL файла на S3
                return amazonS3Client.getUrl(bucketName, keyName).toString();
            } catch (AmazonServiceException e) {
                throw new RuntimeException("Error during file upload to S3: " + e.getMessage());
            } catch (IOException e) {
                throw new RuntimeException("Error reading file content: " + e.getMessage());
            }
        } else {
            throw new NoImageAttachedException("No image attached");
        }
    }

    @Override
    public void deleteImage(String path) {

    }

    private String generateImageName() {
        return UUID.randomUUID().toString();
    }
}
