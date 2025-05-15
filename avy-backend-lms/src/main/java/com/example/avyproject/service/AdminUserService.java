package com.example.avyproject.service;

import java.util.List;

import com.example.avyproject.dto.CreateNftDto;
import com.example.avyproject.entity.AdminUser;

public interface AdminUserService {

    List<AdminUser> getAll();
    AdminUser findById(Long id);
    AdminUser findByEmail(String email);
    AdminUser save(AdminUser adminUser);
    void delete();
    void issueNft(Long userId,Long courseId,CreateNftDto createNftDto);
}
