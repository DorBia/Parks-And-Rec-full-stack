package com.example.parksandrecbackend.controller;


import com.example.parksandrecbackend.data.Episode;
import com.example.parksandrecbackend.exceptions.EpisodeNotFoundException;
import com.example.parksandrecbackend.service.EpisodeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/episode")
@CrossOrigin("http://localhost:3000")
public class EpisodeController {

    EpisodeService episodeService;

    public EpisodeController(EpisodeService episodeService){
        this.episodeService = episodeService;
    }

    @ExceptionHandler
    public String handleException(EpisodeNotFoundException exception) {
        return exception.getMessage();
    }


    // CREATE
    @PostMapping("/create")
    public ResponseEntity<Episode> createEpisode(@RequestBody Episode episode){
        return new ResponseEntity<>(episodeService.addEpisode(episode), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Episode> getById(@PathVariable long id){
        return new ResponseEntity<>(episodeService.getEpisodeById(id), HttpStatus.FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Episode>> getEpisodes() {
        return new ResponseEntity<>(episodeService.getAllEpisodes(), HttpStatus.FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Episode> updateEpisode(@RequestBody Episode newEpisode, @PathVariable long id){
        newEpisode.setId(id);
        episodeService.updateEpisode(newEpisode, id);
        return new ResponseEntity<>(newEpisode, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteEpisode(@PathVariable long id){
        episodeService.deleteEpisode(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
