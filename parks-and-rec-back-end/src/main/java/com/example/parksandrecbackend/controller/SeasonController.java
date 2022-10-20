package com.example.parksandrecbackend.controller;

import com.example.parksandrecbackend.data.Season;
import com.example.parksandrecbackend.exceptions.SeasonNotFoundException;
import com.example.parksandrecbackend.service.SeasonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/season")
@CrossOrigin("http://localhost:3000")
public class SeasonController {

    SeasonService seasonService;

    public SeasonController(SeasonService seasonService){
        this.seasonService = seasonService;
    }

    @ExceptionHandler
    public String handleException(SeasonNotFoundException exception) {
        return exception.getMessage();
    }


    // CREATE
    @PostMapping("/create")
    public ResponseEntity<Season> createSeason(@RequestBody Season season){
        return new ResponseEntity<>(seasonService.addSeason(season), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Season> getById(@PathVariable long id){
        return new ResponseEntity<>(seasonService.getSeasonById(id), HttpStatus.FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Season>> getSeasons() {
        return new ResponseEntity<>(seasonService.getAllSeasons(), HttpStatus.FOUND);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Season> updateSeason(@RequestBody Season newSeason, @PathVariable long id){
        newSeason.setId(id);
        seasonService.updateSeason(newSeason, id);
        return new ResponseEntity<Season>(newSeason, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void>  deleteSeason(@PathVariable long id){
        seasonService.deleteSeason(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
