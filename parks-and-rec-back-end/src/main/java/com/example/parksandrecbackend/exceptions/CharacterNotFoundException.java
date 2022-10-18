package com.example.parksandrecbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.EntityNotFoundException;

//@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "character with that ID does not exist")
public class CharacterNotFoundException extends EntityNotFoundException {
    public CharacterNotFoundException() {
        super("Character has not been found");
    }
}
