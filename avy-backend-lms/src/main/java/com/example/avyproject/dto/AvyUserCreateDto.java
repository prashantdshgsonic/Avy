package com.example.avyproject.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AvyUserCreateDto {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String username;
    private String roleName;
}
