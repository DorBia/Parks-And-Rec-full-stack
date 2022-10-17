package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="season")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

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

    @JsonManagedReference
//    @JsonBackReference
//    @JsonIgnoreProperties("seasons")
    @ManyToMany(mappedBy = "seasons")
    private List<Episode> episodes;

//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {CascadeType.DETACH, CascadeType.MERGE,
//                    CascadeType.PERSIST, CascadeType.REFRESH})
//    @JoinTable (
//            name="seasons_appearance",
//            joinColumns = @JoinColumn(name="season_id"),
//            inverseJoinColumns = @JoinColumn(name="character_id")
//    )
    @JsonManagedReference
//    @JsonBackReference
//    @JsonIgnoreProperties("seasons")
    @ManyToMany(mappedBy = "seasons")
    private List<PRCharacter> characters;

    public Season(int seasonsNumber, List<Episode> episodes, List<PRCharacter> characters) {
        this.seasonsNumber = seasonsNumber;
        this.episodes = episodes;
        this.characters = characters;
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

    public List<Episode> getEpisodes() {
        return episodes;
    }

    public void setEpisodes(List<Episode> episodes) {
        this.episodes = episodes;
    }

    public List<PRCharacter> getCharacters() {
        return characters;
    }

    public void setCharacters(List<PRCharacter> characters) {
        this.characters = characters;
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
                ", episodes=" + episodes +
                ", characters=" + characters +
                '}';
    }
}
