package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class PRCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Column(name = "name")
    private String charactersName;

    @Column(name = "age")
    private int age;

    @NotNull
    @Column(name = "description")
    private String charactersDescription;

    @Column(name = "picture_link")
    private String charactersPictureLink;

    @NotNull
    @Column(name = "actor")
    private String actorsName;


    @JsonIgnoreProperties(value = {"charactersInEpisode", "seasonsEpisode"})
    @ManyToMany()
    @JoinTable (
            name="episodes_appearance",
            joinColumns = @JoinColumn(name="characters_id"),
            inverseJoinColumns = @JoinColumn(name="episode_id")
    )
    @ToString.Exclude
    private Set<Episode> episodesCharacter = new HashSet<>();


    @JsonIgnoreProperties(value = {"charactersSeason", "episodesSeason"})
    @ManyToMany()
    @JoinTable (
            name="seasons_appearance",
            joinColumns = @JoinColumn(name="character_id"),
            inverseJoinColumns = @JoinColumn(name="season_id")
    )
    @ToString.Exclude
    private Set<Season> seasonsCharacter = new HashSet<>();


    public void removeFromEpisodes(Episode episode) {
        episodesCharacter.remove(episode);
    }

    public void removeFromSeasons(Season season) {
        seasonsCharacter.remove(season);
    }


}
