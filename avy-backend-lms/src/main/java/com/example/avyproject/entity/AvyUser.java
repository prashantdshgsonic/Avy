package com.example.avyproject.entity;

import com.example.avyproject.entity.embeddable.Asset;
import com.example.avyproject.entity.embeddable.Location;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Setter
@Getter
@AllArgsConstructor
@Builder
@ToString
@NoArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
@DynamicInsert
@DynamicUpdate
public class AvyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String firstName;
    private String lastName;
    @Column(unique = true,nullable = false)
    private String email;
    private String userName;
    @Column(nullable = false)
    private String password;
    private Boolean hasVoicePass;
    private String linkToAvatar;
    private String linkToImage;
    private String linkToCV;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDate creationDate;
    private int avatarId;
    private String userJob;
    private String userLinkedIn;
    private Location location;
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Asset> assets = new LinkedHashSet<>();
    @JsonManagedReference
    @OneToMany(mappedBy = "avyUser",orphanRemoval = true,cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Set<WorkExperience> workExperience = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "avyUser",orphanRemoval = true,cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Set<Education> educationHistory = new HashSet<>();

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toSet());
    }
}
