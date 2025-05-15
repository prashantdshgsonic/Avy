package com.example.avyproject.service.payment;

import com.example.avyproject.dto.payment.SubscriptionCreateDto;
import com.example.avyproject.dto.payment.SubscriptionDto;
import com.example.avyproject.dto.payment.SubscriptionDtoConverter;
import com.example.avyproject.entity.payment.Subscription;
import com.example.avyproject.enums.payment.SubscriptionStatus;
import com.example.avyproject.exceptions.payment.SubscriptionNotFoundException;
import com.example.avyproject.repository.payment.SubscriptionRepository;
import com.example.avyproject.service.AvyUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final AvyUserService avyUserService;
    private final SubscriptionDtoConverter converter;

    @Override
    public List<SubscriptionDto> getAll() {
        List <Subscription> subscriptions = subscriptionRepository.findAll();
        log.info("Got a list of all subscriptions");
        return converter.subscriptionToDtos(subscriptions);
    }

    @Override
    public SubscriptionDto findById(Long id) {
        Subscription subscription = subscriptionRepository.findById(id).orElseThrow(() ->
                new SubscriptionNotFoundException(String
                        .format("Subscription with id %d not found", id)));
        log.info(String.format("Subscription with ID %d found", id));
        return converter.subscriptionToDto(subscription);
    }

    @Override
    public SubscriptionDto createTrial(SubscriptionCreateDto subscriptionCreateDto) {
        Subscription subscription = Subscription.builder()
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(14))
                .avyUser(avyUserService.getByLogin(subscriptionCreateDto.getUserEmail()))
                .type(subscriptionCreateDto.getType())
                .status(SubscriptionStatus.TRIALING)
                .build();
        Subscription saveSubscription = subscriptionRepository.save(subscription);
        return converter.subscriptionToDto(saveSubscription);
    }

    @Override
    public SubscriptionDto create(SubscriptionCreateDto subscriptionCreateDto) {
        Subscription subscription = Subscription.builder()
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(1))
                .avyUser(avyUserService.getByLogin(subscriptionCreateDto.getUserEmail()))
                .type(subscriptionCreateDto.getType())
                .status(SubscriptionStatus.ACTIVE)
                .build();
        Subscription saveSubscription = subscriptionRepository.save(subscription);
        return converter.subscriptionToDto(saveSubscription);
    }
}

