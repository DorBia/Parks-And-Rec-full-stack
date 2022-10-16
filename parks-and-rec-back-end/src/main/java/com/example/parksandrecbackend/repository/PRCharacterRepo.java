package com.example.parksandrecbackend.repository;

import com.example.parksandrecbackend.data.PRCharacter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PRCharacterRepo extends CrudRepository<PRCharacter, Long> {
}
