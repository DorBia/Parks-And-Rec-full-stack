package com.example.parksandrecbackend.service;

import com.example.parksandrecbackend.data.PRCharacter;
import com.example.parksandrecbackend.exceptions.CharacterNotFoundException;
import com.example.parksandrecbackend.repository.PRCharacterRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PRCharacterService {

    PRCharacterRepo prCharacterRepo;

//    CREATE
    public void addCharacter(PRCharacter character) {
        prCharacterRepo.save(character);
    }

//    READ
    public PRCharacter getCharacterById(long id) {
        return prCharacterRepo.findById(id).orElseThrow(CharacterNotFoundException::new);
    }

    public List<PRCharacter> getCharacterByName(String name) {
        return prCharacterRepo.findByName(name).orElseThrow(CharacterNotFoundException::new);
    }

    public List<PRCharacter> getCharacterByName() {
        return prCharacterRepo.findAll();
    }

//    UPDATE
    public void updateCharacter(PRCharacter newCharacter, long id){
        if(!prCharacterRepo.existsById(id)) throw new CharacterNotFoundException();
        newCharacter.setId(id);
        prCharacterRepo.save(newCharacter);
    }


//    DELETE
    public void delete(long id){
        prCharacterRepo.deleteById(id);
    }
}
