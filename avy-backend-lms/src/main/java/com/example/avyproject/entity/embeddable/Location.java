package com.example.avyproject.entity.embeddable;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Location {
    private String state;
    private String city;
    private String country;
}
