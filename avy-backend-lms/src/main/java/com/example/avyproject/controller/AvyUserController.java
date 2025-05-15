// package com.example.avyproject.controller;

// import com.example.avyproject.dto.AvyUserCreateDto;
// import com.example.avyproject.dto.AvyUserDto;
// import com.example.avyproject.entity.AvyUser;
// import com.example.avyproject.security.JwtRequest;
// import com.example.avyproject.security.JwtResponse;
// import com.example.avyproject.service.AuthServiceImpl;
// import com.example.avyproject.service.AvyUserService;
// import com.example.avyproject.service.RecommendedService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/auth")
// public class AvyUserController {

//     @Autowired
//     private AvyUserService avyUserService;
//     @Autowired
//     private AuthServiceImpl authService;
//     @Autowired
//     PasswordEncoder passwordEncoder;
//     @Autowired
//     RecommendedService recommendedService;

//     @PostMapping("/login")
//     public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
//         JwtResponse response = authService.logIn(authenticationRequest);
//         return ResponseEntity.ok(response);
//     }

//     @PostMapping("/register")
//     public ResponseEntity<AvyUserDto> registerUser(@RequestBody AvyUserCreateDto user) {
//          user.setPassword(passwordEncoder.encode(user.getPassword()));
//         AvyUserDto newAvyUser = avyUserService.createNewAvyUser(user);
//         //add to USER all courses as recommended//
//         AvyUser entityById = avyUserService.getEntityById(newAvyUser.getId());
//         recommendedService.addAllCoursesToUserRecommended(entityById);
//         //add to USER all courses as recommended//
//         return ResponseEntity.ok(newAvyUser);
//     }

// }

package com.example.avyproject.controller;

import com.example.avyproject.dto.AvyUserCreateDto;
import com.example.avyproject.dto.AvyUserDto;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.security.JwtRequest;
import com.example.avyproject.security.JwtResponse;
import com.example.avyproject.service.AuthServiceImpl;
import com.example.avyproject.service.AvyUserService;
import com.example.avyproject.service.RecommendedService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AvyUserController {
    private static final Logger logger = LoggerFactory.getLogger(AvyUserController.class);
    private final AvyUserService avyUserService;
    private final AuthServiceImpl authService;
    private final PasswordEncoder passwordEncoder;
    private final RecommendedService recommendedService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        JwtResponse response = authService.logIn(authenticationRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AvyUserCreateDto user) {
        try {
            // Encode the user's password
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            logger.info("----------Registering user with email: {}", user.getEmail());
            logger.info("---------------Role requested: {}", user.getRoleName());

            // Create new user
            AvyUserDto newAvyUser = avyUserService.createNewAvyUser(user);

            // Add recommended courses to the user
            AvyUser entityById = avyUserService.getEntityById(newAvyUser.getId());
            recommendedService.addAllCoursesToUserRecommended(entityById);

            // Return response
            return ResponseEntity.ok(newAvyUser);
        } catch (Exception e) {
            logger.error("Error occurred during user registration: ", e);

            // Return error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("User registration failed. Please try again later.");
        }
    }

    @PostMapping("/voice-pass-login")
    public ResponseEntity<JwtResponse> logInWithVoicePass() {
        JwtResponse response = authService.logInWithVoicePass();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register-voice/{userId}")
    public ResponseEntity<Void> registerVoicePass(@PathVariable Long userId) {
        avyUserService.registerVoicePass(userId);
        return ResponseEntity.noContent().build();
    }

    // Global exception handler for additional safety if needed
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGlobalException(Exception e) {
        logger.error("An unexpected error occurred: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }
}
