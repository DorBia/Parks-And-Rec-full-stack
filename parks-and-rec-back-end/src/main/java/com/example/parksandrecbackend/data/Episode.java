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
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Column(name = "name")
    private String episodesName;

    @NotNull
    @Column(name = "number")
    private int episodesNumber;

    @NotNull
    @Column(name = "length")
    private int episodesLengthMinutes;

    @NotNull
    @Column(name = "description")
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
    @ToString.Exclude
    private Set<PRCharacter> charactersInEpisode;


    public void removeFromEpisodeCharacters(Episode episode) {
        for(PRCharacter character : charactersInEpisode){
            character.removeFromEpisodes(episode);
        }
    }

}
