package com.example.avyproject.security;

import com.example.avyproject.converter.AvyUserConverter;
import com.example.avyproject.converter.CourseConverter;
import com.example.avyproject.converter.WorkExperienceDtoConverter;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.repository.AvyUserRepository;
import com.example.avyproject.repository.EducationRepository;
import com.example.avyproject.repository.RoleRepository;
import com.example.avyproject.repository.WorkExperienceRepository;
import com.example.avyproject.service.*;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends GenericFilterBean {

    private final JwtService jwtService;
    private final AvyUserService avyUserService;

    public JwtRequestFilter(JwtService jwtService, AvyUserService avyUserService) {
        this.jwtService = jwtService;
        this.avyUserService = avyUserService;
    }


    @Override
    public void doFilter (ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws ServletException, IOException {

        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        // Extract JWT token from the request header
        final String requestTokenHeader = httpRequest.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        // If the header contains JWT, extract it and retrieve the username from the token
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            username = jwtService.getUsernameFromToken(jwtToken);
        }
        // If the username is not null
        if (username != null) {
            // Load the user from the database
            AvyUser avyUser = this.avyUserService.getByLogin(username);

            // Validate the JWT token
            if (jwtService.validateToken(jwtToken, avyUser)) {
                // Create an authentication object based on user data
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        avyUser, null, avyUser.getAuthorities());

                // Set the authentication details based on the current request
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));

                // Update the security context with the new authentication
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        // Continue the filter chain (pass control to the next filter)
        chain.doFilter(httpRequest, httpResponse);
    }


}