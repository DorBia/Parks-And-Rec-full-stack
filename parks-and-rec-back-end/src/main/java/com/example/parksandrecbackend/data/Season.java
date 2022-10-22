package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
//@Table(name="season")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "number", nullable = false)
    private int seasonsNumber;

    @Column(name = "description", nullable = false)
    private String seasonsDescription;

    @Column(name = "picture")
    private String seasonsPicture;

    @JsonIgnoreProperties(value = {"seasonsEpisode", "charactersInEpisode"})
    @OneToMany(mappedBy = "seasonsEpisode")
    private Set<Episode> episodesSeason;

    @JsonIgnoreProperties(value = {"episodesCharacter", "seasonsCharacter"})
    @ManyToMany(mappedBy = "seasonsCharacter")
    private Set<PRCharacter> charactersSeason;

    public Season(int seasonsNumber, String seasonsDescription, String seasonsPicture) {
        this.seasonsNumber = seasonsNumber;
        this.seasonsDescription = seasonsDescription;
        this.seasonsPicture = seasonsPicture;
    }

    public Season(int seasonsNumber, String seasonsDescription) {
        this.seasonsNumber = seasonsNumber;
        this.seasonsDescription = seasonsDescription;
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

    public Set<Episode> getEpisodesSeason() {
        return episodesSeason;
    }

    public void setEpisodesSeason(Set<Episode> episodesSeason) {
        this.episodesSeason = episodesSeason;
    }

    public Set<PRCharacter> getCharactersSeason() {
        return charactersSeason;
    }

    public void setCharactersSeason(Set<PRCharacter> charactersSeason) {
        this.charactersSeason = charactersSeason;
    }

    public String getSeasonsDescription() {
        return seasonsDescription;
    }

    public void setSeasonsDescription(String seasonsDescription) {
        this.seasonsDescription = seasonsDescription;
    }

    public String getSeasonsPicture() {
        return seasonsPicture;
    }

    public void setSeasonsPicture(String seasonsPicture) {
        this.seasonsPicture = seasonsPicture;
    }

    public void removeFromSeasonCharacters(Season season) {
        for(PRCharacter character : charactersSeason){
            character.removeFromSeasons(season);
        };
    }

    public void removeFromSeasonEpisodes() {
        for(Episode episode : episodesSeason){
            episode.setSeasonsEpisode(null);
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
