package com.example.avyproject.entity.payment;

import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.enums.payment.SubscriptionStatus;
import com.example.avyproject.enums.payment.SubscriptionType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@AllArgsConstructor
@Builder
@ToString
@NoArgsConstructor
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    @OneToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AvyUser avyUser;

    @Enumerated(EnumType.STRING)
    private SubscriptionType type;

    @Enumerated(EnumType.STRING)
    private SubscriptionStatus status;
}

