package com.example.avyproject.exceptions.payment;

public class SubscriptionNotActivatedException extends RuntimeException{

    public SubscriptionNotActivatedException(String message){
        super(message);
    }
}

