package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "prcharacter")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

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


//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
//                    CascadeType.REFRESH})
//    @JsonManagedReference
//    @JsonIgnoreProperties("characters")
    @JsonBackReference
    @ManyToMany()
    @JoinTable (
            name="episodes_appearance",
            joinColumns = @JoinColumn(name="characters_id"),
            inverseJoinColumns = @JoinColumn(name="episode_id")
    )
    private List<Episode> episodes = new ArrayList<>();

//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {CascadeType.DETACH, CascadeType.MERGE,
//                    CascadeType.PERSIST, CascadeType.REFRESH})
//    @JsonManagedReference
//    @JsonIgnoreProperties("characters")
    @JsonBackReference
    @ManyToMany()
    @JoinTable (
            name="seasons_appearance",
            joinColumns = @JoinColumn(name="character_id"),
            inverseJoinColumns = @JoinColumn(name="season_id")
    )
    private List<Season> seasons = new ArrayList<>();


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

    public List<Episode> getEpisodes() {
        return episodes;
    }

    public void setEpisodes(List<Episode> episodes) {
        this.episodes = episodes;
    }

    public List<Season> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<Season> seasons) {
        this.seasons = seasons;
    }

    public void addToEpisodes(Episode episode) {
        episodes.add(episode);
    }
    public void addToSeasons(Season season) {
        seasons.add(season);
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
                ", episodes=" + episodes +
                ", seasons=" + seasons +
                '}';
    }
}
