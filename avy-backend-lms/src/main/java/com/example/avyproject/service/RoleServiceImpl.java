package com.example.avyproject.service;

import com.example.avyproject.entity.Role;
import com.example.avyproject.exceptions.AccountNotFoundException;
import com.example.avyproject.exceptions.RoleNotFoundException;
import com.example.avyproject.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public Role findRoleByName(String roleName) {
        // Debug
        // Replace with code below
        // return null;

        return roleRepository.findRoleByRoleName(roleName)
                .orElseThrow(() -> new RoleNotFoundException("Role " + roleName + " not found"));

    }
}
