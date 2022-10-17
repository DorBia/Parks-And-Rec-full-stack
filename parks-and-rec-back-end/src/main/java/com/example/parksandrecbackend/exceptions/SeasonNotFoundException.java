package com.example.parksandrecbackend.exceptions;


public class SeasonNotFoundException extends RuntimeException {
    public SeasonNotFoundException() {
        super("Season has not been found");
    }
}
