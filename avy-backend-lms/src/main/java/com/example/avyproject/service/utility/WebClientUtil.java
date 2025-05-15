package com.example.avyproject.service.utility;

import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

public class WebClientUtil {
    public static <T,K> T webClientSendPost(WebClient webClient, String url, K bodyValue, Class<T> clazz) {
        return webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(bodyValue)
                .retrieve()
                .bodyToMono(clazz).block();
    }
}
