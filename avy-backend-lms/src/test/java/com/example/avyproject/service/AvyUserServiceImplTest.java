/*
package com.example.avyproject.service;


import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Role;
import com.example.avyproject.exceptions.AccountNotFoundException;
import com.example.avyproject.repository.AvyUserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(MockitoExtension.class)
class AvyUserServiceImplTest {

    @Mock
    private AvyUserRepository avyUserRepository;

    @InjectMocks
    private AvyUserServiceImpl avyUserService;

    @Test
    void getByLogin_ExistingUser() {
        String login = "email@gmail.com";
        AvyUser avyUser = createAvyUser();
        Mockito
                .when(avyUserRepository.findByEmail(login))
                .thenReturn(Optional.of(avyUser));
        AvyUser avyUserResult = avyUserService.getByLogin(login);
        Mockito.verify(avyUserRepository).findByEmail(login);
        assertEquals(avyUser, avyUserResult);
    }

    @Test
    void getByLogin_NonExistingUser() {
        String login = "nonexistingemail@gmail.com";
        Mockito
                .when(avyUserRepository.findByEmail(login))
                .thenReturn(Optional.empty());
        assertThrows(AccountNotFoundException.class, () -> avyUserService.getByLogin(login));
    }

    @Test
    void registerUser() {
        AvyUser avyUserToRegister = createAvyUser();
        AvyUser expectedRegisterUser = createAvyUser();
        Mockito
                .when(avyUserRepository.save(avyUserToRegister))
                .thenReturn(expectedRegisterUser);
        AvyUser resultUser = avyUserService.registerUser(avyUserToRegister);
        Mockito.verify(avyUserRepository).save(avyUserToRegister);
        assertEquals(expectedRegisterUser, resultUser);
    }

    private AvyUser createAvyUser() {
        return new AvyUser(1L, "firstName", "lastName", "email@gmail.com", "username", "Password1"
                , "linkToAvatar", "linkToImage", LocalDate.now(),
                Set.of(new Role(1L, "user")));
    }
}*/
