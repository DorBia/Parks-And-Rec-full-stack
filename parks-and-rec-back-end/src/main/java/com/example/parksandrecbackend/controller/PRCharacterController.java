package com.example.parksandrecbackend.controller;

import com.example.parksandrecbackend.data.PRCharacter;
import com.example.parksandrecbackend.exceptions.CharacterNotFoundException;
import com.example.parksandrecbackend.service.PRCharacterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/character")
public class PRCharacterController {


    PRCharacterService prCharacterService;

    public PRCharacterController(PRCharacterService prCharacterService){
        this.prCharacterService = prCharacterService;
    }

//    @ExceptionHandler
//    public String handleException(CharacterNotFoundException exception) {
//        return exception.getMessage();
//    }


    // CREATE
    @PostMapping("/create")
    public PRCharacter createCharacter(@RequestBody PRCharacter character){
        prCharacterService.addCharacter(character);
        return character;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PRCharacter> getById(@PathVariable long id){
        return new ResponseEntity<>(prCharacterService.getCharacterById(id), HttpStatus.FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PRCharacter>> getCharacters() {
        return new ResponseEntity<>(prCharacterService.getAllCharacters(), HttpStatus.FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PRCharacter> updateCharacter(@RequestBody PRCharacter newCharacter, @PathVariable long id){
        newCharacter.setId(id);
        prCharacterService.updateCharacter(newCharacter, id);
        return new ResponseEntity<>(newCharacter, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public void deleteCharacter(@PathVariable long id){
        prCharacterService.deleteCharacter(id);
    }

}
