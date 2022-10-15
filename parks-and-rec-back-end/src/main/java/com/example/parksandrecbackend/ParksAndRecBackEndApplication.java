package com.example.parksandrecbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class ParksAndRecBackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(ParksAndRecBackEndApplication.class, args);
        System.out.println("working");
    }

}
