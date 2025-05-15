//Waiting for Security integration

/*package com.example.avyproject.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public enum Roles {

    ADMIN(Set.of(Permissions.PERMISSIONS_ADMIN)),
    USER(Set.of(Permissions.PERMISSIONS_USER));

    private final Set<Permissions> permissions;

    public Set<SimpleGrantedAuthority> getAuthorities(){
        return getPermissions().stream()
                .map(permissions -> new SimpleGrantedAuthority(permissions.getPermissions()))
                .collect(Collectors.toSet());
    }
}*/
