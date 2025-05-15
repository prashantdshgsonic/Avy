package com.example.avyproject.converter;

import com.example.avyproject.dto.CreateOfferDto;
import com.example.avyproject.dto.OfferDto;
import com.example.avyproject.entity.Offer;
import org.springframework.stereotype.Component;

@Component
public class OfferDtoConverter {

    public OfferDto offerToDto(Offer offer) {
        return OfferDto.builder()
                .id(offer.getId())
                .linkToImage(offer.getLinkToImage())
                .company(offer.getCompany())
                .category(offer.getCategory())
                .priceInCoins(offer.getPriceInCoins())
                .description(offer.getDescription())
                .creationDate(offer.getCreationDate())
                .lastUpdateDate(offer.getLastUpdateDate())
                .build();
    }

    public Offer offerDtoToOffer(OfferDto offerDto) {
        return Offer.builder()
                .id(offerDto.getId())
                .linkToImage(offerDto.getLinkToImage())
                .company(offerDto.getCompany())
                .category(offerDto.getCategory())
                .priceInCoins(offerDto.getPriceInCoins())
                .description(offerDto.getDescription())
                .creationDate(offerDto.getCreationDate())
                .lastUpdateDate(offerDto.getLastUpdateDate())
                .build();
    }

    public Offer createOfferDtoToOffer(CreateOfferDto createOfferDto) {
        return Offer.builder()
                .company(createOfferDto.getCompany())
                .category(createOfferDto.getCategory())
                .priceInCoins(createOfferDto.getPriceInCoins())
                .description(createOfferDto.getDescription())
                .creationDate(createOfferDto.getCreationDate())
                .build();
    }
}
