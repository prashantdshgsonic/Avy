package com.example.avyproject.service;

import com.example.avyproject.entity.AvyUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;
    private SecretKey key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    @Override
    public String generateAccessToken(AvyUser avyUser) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        return Jwts.builder()
                .setSubject(avyUser.getEmail()) // unique user's field
                .setIssuedAt(now)
                // .setExpiration(expiryDate) // Still no expiry date
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    @Override
    public boolean validateToken(String jwtToken, AvyUser avyUser) {
        final String username = getUsernameFromToken(jwtToken);

        return (username.equals(avyUser.getEmail()) && !isTokenExpired(jwtToken));
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();

        // Если срок истечения не установлен, считаем токен действительным
        if (expiration == null) {
            return false;
        }

        return expiration.before(new Date());
    }

    @Override
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    @Override
    public String generateRefreshToken(AvyUser avyUser) {
        return null;
    }

    @Override
    public boolean validateAccessToken(String accessToken) {
        return false;
    }

    @Override
    public boolean validateRefreshToken(String refreshToken) {
        return false;
    }
}
