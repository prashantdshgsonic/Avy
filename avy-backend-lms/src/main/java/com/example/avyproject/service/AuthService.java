package com.example.avyproject.service;

import com.example.avyproject.security.JwtRequest;
import com.example.avyproject.security.JwtResponse;
import com.example.avyproject.security.RefreshJwtRequest;

public interface AuthService {
    JwtResponse logIn(JwtRequest jwtRequest);

    JwtResponse getAccessToken(RefreshJwtRequest jwtRequest);

    JwtResponse getRefreshToken(RefreshJwtRequest jwtRequest);

    JwtResponse logInWithVoicePass();
}
