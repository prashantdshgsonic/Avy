package com.example.avyproject.service;

import com.example.avyproject.entity.AdminUser;
import com.example.avyproject.entity.Role;
import com.example.avyproject.exceptions.InvalidFormatException;
import com.example.avyproject.exceptions.UserNotFoundException;
import com.example.avyproject.repository.AdminUserRepository;
import com.example.avyproject.service.utility.FormatChecker;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AdminUserServiceImplTest {

    @Mock
    private AdminUserRepository adminUserRepository;

    @Mock
    private FormatChecker formatChecker;

    @InjectMocks
    private AdminUserServiceImpl adminUserService;


    @Test
    void getAll() {
        AdminUser adminUserOne = new AdminUser(1L, "NameOne",
                "emailone@gmail.com", "Password1", Set.of(new Role(1L, "admin")));
        AdminUser adminUserTwo = new AdminUser(2L, "NameTwo",
                "emailtwo@gmail.com", "Password2", Set.of(new Role(2L, "admin")));
        List<AdminUser> userList = Arrays.asList(adminUserOne, adminUserTwo);
        Mockito
                .when(adminUserRepository.findAll())
                .thenReturn(userList);
        List<AdminUser> resultList = adminUserService.getAll();
        assertEquals(userList, resultList);
    }

    @Test
    void findById_ExistingUser() {
        Long userId = 1L;
        AdminUser adminUser = new AdminUser(1L, "name",
                "email@gmail.com", "Password1", Set.of(new Role(1L, "admin")));
        Mockito
                .when(adminUserRepository.findById(userId))
                .thenReturn(Optional.of(adminUser));
        AdminUser resultUser = adminUserService.findById(userId);
        assertEquals(adminUser, resultUser);
    }

    @Test
    void findById_NonExistingUser() {
        Long userId = 2L;
        Mockito
                .when(adminUserRepository.findById(userId))
                .thenReturn(Optional.empty());
        UserNotFoundException exception = assertThrows(UserNotFoundException.class,
                () -> adminUserService.findById(userId));
        assertEquals("User with ID 2 not found", exception.getMessage());
    }

    @Test
    void findByEmail_ExistingUser() {
        String email = "email@gmail.com";
        AdminUser adminUser = new AdminUser(1L, "name",
                "email@gmail.com", "Password1", Set.of(new Role(1L, "admin")));
        Mockito
                .when(adminUserRepository.findByEmail(email))
                .thenReturn(Optional.of(adminUser));
        AdminUser resultUser = adminUserService.findByEmail(email);
        assertEquals(adminUser, resultUser);
    }

    @Test
    void findByEmail_NonExistingUser() {
        String email = "nonvalidemail@gmail.com";
        Mockito
                .when(adminUserRepository.findByEmail(email))
                .thenReturn(Optional.empty());
        UserNotFoundException exception = assertThrows(UserNotFoundException.class,
                () -> adminUserService.findByEmail(email));
        assertEquals("User with email \"nonvalidemail@gmail.com\" not found",
                exception.getMessage());
    }


    @Test
    void save_AllMatch() {
        AdminUser adminUser = new AdminUser(1L, "name",
                "email@gmail.com", "Password1", Set.of(new Role(1L, "admin")));
        Mockito
                .when(formatChecker.checkEmail(adminUser.getEmail()))
                .thenReturn(true);
        Mockito
                .when(formatChecker.checkPassword(adminUser.getPassword()))
                .thenReturn(true);
        Mockito
                .when(adminUserRepository.save(adminUser))
                .thenReturn(adminUser);
        AdminUser resultUser = adminUserService.save(adminUser);
        assertEquals(adminUser, resultUser);
        Mockito
                .verify(adminUserRepository).save(adminUser);
    }

    @Test
    void save_EmailNotMatch() {
        AdminUser adminUser = new AdminUser(1L, "name",
                "nonvalidemail.com", "Password1", Set.of(new Role(1L, "admin")));
        Mockito
                .when(formatChecker.checkEmail(adminUser.getEmail()))
                .thenReturn(false);//
        assertThrows(InvalidFormatException.class,
                () -> adminUserService.save(adminUser));
        Mockito
                .verify(formatChecker).checkEmail(adminUser.getEmail());
        Mockito
                .verifyNoMoreInteractions(formatChecker, adminUserRepository);
    }

    @Test
    void save_PasswordNotMatch() {
        AdminUser adminUser = new AdminUser(1L, "name",
                "email@gmail.com", "password1", Set.of(new Role(1L, "admin")));
        Mockito
                .when(formatChecker.checkEmail(adminUser.getEmail()))
                .thenReturn(true);
        Mockito
                .when(formatChecker.checkPassword(adminUser.getPassword()))
                .thenReturn(false);//
        assertThrows(InvalidFormatException.class,
                () -> adminUserService.save(adminUser));
        Mockito
                .verify(formatChecker).checkEmail(adminUser.getEmail());
        Mockito
                .verify(formatChecker).checkPassword(adminUser.getPassword());
        Mockito
                .verifyNoMoreInteractions(adminUserRepository);
    }
}