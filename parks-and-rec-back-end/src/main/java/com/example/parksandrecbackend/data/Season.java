package com.example.parksandrecbackend.data;

import com.fasterxml.jackson.annotation.*;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Column(name = "number")
    private int seasonsNumber;

    @NotNull
    @Column(name = "description")
    private String seasonsDescription;

    @Column(name = "picture")
    private String seasonsPicture;

    @JsonIgnoreProperties(value = {"seasonsEpisode", "charactersInEpisode"})
    @OneToMany(mappedBy = "seasonsEpisode")
    @ToString.Exclude
    private Set<Episode> episodesSeason;

    @JsonIgnoreProperties(value = {"episodesCharacter", "seasonsCharacter"})
    @ManyToMany(mappedBy = "seasonsCharacter")
    @ToString.Exclude
    private Set<PRCharacter> charactersSeason;


    public void removeFromSeasonCharacters(Season season) {
        for(PRCharacter character : charactersSeason){
            character.removeFromSeasons(season);
        }
    }

    public void removeFromSeasonEpisodes() {
        for(Episode episode : episodesSeason){
            episode.setSeasonsEpisode(null);
        }
    }

}
