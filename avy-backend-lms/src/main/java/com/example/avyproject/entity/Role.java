package com.example.avyproject.entity;

import lombok.*;
import org.hibernate.annotations.Immutable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Immutable
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Role {
        @Id
        private Long id;
        private String roleName;
}
