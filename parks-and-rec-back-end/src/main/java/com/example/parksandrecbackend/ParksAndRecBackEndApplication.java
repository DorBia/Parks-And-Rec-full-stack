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
import java.util.Set;

@SpringBootApplication()
public class ParksAndRecBackEndApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext configurableApplicationContext =
                SpringApplication.run(ParksAndRecBackEndApplication.class, args);

        PRCharacterRepo characterRepo = configurableApplicationContext.getBean(PRCharacterRepo.class);
        EpisodeRepo episodeRepo = configurableApplicationContext.getBean(EpisodeRepo.class);
        SeasonRepo seasonRepo = configurableApplicationContext.getBean(SeasonRepo.class);


        PRCharacter leslie = new PRCharacter("Leslie", 45, "Main character", "https://media.glamour.com/photos/569580c35fff94d44eec3cdc/master/w_1600%2Cc_limit/entertainment-2015-01-leslie-knope-final-season-main.jpg", "Some Name");
        PRCharacter tom = new PRCharacter("Tom", 35, "Funny guy", "https://hips.hearstapps.com/esq.h-cdn.co/assets/15/09/5.jpg", "Some Other");
        PRCharacter tammy = new PRCharacter("Tammy", "Ron's ex", "No idea");
        List<PRCharacter> characters = Arrays.asList(leslie, tom, tammy);

        Season season1 = new Season(1, "some description s1", "https://en.m.wikipedia.org/wiki/Parks_and_Recreation_(season_1)#/media/File%3AParks_and_recreation_season_1_dvd_cover.jpg");
        Season season2 = new Season(2, "some description s2");
        Season season3 = new Season(3, "some description s3");
        List<Season> seasons = Arrays.asList(season1, season2, season3);


        Episode episode1 = new Episode("Some episode", 1, 25, "Cool episode, nothing happened", "https://static.wikia.nocookie.net/parksandrecreation/images/e/eb/S07E01.png");
        Episode episode2 = new Episode("Some other episode", 2, 25, "Cool episode");
        List<Episode> episodes = Arrays.asList(episode1, episode2);


        episode2.setSeasonsEpisode(season3);
        episode2.setSeasonsEpisode(season1);
        episode1.setSeasonsEpisode(season1);

        leslie.addToSeasons(season1);
        leslie.addToSeasons(season2);
        tom.addToSeasons(season2);
        leslie.addToEpisodes(episode1);
        leslie.addToEpisodes(episode2);
        tom.addToEpisodes(episode1);
        tom.addToEpisodes(episode2);

        episode2.setCharactersInEpisode(Set.of(tom, leslie));
        episode1.setCharactersInEpisode(Set.of(tammy));


        seasonRepo.saveAll(seasons);
        episodeRepo.saveAll(episodes);
        characterRepo.saveAll(characters);


    }

}
