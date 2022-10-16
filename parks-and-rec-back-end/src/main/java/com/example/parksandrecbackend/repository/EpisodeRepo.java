package com.example.parksandrecbackend.repository;

import com.example.parksandrecbackend.data.Episode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EpisodeRepo extends CrudRepository<Episode, Long>, JpaRepository<Episode, Long> {
}
