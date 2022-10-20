package com.example.parksandrecbackend.service;

import com.example.parksandrecbackend.data.Season;
import com.example.parksandrecbackend.exceptions.SeasonNotFoundException;
import com.example.parksandrecbackend.repository.SeasonRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeasonService {

    SeasonRepo seasonRepo;

    public SeasonService(SeasonRepo seasonRepo){
        this.seasonRepo = seasonRepo;
    }

    //    CREATE
    public Season addSeason(Season season) {
        return seasonRepo.saveAndFlush(season);
    }

    //    READ
    public Season getSeasonById(long id) {
        return seasonRepo.findById(id).orElseThrow(SeasonNotFoundException::new);
    }


    public List<Season> getAllSeasons() {
        return seasonRepo.findAll();
    }

    //    UPDATE
    public void updateSeason(Season newSeason, long id){
        if(!seasonRepo.existsById(id)) throw new SeasonNotFoundException();
        newSeason.setId(id);
        seasonRepo.save(newSeason);
    }


    //    DELETE
    public void deleteSeason(long id){
        Season season = seasonRepo.findById(id).orElseThrow(SeasonNotFoundException::new);
        season.removeFromSeasonCharacters(season);
        season.removeFromSeasonEpisodes(season);
        seasonRepo.deleteById(id);
    }
}
