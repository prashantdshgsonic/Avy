package com.example.avyproject.service.strategy;

import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
public class LessonHandler {
    private final Map<String, LessonStrategy> strategies;

    public LessonStrategy getStrategy (String lessonType) {
        if (!strategies.containsKey(lessonType)) {
            throw new IllegalArgumentException("Unknown lesson type: " + lessonType);
        }
        return strategies.get(lessonType);
    }

}
