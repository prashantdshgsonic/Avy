package com.example.avyproject.exceptions;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException (String message){
        super(message);
    }
}
