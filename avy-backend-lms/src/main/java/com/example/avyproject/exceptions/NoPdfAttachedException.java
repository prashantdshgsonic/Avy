package com.example.avyproject.exceptions;

public class NoPdfAttachedException extends RuntimeException {
    public NoPdfAttachedException(String message) {
        super(message);
    }
}
