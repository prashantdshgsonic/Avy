package com.example.avyproject.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class RoleDto {
    private Long id;
    private String roleName;
}
