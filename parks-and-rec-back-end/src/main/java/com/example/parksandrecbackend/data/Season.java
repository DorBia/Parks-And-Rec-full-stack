package com.example.parksandrecbackend.data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Season")
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    private int seasonsNumber;

    @ManyToMany(mappedBy = "seasons")
    private List<Episode> episodesInSeason;

    @ManyToMany(mappedBy = "seasons")
    private List<PRCharacter> charactersInSeason;

    public Season(int seasonsNumber) {
        this.seasonsNumber = seasonsNumber;
    }

    public Season() {

    }

    public int getSeasonsNumber() {
        return seasonsNumber;
    }

    public void setSeasonsNumber(int seasonsNumber) {
        this.seasonsNumber = seasonsNumber;
    }

    public List<Episode> getEpisodes() {
        return episodesInSeason;
    }

    public List<PRCharacter> getCharacters() {
        return charactersInSeason;
    }

    public List<Episode> getEpisodesInSeason() {
        return episodesInSeason;
    }

    public void setEpisodesInSeason(List<Episode> episodesInSeason) {
        this.episodesInSeason = episodesInSeason;
    }

    public List<PRCharacter> getCharactersInSeason() {
        return charactersInSeason;
    }

    public void setCharactersInSeason(List<PRCharacter> charactersInSeason) {
        this.charactersInSeason = charactersInSeason;
    }

//    public void addCharacters(PRCharacter character) {
//        charactersInSeason.add(character);
//    }
//    public void addEpisodes(Episode episode) {
//        episodesInSeason.add(episode);
//    }

    @Override
    public String toString() {
        return "Season{" +
                "seasonsNumber=" + seasonsNumber +
                ", episodes=" + episodesInSeason +
                ", charactersInSeason=" + charactersInSeason +
                '}';
    }
}
