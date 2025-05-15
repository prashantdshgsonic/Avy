package com.example.avyproject.exceptions;

public class TextLessonNotFoundException extends RuntimeException {
    public TextLessonNotFoundException(String message) {
        super(message);
    }
}
