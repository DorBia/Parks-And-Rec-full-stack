package com.example.parksandrecbackend.exceptions;


public class EpisodeNotFoundException extends RuntimeException {
    public EpisodeNotFoundException() {
        super("Episode has not been found");
    }
}