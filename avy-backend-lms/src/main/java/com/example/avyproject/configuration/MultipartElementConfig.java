package com.example.avyproject.configuration;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.MultipartConfigElement;

/**
 * Configuration class for handling multipart file uploads.
 */
@Configuration
public class MultipartElementConfig {
    /**
     * Creates a bean for MultipartConfigElement.
     *
     * @return MultipartConfigElement bean for configuring multipart file uploads.
     */
    @Bean
    MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        return factory.createMultipartConfig();
    }
}
