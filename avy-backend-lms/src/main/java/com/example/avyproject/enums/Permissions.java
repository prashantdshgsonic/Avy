package com.example.avyproject.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permissions {

    PERMISSIONS_USER("permission:user"),
    PERMISSIONS_ADMIN("permission:admin");

    private final String permissions;
}