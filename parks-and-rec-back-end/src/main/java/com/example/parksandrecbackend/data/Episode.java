package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String episodesName;
    private int episodeNumber;
    private int episodesLengthMinutes;
    private String episodesDescription;

    @JsonIgnoreProperties(value = {"episodesSeason", "charactersSeason"})
    @ManyToMany()
    @JoinTable (
            name="episodes_in_season",
            joinColumns = @JoinColumn(name="episode_id"),
            inverseJoinColumns = @JoinColumn(name="season_id")
    )
    private List<Season> seasonsEpisode = new ArrayList<>();


    @JsonIgnoreProperties(value = {"episodesCharacter", "seasonsCharacter"})
    @ManyToMany(mappedBy="episodesCharacter")
    private List<PRCharacter> charactersInEpisode;



    public Episode(String episodesName, int episodeNumber, int episodesLengthMinutes, String episodesDescription) {
        this.episodesName = episodesName;
        this.episodeNumber = episodeNumber;
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
        return episodeNumber;
    }

    public void setEpisodeNumber(int episodeNumber) {
        this.episodeNumber = episodeNumber;
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

    public List<Season> getSeasonsEpisode() {
        return seasonsEpisode;
    }

    public void setSeasonsEpisode(List<Season> seasonsEpisode) {
        this.seasonsEpisode = seasonsEpisode;
    }

    public List<PRCharacter> getCharactersInEpisode() {
        return charactersInEpisode;
    }

    public void setCharactersInEpisode(List<PRCharacter> charactersInEpisode) {
        this.charactersInEpisode = charactersInEpisode;
    }

    public void addToSeasons(Season season) {
        seasonsEpisode.add(season);
    }

    public void removeFromSeasons(Season season) {
        seasonsEpisode.remove(season);
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
