package com.example.parksandrecbackend.data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Episode")
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String episodesName;
    private int episodeNumber;
    private int episodesLengthMinutes;
    private String episodesDescription;

    @ManyToMany()
    @JoinTable (
            name="episodes_in_season",
            joinColumns = @JoinColumn(name="episode_id"),
            inverseJoinColumns = @JoinColumn(name="season_id")
    )
    private List<Season> seasons = new ArrayList<>();

    @ManyToMany(mappedBy="episodes")
    private List<PRCharacter> charactersInEpisode;



    public Episode(String episodesName, int episodeNumber, int episodesLengthMinutes, String episodesDescription) {
        this.episodesName = episodesName;
        this.episodeNumber = episodeNumber;
        this.episodesLengthMinutes = episodesLengthMinutes;
        this.episodesDescription = episodesDescription;
    }

    public Episode() {

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

    public List<Season> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<Season> seasons) {
        this.seasons = seasons;
    }

    public List<PRCharacter> getCharactersInEpisode() {
        return charactersInEpisode;
    }

    public void setCharactersInEpisode(List<PRCharacter> charactersInEpisode) {
        this.charactersInEpisode = charactersInEpisode;
    }

    //    public void addCharacters(PRCharacter character) {
//        charactersInEpisode.add(character);
//    }
    public void addToSeasons(Season season) {
        seasons.add(season);
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
