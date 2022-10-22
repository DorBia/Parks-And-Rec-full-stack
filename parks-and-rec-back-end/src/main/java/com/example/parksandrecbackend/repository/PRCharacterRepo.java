package com.example.parksandrecbackend.repository;

import com.example.parksandrecbackend.data.PRCharacter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PRCharacterRepo extends JpaRepository<PRCharacter, Long> {

    List<PRCharacter> getAllByCharactersNameIgnoreCase(String charactersName);

//    void addToEpisode(Episode episode);

//    @Query(value = "SELECT * FROM prcharacter WHERE name = ''", nativeQuery = true)
//    Optional<List<PRCharacter>> findByName(String name);
}
