package com.example.avyproject.service.utility;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.Map;
public class RestUtil {

    public static <T> HttpEntity<Map<String,T>> createHttpEntity(Map<String,T> payload) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new HttpEntity<>(payload,headers);
    }
}
