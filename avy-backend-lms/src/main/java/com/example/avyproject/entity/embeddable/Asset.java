package com.example.avyproject.entity.embeddable;

import lombok.*;
import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "mintAddress")
public class Asset {
    private Long courseId;
    private String mintAddress;
}
