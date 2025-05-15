package com.example.avyproject.service.payment;

import com.example.avyproject.dto.payment.SubscriptionCreateDto;
import com.example.avyproject.dto.payment.SubscriptionDto;

import java.util.List;

public interface SubscriptionService {

    List<SubscriptionDto> getAll();

    SubscriptionDto findById(Long id);

    SubscriptionDto createTrial(SubscriptionCreateDto subscription);

    SubscriptionDto create(SubscriptionCreateDto subscription);
}
