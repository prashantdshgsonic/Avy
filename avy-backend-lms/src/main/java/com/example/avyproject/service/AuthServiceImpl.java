package com.example.avyproject.service;

import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.security.JwtRequest;
import com.example.avyproject.security.JwtResponse;
import com.example.avyproject.security.RefreshJwtRequest;
import com.example.avyproject.service.utility.RestUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AvyUserService avyUserService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final RestTemplate restTemplate;
    @Value("${recognise.voice.url}")
    private String recogniseVoiceServiceUrl;

    @Override
    public JwtResponse logIn(JwtRequest jwtRequest) {
        validateLogin(jwtRequest); //check the login is not null
        AvyUser avyUser = avyUserService.getByLogin(jwtRequest.getLogin());//get user from DB by login
        if (validatePassword(jwtRequest, avyUser)) {
            //check if the incoming login equals login in DB
            return new JwtResponse(jwtService.generateAccessToken(avyUser), null); //return access token
        }
        return new JwtResponse(null, "Invalid credentials. Please check your login and password.");
    }

    @Override
    public JwtResponse logInWithVoicePass() {
        Map answer = restTemplate.postForObject(recogniseVoiceServiceUrl, RestUtil.createHttpEntity(null), Map.class);
        if(answer.containsKey("error")) {
            throw new RuntimeException(String.valueOf(answer.get("error")));
        }

        Long userId = Long.valueOf((Integer) answer.get("user_id"));
        System.out.println("user id recognised:"+userId);
        AvyUser avyUser = avyUserService.getEntityById(userId);
        log.info("User recognised: id - {}, name - {}",userId,avyUser.getFirstName());
        return new JwtResponse(jwtService.generateAccessToken(avyUser),null);
    }

    public boolean validatePassword(JwtRequest jwtRequest, AvyUser avyUser) {
        return passwordEncoder.matches(jwtRequest.getPassword(), avyUser.getPassword());
    }

    public void validateLogin(JwtRequest jwtRequest) {
        if (StringUtils.isEmpty(jwtRequest.getLogin())) {
            throw new IllegalArgumentException("Login cannot be empty");
        }
    }
    @Override
    public JwtResponse getAccessToken(RefreshJwtRequest jwtRequest) {
        return null;
    }

    @Override
    public JwtResponse getRefreshToken(RefreshJwtRequest jwtRequest) {
        return null;
    }

}
