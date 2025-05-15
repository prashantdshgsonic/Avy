package com.example.avyproject.controller;

import com.example.avyproject.service.AuthServiceImpl;
import com.example.avyproject.service.AvyUserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(AvyUserController.class)
class AvyUserControllerTest {

    @MockBean
    private AvyUserServiceImpl avyUserService;

    @MockBean
    private AuthServiceImpl authService;

    @Autowired
    private MockMvc mockMvc;

    // @Test
    void createAuthenticationToken() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

    // @Test
    void registerUser() {
    }
}
