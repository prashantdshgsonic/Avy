package com.example.avyproject.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
@ToString
@NoArgsConstructor
public class UserProgressDto {
    private long id;
    private int coins;
    private long userId;
}
