package com.example.avyproject.exceptions;

public class ModuleNotFoundException extends RuntimeException{
    public ModuleNotFoundException(String message) {
        super(message);
    }
}
