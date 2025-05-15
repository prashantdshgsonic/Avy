package com.example.avyproject.exceptions.payment;

public class SubscriptionNotFoundException extends RuntimeException{

    public SubscriptionNotFoundException(String message){
        super(message);
    }
}

