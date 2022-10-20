package com.example.parksandrecbackend.service;

import com.example.parksandrecbackend.data.PRCharacter;
import com.example.parksandrecbackend.exceptions.CharacterNotFoundException;
import com.example.parksandrecbackend.repository.PRCharacterRepo;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PRCharacterService {

    PRCharacterRepo prCharacterRepo;

    public PRCharacterService(PRCharacterRepo prCharacterRepo) {
        this.prCharacterRepo = prCharacterRepo;
    }

//    CREATE
    public void addCharacter(PRCharacter character) {
        prCharacterRepo.save(character);
    }

//    READ
    public PRCharacter getCharacterById(long id) {
        if(!prCharacterRepo.existsById(id)) throw new CharacterNotFoundException();
        return prCharacterRepo.findById(id).orElseThrow(CharacterNotFoundException::new);
    }

    public List<PRCharacter> getAllCharacters() {
        return prCharacterRepo.findAll();
    }

    public List<PRCharacter> getAllByName(String charactersName) {
        return prCharacterRepo.getAllByCharactersNameIgnoreCase(charactersName);
    }

//    UPDATE
    public void updateCharacter(PRCharacter newCharacter, long id){
        if(!prCharacterRepo.existsById(id)) throw new CharacterNotFoundException();
        newCharacter.setId(id);
        prCharacterRepo.saveAndFlush(newCharacter);
    }


//    DELETE
    public void deleteCharacter(long id){
        prCharacterRepo.deleteById(id);
    }
}
