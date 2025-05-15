package com.example.avyproject.configuration;

import com.example.avyproject.service.strategy.LessonHandler;
import com.example.avyproject.service.strategy.LessonStrategy;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Configuration
@AllArgsConstructor
public class LessonHandlerConfig {
    @Bean
    public LessonHandler requestReceiver(List<LessonStrategy> strategies) {
        return new LessonHandler(
                strategies.stream()
                        .collect(Collectors.toMap(LessonStrategy::getLessonType, Function.identity())
        ));
    }
}
