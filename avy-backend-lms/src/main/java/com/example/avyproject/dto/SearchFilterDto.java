package com.example.avyproject.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class SearchFilterDto {
    private String keyword;
    private String state;
    private String city;
    private String country;
    private int pageOrdinal;
}
