package com.example.avyproject.controller;

import com.example.avyproject.entity.Role;
import com.example.avyproject.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoleInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if "ROLE_USER" exists, if not, create it
        if (roleRepository.findRoleByRoleName("ROLE_USER").isEmpty()) {
            Role roleUser = new Role(1L,"ROLE_USER");
            roleRepository.save(roleUser);
        }

        // Check if "ROLE_ADMIN" exists, if not, create it
        if (roleRepository.findRoleByRoleName("ROLE_ADMIN").isEmpty()) {
            Role roleAdmin = new Role(2L,"ROLE_ADMIN");
            roleRepository.save(roleAdmin);
        }

        // Add more roles if necessary
    }
}
