package com.example.avyproject.dto.payment;

import com.example.avyproject.enums.payment.SubscriptionType;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class SubscriptionCreateDto {

    private String userEmail;
    private SubscriptionType type;
}
