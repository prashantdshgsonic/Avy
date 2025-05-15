package com.example.avyproject.service;

import com.example.avyproject.dto.CreateOfferDto;
import com.example.avyproject.dto.OfferDto;
import com.example.avyproject.entity.Offer;

import java.util.List;

public interface OfferService {

    Offer create(CreateOfferDto offerDto);

    List<OfferDto> getAll();

    OfferDto getById(Long id);

    OfferDto update(OfferDto offerDto);

    String delete(Long id);
}
