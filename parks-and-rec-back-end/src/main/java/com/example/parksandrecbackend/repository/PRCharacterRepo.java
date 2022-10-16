package com.example.parksandrecbackend.repository;

import com.example.parksandrecbackend.data.PRCharacter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PRCharacterRepo extends CrudRepository<PRCharacter, Long>, JpaRepository<PRCharacter, Long> {

    @Query(value = "SELECT * FROM prcharacter WHERE name = ''", nativeQuery = true)
    Optional<List<PRCharacter>> findByName(String name);
}