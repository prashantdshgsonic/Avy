package com.example.avyproject.exceptions;

public class LessonProgressNotFoundException extends RuntimeException{
    public LessonProgressNotFoundException(String message) {
        super(message);
    }
}
