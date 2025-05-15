package com.example.avyproject.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CreateOfferDto {

    private String company;
    private String category;
    private Integer priceInCoins;
    private String description;
    private MultipartFile offerImage;
    private LocalDate creationDate;
}
