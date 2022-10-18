package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="season")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    private int seasonsNumber;

//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {CascadeType.DETACH, CascadeType.MERGE,
//                    CascadeType.PERSIST, CascadeType.REFRESH})
//    @JoinTable (
//            name="episodes_in_season",
//            joinColumns = @JoinColumn(name="season_id"),
//            inverseJoinColumns = @JoinColumn(name="episode_id")
//    )

//    @JsonManagedReference
//    @JsonBackReference
//    @JsonIgnore()
//    @JsonIgnoreProperties("seasons")
    @ManyToMany(mappedBy = "seasonsEpisode")
    private List<Episode> episodesSeason;

//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {CascadeType.DETACH, CascadeType.MERGE,
//                    CascadeType.PERSIST, CascadeType.REFRESH})
//    @JoinTable (
//            name="seasons_appearance",
//            joinColumns = @JoinColumn(name="season_id"),
//            inverseJoinColumns = @JoinColumn(name="character_id")
//    )
//    @JsonManagedReference
//    @JsonBackReference
//    @JsonIgnoreProperties("seasons")
//    @JsonIgnore()
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

    //    public void addCharacters(PRCharacter character) {
//        characters.add(character);
//    }
//    public void addEpisodes(Episode episode) {
//        episodes.add(episode);
//    }

    @Override
    public String toString() {
        return "Season{" +
                "seasonsNumber=" + seasonsNumber +
                ", episodes=" + episodesSeason +
                ", characters=" + charactersSeason +
                '}';
    }
}
