package com.example.avyproject.exceptions;

public class AssetAlreadyExistsException extends RuntimeException{
    public AssetAlreadyExistsException(String message) {
        super(message);
    }
}
