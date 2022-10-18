package com.example.parksandrecbackend;

import com.example.parksandrecbackend.data.Episode;
import com.example.parksandrecbackend.data.PRCharacter;
import com.example.parksandrecbackend.data.Season;
import com.example.parksandrecbackend.repository.EpisodeRepo;
import com.example.parksandrecbackend.repository.PRCharacterRepo;
import com.example.parksandrecbackend.repository.SeasonRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication()
public class ParksAndRecBackEndApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext configurableApplicationContext =
                SpringApplication.run(ParksAndRecBackEndApplication.class, args);

        PRCharacterRepo characterRepo = configurableApplicationContext.getBean(PRCharacterRepo.class);
        EpisodeRepo episodeRepo = configurableApplicationContext.getBean(EpisodeRepo.class);
        SeasonRepo seasonRepo = configurableApplicationContext.getBean(SeasonRepo.class);


        PRCharacter leslie = new PRCharacter("Leslie", 45, "Main character", "some link", "Some Name");
        PRCharacter tom = new PRCharacter("Tom", 35, "Funny guy", "some link", "Some Other");
        PRCharacter tammy = new PRCharacter("Tammy", "Ron's ex", "No idea");
        List<PRCharacter> characters = Arrays.asList(leslie, tom, tammy);

        Season season1 = new Season(1);
        Season season2 = new Season(2);
        List<Season> seasons = Arrays.asList(season1, season2);


        Episode episode1 = new Episode("Some episode", 1, 25, "Cool episode, nothing happened");
        Episode episode2 = new Episode("Some other episode", 2, 25, "Cool episode");
        List<Episode> episodes = Arrays.asList(episode1, episode2);


        episode2.addToSeasons(season2);

        leslie.addToSeasons(season1);
        tom.addToSeasons(season2);
        leslie.addToEpisodes(episode1);
        leslie.addToEpisodes(episode2);

        episode2.setCharactersInEpisode(List.of(tom));
//        season2.addEpisodes(episode1);


        seasonRepo.saveAll(seasons);
        episodeRepo.saveAll(episodes);
        characterRepo.saveAll(characters);









    }

}
