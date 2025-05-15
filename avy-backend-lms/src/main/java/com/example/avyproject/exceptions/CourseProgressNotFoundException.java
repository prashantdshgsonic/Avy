package com.example.avyproject.exceptions;

public class CourseProgressNotFoundException extends RuntimeException{
    public CourseProgressNotFoundException(String message) {
        super(message);
    }
}
