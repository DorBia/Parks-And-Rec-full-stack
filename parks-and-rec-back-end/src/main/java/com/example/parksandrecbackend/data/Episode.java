package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", nullable = false)
    private String episodesName;

    @Column(name = "number", nullable = false)
    private int episodesNumber;

    @Column(name = "length", nullable = false)
    private int episodesLengthMinutes;

    @Column(name = "description", nullable = false)
    private String episodesDescription;

    @Column(name = "picture")
    private String episodesPicture;

    @JsonIgnoreProperties(value = {"episodesSeason", "charactersSeason"})
    @ManyToOne()
    @JoinTable (
            name="episodes_in_season",
            joinColumns = @JoinColumn(name="episode_id"),
            inverseJoinColumns = @JoinColumn(name="season_id")
    )
    private Season seasonsEpisode;


    @JsonIgnoreProperties(value = {"episodesCharacter", "seasonsCharacter"})
    @ManyToMany(mappedBy="episodesCharacter")
    private Set<PRCharacter> charactersInEpisode;

    public Episode(String episodesName, int episodesNumber, int episodesLengthMinutes, String episodesDescription, String episodesPicture) {
        this.episodesName = episodesName;
        this.episodesNumber = episodesNumber;
        this.episodesLengthMinutes = episodesLengthMinutes;
        this.episodesDescription = episodesDescription;
        this.episodesPicture = episodesPicture;
    }

    public Episode(String episodesName, int episodesNumber, int episodesLengthMinutes, String episodesDescription) {
        this.episodesName = episodesName;
        this.episodesNumber = episodesNumber;
        this.episodesLengthMinutes = episodesLengthMinutes;
        this.episodesDescription = episodesDescription;
    }

    public Episode() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEpisodesName() {
        return episodesName;
    }

    public void setEpisodesName(String episodesName) {
        this.episodesName = episodesName;
    }

    public int getEpisodeNumber() {
        return episodesNumber;
    }

    public void setEpisodeNumber(int episodeNumber) {
        this.episodesNumber = episodeNumber;
    }

    public int getEpisodesLengthMinutes() {
        return episodesLengthMinutes;
    }

    public void setEpisodesLengthMinutes(int episodesLengthMinutes) {
        this.episodesLengthMinutes = episodesLengthMinutes;
    }

    public String getEpisodesDescription() {
        return episodesDescription;
    }

    public void setEpisodesDescription(String episodesDescription) {
        this.episodesDescription = episodesDescription;
    }


    public Season getSeasonsEpisode() {
        return seasonsEpisode;
    }

    public void setSeasonsEpisode(Season seasonsEpisode) {
        this.seasonsEpisode = seasonsEpisode;
    }

    public Set<PRCharacter> getCharactersInEpisode() {
        return charactersInEpisode;
    }

    public void setCharactersInEpisode(Set<PRCharacter> charactersInEpisode) {
        this.charactersInEpisode = charactersInEpisode;
    }

    public int getEpisodesNumber() {
        return episodesNumber;
    }

    public void setEpisodesNumber(int episodesNumber) {
        this.episodesNumber = episodesNumber;
    }

    public String getEpisodesPicture() {
        return episodesPicture;
    }

    public void setEpisodesPicture(String episodesPicture) {
        this.episodesPicture = episodesPicture;
    }

    public void removeFromEpisodeCharacters(Episode episode) {
        for(PRCharacter character : charactersInEpisode){
            character.removeFromEpisodes(episode);
        };
    }

    @Override
    public String toString() {
        return "Episode{" +
                " episodesName='" + episodesName + '\'' +
                ", episodesLengthMinutes=" + episodesLengthMinutes +
                ", episodesDescription='" + episodesDescription + '\'' +
                ", charactersInEpisode=" + charactersInEpisode +
                '}';
    }
}
