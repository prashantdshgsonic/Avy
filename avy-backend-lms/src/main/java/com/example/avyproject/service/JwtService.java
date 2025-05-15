package com.example.avyproject.service;

import com.example.avyproject.entity.AvyUser;

public interface JwtService {
    String generateAccessToken(AvyUser avyUser);

    boolean validateToken(String jwtToken, AvyUser avyUser);

    String getUsernameFromToken(String token);

    String generateRefreshToken(AvyUser avyUser);

    boolean validateAccessToken(String accessToken);

    boolean validateRefreshToken(String refreshToken);
}
