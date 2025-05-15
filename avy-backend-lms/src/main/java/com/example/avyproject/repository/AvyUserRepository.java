package com.example.avyproject.repository;

import com.example.avyproject.entity.AvyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AvyUserRepository extends JpaRepository<AvyUser, Long> {

    Optional<AvyUser> findByEmail(String email);
    List<AvyUser> findByFirstName(String name);
}
