package com.example.avyproject.repository;

import com.example.avyproject.entity.AvyModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvyModuleRepository extends JpaRepository<AvyModule, Long> {

}
