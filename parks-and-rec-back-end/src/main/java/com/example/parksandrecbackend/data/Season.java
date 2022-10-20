package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;

@Entity
//@Table(name="season")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    private int seasonsNumber;

    @JsonIgnoreProperties(value = {"seasonsEpisode", "charactersInEpisode"})
    @ManyToMany(mappedBy = "seasonsEpisode")
    private List<Episode> episodesSeason;

    @JsonIgnoreProperties(value = {"episodesCharacter", "seasonsCharacter"})
    @ManyToMany(mappedBy = "seasonsCharacter")
    private List<PRCharacter> charactersSeason;

    public Season(int seasonsNumber, List<Episode> episodes, List<PRCharacter> characters) {
        this.seasonsNumber = seasonsNumber;
        this.episodesSeason = episodes;
        this.charactersSeason = characters;
    }

    public Season(int seasonsNumber) {
        this.seasonsNumber = seasonsNumber;
    }

    public Season() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getSeasonsNumber() {
        return seasonsNumber;
    }

    public void setSeasonsNumber(int seasonsNumber) {
        this.seasonsNumber = seasonsNumber;
    }

    public List<Episode> getEpisodesSeason() {
        return episodesSeason;
    }

    public void setEpisodesSeason(List<Episode> episodesSeason) {
        this.episodesSeason = episodesSeason;
    }

    public List<PRCharacter> getCharactersSeason() {
        return charactersSeason;
    }

    public void setCharactersSeason(List<PRCharacter> charactersSeason) {
        this.charactersSeason = charactersSeason;
    }

    public void removeFromSeasonCharacters(Season season) {
        for(PRCharacter character : charactersSeason){
            character.removeFromSeasons(season);
        };
    }

    public void removeFromSeasonEpisodes(Season season) {
        for(Episode episode : episodesSeason){
            episode.removeFromSeasons(season);
        };
    }

    @Override
    public String toString() {
        return "Season{" +
                "seasonsNumber=" + seasonsNumber +
                ", episodes=" + episodesSeason +
                ", characters=" + charactersSeason +
                '}';
    }
}
