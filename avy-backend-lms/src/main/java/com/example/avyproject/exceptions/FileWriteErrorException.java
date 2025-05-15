package com.example.avyproject.exceptions;

public class FileWriteErrorException extends RuntimeException {
    public FileWriteErrorException(String message) {
        super(message);
    }
}
