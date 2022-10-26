package com.example.parksandrecbackend.controller;

import com.example.parksandrecbackend.data.PRCharacter;
import com.example.parksandrecbackend.exceptions.CharacterNotFoundException;
import com.example.parksandrecbackend.service.PRCharacterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/character")
@CrossOrigin("https://parks-and-rec-ae5dc.web.app")
public class PRCharacterController {


    PRCharacterService prCharacterService;

    public PRCharacterController(PRCharacterService prCharacterService){
        this.prCharacterService = prCharacterService;
    }

    @ExceptionHandler
    public String handleException(CharacterNotFoundException exception) {
        return exception.getMessage();
    }


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
    public ResponseEntity<List<PRCharacter>> getCharacters(@RequestParam(required = false) String name) {
        if(name != null) {
            return new ResponseEntity<>(prCharacterService.getAllByName(name), HttpStatus.FOUND);
        }
        return new ResponseEntity<>(prCharacterService.getAllCharacters(), HttpStatus.FOUND);

    }


    @PutMapping("/{id}")
    public ResponseEntity<PRCharacter> updateCharacter(@RequestBody PRCharacter newCharacter, @PathVariable long id){
        newCharacter.setId(id);
        prCharacterService.updateCharacter(newCharacter, id);
        return new ResponseEntity<>(newCharacter, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteCharacter(@PathVariable long id){
        prCharacterService.deleteCharacter(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
