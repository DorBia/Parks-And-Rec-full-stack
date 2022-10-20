package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class PRCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", nullable = false)
    private String charactersName;

    @Column(name = "age")
    private int age;

    @Column(name = "description", nullable = false)
    private String charactersDescription;

    @Column(name = "picture_link")
    private String charactersPictureLink;

    @Column(name = "actor", nullable = false)
    private String actorsName;


    @JsonIgnoreProperties(value = {"charactersInEpisode", "seasonsEpisode"})
    @ManyToMany()
    @JoinTable (
            name="episodes_appearance",
            joinColumns = @JoinColumn(name="characters_id"),
            inverseJoinColumns = @JoinColumn(name="episode_id")
    )
    private List<Episode> episodesCharacter = new ArrayList<>();


    @JsonIgnoreProperties(value = {"charactersSeason", "episodesSeason"})
    @ManyToMany()
    @JoinTable (
            name="seasons_appearance",
            joinColumns = @JoinColumn(name="character_id"),
            inverseJoinColumns = @JoinColumn(name="season_id")
    )
    private List<Season> seasonsCharacter = new ArrayList<>();


    public PRCharacter(String charactersName, int age, String charactersDescription, String charactersPictureLink, String actorsName) {
        this.charactersName = charactersName;
        this.age = age;
        this.charactersDescription = charactersDescription;
        this.charactersPictureLink = charactersPictureLink;
        this.actorsName = actorsName;
    }

    public PRCharacter(String charactersName, String charactersDescription, String actorsName) {
        this.charactersName = charactersName;
        this.charactersDescription = charactersDescription;
        this.actorsName = actorsName;
    }

    public PRCharacter() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCharactersName() {
        return charactersName;
    }

    public void setCharactersName(String charactersName) {
        this.charactersName = charactersName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCharactersDescription() {
        return charactersDescription;
    }

    public void setCharactersDescription(String charactersDescription) {
        this.charactersDescription = charactersDescription;
    }

    public String getCharactersPictureLink() {
        return charactersPictureLink;
    }

    public void setCharactersPictureLink(String charactersPictureLink) {
        this.charactersPictureLink = charactersPictureLink;
    }

    public String getActorsName() {
        return actorsName;
    }

    public void setActorsName(String actorsName) {
        this.actorsName = actorsName;
    }

    public List<Episode> getEpisodesCharacter() {
        return episodesCharacter;
    }

    public void setEpisodesCharacter(List<Episode> episodesCharacter) {
        this.episodesCharacter = episodesCharacter;
    }

    public List<Season> getSeasonsCharacter() {
        return seasonsCharacter;
    }

    public void setSeasonsCharacter(List<Season> seasonsCharacter) {
        this.seasonsCharacter = seasonsCharacter;
    }

    public void addToEpisodes(Episode episode) {
        episodesCharacter.add(episode);
    }
    public void addToSeasons(Season season) {
        seasonsCharacter.add(season);
    }

    public void removeFromEpisodes(Episode episode) {
        episodesCharacter.remove(episode);
    }

    public void removeFromSeasons(Season season) {
        seasonsCharacter.remove(season);
    }


    @Override
    public String toString() {
        return "Character{" +
                "id=" + id +
                ", charactersName='" + charactersName + '\'' +
                ", age=" + age +
                ", charactersDescription='" + charactersDescription + '\'' +
                ", charactersPictureLink='" + charactersPictureLink + '\'' +
                ", actorsName='" + actorsName + '\'' +
                ", episodes=" + episodesCharacter +
                ", seasons=" + seasonsCharacter +
                '}';
    }
}
