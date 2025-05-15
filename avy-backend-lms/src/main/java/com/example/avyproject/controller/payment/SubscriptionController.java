package com.example.avyproject.controller.payment;

import com.example.avyproject.dto.payment.SubscriptionCreateDto;
import com.example.avyproject.dto.payment.SubscriptionDto;
import com.example.avyproject.service.payment.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Operation(summary = "Get All Subscriptions", description = "Get All Subscription")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/get/all")
    public ResponseEntity<List<SubscriptionDto>> getAll(){
        return ResponseEntity.ok(subscriptionService.getAll());
    }

    @Operation(summary = "Get Subscription by ID", description = "Get the Subscription by specified ID")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/get/by/id/{id}")
    public ResponseEntity<SubscriptionDto> getById(@PathVariable("id")
                                                   @Parameter(description = "Subscription ID") Long id) {
        return ResponseEntity.ok(subscriptionService.findById(id));
    }

    @Operation(summary ="Create a trial subscription", description = "Create a trial subscription for 14 days")
    @PreAuthorize("isAuthenticated()")
    @PostMapping ("/trial")
    public ResponseEntity<SubscriptionDto> createTrial(@RequestBody SubscriptionCreateDto subscriptionDto) {
        return ResponseEntity.ok(subscriptionService.createTrial(subscriptionDto));
    }

    @Operation(summary ="Create a subscription", description = "Create a subscription for 1 month")
    @PreAuthorize("isAuthenticated()")
    @PostMapping ("/create")
    public ResponseEntity<SubscriptionDto> create(@RequestBody SubscriptionCreateDto subscriptionDto) {
        return ResponseEntity.ok(subscriptionService.create(subscriptionDto));
    }
}
