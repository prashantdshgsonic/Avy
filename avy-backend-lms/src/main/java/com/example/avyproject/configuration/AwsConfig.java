package com.example.avyproject.configuration;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.example.avyproject.service.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class AwsConfig {

    @Value("${aws.region}")
    private String awsRegion;
    @Bean
    public AmazonS3 amazonS3Client() {
        return AmazonS3ClientBuilder.standard()
                .withRegion(awsRegion) // Измените на ваш регион
                .build();
    }

    @Bean
    @Profile("dev")
    public ImageService localImageService() {
        return new LocalImageServiceImpl();
    }

    @Bean
    @Profile({"prod", "test"})
    public ImageService s3ImageService(AmazonS3 amazonS3Client, @Value("${s3.bucket.name}") String bucketName) {
        return new S3ImageServiceImpl(amazonS3Client, bucketName);
    }

    @Bean
    @Profile("dev")
    public VideoService localVideoService(){
        return new LocalVideoServiceImpl();
    }

    @Bean
    @Profile({"prod", "test"})
    public VideoService s3VideoService(AmazonS3 amazonS3Client, @Value("${s3.bucket.name}") String bucketName){
        return new S3VideoServiceImpl(amazonS3Client, bucketName);
    }
}
