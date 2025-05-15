package com.example.avyproject.enums;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Arrays;

@RequiredArgsConstructor
public enum Degrees {
    PHD("PHD"),
    BACHELOR("BACHELOR"),
    MASTER("MASTER"),
    POSTGRADUATE("POSTGRADUATE"),
    OTHER("OTHER"),
    INCOMPLETE("INCOMPLETE");

    private final String text;

    public static Degrees fromText(String degreeTitle) {
        return Arrays.stream(Degrees.values())
                .filter(el -> el.text.equals(degreeTitle))
                .findFirst().get();
    }

    public static boolean degreeExists(String degreeTitle) {
        return Arrays.stream(Degrees.values())
                .anyMatch(el -> el.text.equals(degreeTitle));
    }
}
