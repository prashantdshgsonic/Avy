package com.example.avyproject.repository;

import com.example.avyproject.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress,Long> {
    List<UserProgress> findAllByUserId(Long userId);
}
