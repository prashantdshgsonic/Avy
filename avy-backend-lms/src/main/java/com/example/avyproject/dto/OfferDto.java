package com.example.avyproject.dto;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class OfferDto {

    private Long id;
    private String linkToImage;
    private String company;
    private String category;
    private Integer priceInCoins;
    private String description;
    private LocalDate creationDate;
    private LocalDate lastUpdateDate;
}
