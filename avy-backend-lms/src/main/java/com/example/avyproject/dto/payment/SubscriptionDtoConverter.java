package com.example.avyproject.dto.payment;


import com.example.avyproject.converter.AvyUserConverter;
import com.example.avyproject.entity.payment.Subscription;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SubscriptionDtoConverter {

    private final AvyUserConverter userConverter;
    private final ModelMapper mapper;


    public SubscriptionDto subscriptionToDto (Subscription subscription){
        SubscriptionDto subscriptionDto = new SubscriptionDto();
        subscriptionDto.setId(subscription.getId());
        subscriptionDto.setStartDate(subscription.getStartDate());
        subscriptionDto.setEndDate(subscription.getEndDate());
        subscriptionDto.setUser(userConverter.avyUserToAvyUserDto(subscription.getAvyUser()));
        subscriptionDto.setType(subscription.getType());
        subscriptionDto.setStatus(subscription.getStatus());
        return subscriptionDto;
    }

    public Subscription subscriptionDtoToEntity(SubscriptionDto subscriptionDto){
        return Subscription.builder()
                .startDate(subscriptionDto.getStartDate())
                .endDate(subscriptionDto.getEndDate())
                .avyUser(userConverter.avyUserDtoToEntity(subscriptionDto.getUser()))
                .type(subscriptionDto.getType())
                .status(subscriptionDto.getStatus())
                .build();
    }

    public List<SubscriptionDto> subscriptionToDtos(List<Subscription> subscriptions){
        List<SubscriptionDto> subscriptionDtos = new ArrayList<>();
        subscriptions.forEach(s -> subscriptionDtos.add(mapper.map(
                s, SubscriptionDto.class)));
        return subscriptionDtos;
    }
}

