package com.example.parksandrecbackend.repository;

import com.example.parksandrecbackend.data.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeasonRepo extends JpaRepository<Season, Long> {
}
