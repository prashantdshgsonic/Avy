package com.example.avyproject.dto;

public interface DtoConverter <E, D>{

    D toDto(E entity);

    E toEntity(D dto);
}
