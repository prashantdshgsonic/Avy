package com.example.avyproject.exceptions;

public class NoVideoAttachedException extends RuntimeException{
    public NoVideoAttachedException(String message) {
        super(message);
    }
}
