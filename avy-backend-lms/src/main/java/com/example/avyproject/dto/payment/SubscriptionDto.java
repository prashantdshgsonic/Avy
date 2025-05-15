package com.example.avyproject.dto.payment;

import com.example.avyproject.dto.AvyUserDto;
import com.example.avyproject.enums.payment.SubscriptionStatus;
import com.example.avyproject.enums.payment.SubscriptionType;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class SubscriptionDto {

    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private AvyUserDto user;
    private SubscriptionType type;
    private SubscriptionStatus status;
}
