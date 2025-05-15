package com.example.avyproject.service;

import com.example.avyproject.converter.OfferDtoConverter;
import com.example.avyproject.dto.CreateOfferDto;
import com.example.avyproject.dto.OfferDto;
import com.example.avyproject.entity.Offer;
import com.example.avyproject.exceptions.OfferNotFoundException;
import com.example.avyproject.repository.OfferRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OfferServiceImpl implements OfferService {

    private final OfferRepository offerRepository;
    private final OfferDtoConverter offerConverter;
    private final ImageService imageService;

    @Override
    public Offer create(CreateOfferDto offerDto) {
        String pathToImage = imageService.uploadImage(offerDto.getOfferImage());
        Offer offer = offerConverter.createOfferDtoToOffer(offerDto);
        offer.setLinkToImage(pathToImage);
        log.info("Offer created.");
        return offerRepository.save(offer);
    }

    @Override
    public List<OfferDto> getAll() {
        List<Offer> offers = offerRepository.findAll();
        log.info("Offers list created");
        return offers.stream()
                .map(offerConverter::offerToDto)
                .collect(Collectors.toList());
    }

    @Override
    public OfferDto getById(Long id) {
        Offer offer = offerRepository.findById(id).orElseThrow(
                () -> new OfferNotFoundException(String.format("Offer with ID %s not found", id)));
        log.info("Offer with ID " + id + " found.");
        return offerConverter.offerToDto(offer);
    }

    @Override
    public OfferDto update(OfferDto offerDto) {
        Offer offer = offerConverter.offerDtoToOffer(offerDto);
        offer = offerRepository.save(offer);
        log.info("Offer updated.");
        return offerConverter.offerToDto(offer);
    }

    @Override
    public String delete(Long id) {
        offerRepository.deleteById(id);
        String message = "Offer with id: " + id + " deleted!";
        log.info(message);
        return message;
    }
}
