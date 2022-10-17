package com.example.parksandrecbackend.service;

import com.example.parksandrecbackend.data.Episode;
import com.example.parksandrecbackend.exceptions.EpisodeNotFoundException;
import com.example.parksandrecbackend.repository.EpisodeRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EpisodeService {

    EpisodeRepo episodeRepo;

    public EpisodeService(EpisodeRepo episodeRepo){
        this.episodeRepo = episodeRepo;
    }

    //    CREATE
    public Episode addEpisode(Episode episode) {
        return episodeRepo.saveAndFlush(episode);
    }

    //    READ
    public Episode getEpisodeById(long id) {
        return episodeRepo.findById(id).orElseThrow(EpisodeNotFoundException::new);
    }


    public List<Episode> getAllEpisodes() {
        return episodeRepo.findAll();
    }

    //    UPDATE
    public void updateEpisode(Episode newEpisode, long id){
        if(!episodeRepo.existsById(id)) throw new EpisodeNotFoundException();
        newEpisode.setId(id);
        episodeRepo.saveAndFlush(newEpisode);
    }


    //    DELETE
    public void deleteEpisode(long id){
        episodeRepo.deleteById(id);
    }
}
