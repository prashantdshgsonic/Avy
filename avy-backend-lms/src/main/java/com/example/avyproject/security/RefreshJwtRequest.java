package com.example.avyproject.security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshJwtRequest {

    private String refreshToken;
}
