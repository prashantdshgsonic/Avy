package com.example.avyproject.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AvyUserAuthDto {
    private String email;
    private String password;
}
