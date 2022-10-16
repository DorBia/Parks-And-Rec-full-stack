package com.example.parksandrecbackend.repository;

import com.example.parksandrecbackend.data.Season;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeasonRepo extends CrudRepository<Season, Long> {
}
