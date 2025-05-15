package com.example.avyproject;

import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class AvyProjectApplication {
	private static final Logger log = LoggerFactory.getLogger(AvyProjectApplication.class);

	public static void main(String[] args) {
		log.info("Starting application");
		SpringApplication.run(AvyProjectApplication.class, args);
		log.info("Example log from {}", Example.class.getSimpleName());
	}

}
