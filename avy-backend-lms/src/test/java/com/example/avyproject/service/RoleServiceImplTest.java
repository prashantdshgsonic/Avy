package com.example.avyproject.service;

import com.example.avyproject.entity.Role;
import com.example.avyproject.exceptions.RoleNotFoundException;
import com.example.avyproject.repository.RoleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class RoleServiceImplTest {

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private RoleServiceImpl roleService;

    @Test
    void findRoleByName_ExistingRole() {
        String roleName = "user";
        Role role = new Role(1L, "user");
        Mockito
                .when(roleRepository.findRoleByRoleName(roleName))
                .thenReturn(Optional.of(role));
        Role resultRole = roleService.findRoleByName(roleName);
        assertEquals(role, resultRole);
    }

    @Test
    void findRoleByName_NonExistingRole() {
        String roleName = "user";
        Mockito
                .when(roleRepository.findRoleByRoleName(roleName))
                .thenReturn(Optional.empty());
        RoleNotFoundException exception = assertThrows(RoleNotFoundException.class,
                () -> roleService.findRoleByName(roleName));
        assertEquals("Role " + roleName + " not found", exception.getMessage());
    }
}