package com.example.avyproject.controller.payment;

import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.service.AvyUserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/v1/checkout")
public class SessionController {

    private final AvyUserService userService;

    @Operation(summary ="Create a checkout session ", description = "Create" +
            " a checkout session  for BASIC Subscription" +
            " payments")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/sessions/basic")
    public String createSessionBasic(@RequestHeader("Authorization") String authHeader) throws StripeException {
        AvyUser user = userService.getUserByToken(authHeader.substring(7));

        Stripe.apiKey = "sk_test_51ONkV2CQt5qdvPbwoiWg3tHK7JhWZsvo44jnVEe6jqThMfXkHspTc09rNmuTc5fycCSGvdeODOVFo0Hse82KCAMZ003EWL9nGe";

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setSuccessUrl("http://avyapps.io/#/success")// Success payment page
                        // must be added
                        .setCancelUrl("http://avyapps.io//#/unsuccess")//Cancel payment page
                        // must be added
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPrice("price_1ONtemCQt5qdvPbwWje2IOaH")//Price_ID
                                        .setQuantity(1L)
                                        .build()
                        )
                        .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                        .putMetadata("user_id",user.getId().toString())
                        .build();
        Session session = Session.create(params);
        log.info("Session created");
        return session.getUrl();
    }

    @Operation(summary ="Create a checkout session", description = "Create a checkout session for" +
            " payments for PRO Subscription")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/sessions/pro")
    public String createSessionPro(@RequestHeader("Authorization") String authHeader) throws StripeException {
        AvyUser user = userService.getUserByToken(authHeader.substring(7));

        Stripe.apiKey = "sk_test_51ONkV2CQt5qdvPbwoiWg3tHK7JhWZsvo44jnVEe6jqThMfXkHspTc09rNmuTc5fycCSGvdeODOVFo0Hse82KCAMZ003EWL9nGe";

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setSuccessUrl("http://localhost:5000/success.html")// Success payment page
                        // must be added
                        .setCancelUrl("http://localhost:5000")//Cancel payment page
                        // must be added
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPrice("price_1ONtemCQt5qdvPbwWje2IOaH")//Price_ID
                                        .setQuantity(1L)
                                        .build()
                        )
                        .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                        .putMetadata("user_id",user.getId().toString())
                        .build();
        Session session = Session.create(params);
        log.info("Session created");
        return session.getUrl();
    }

    @Operation(summary ="Create a checkout session", description = "Create a checkout session for" +
            " payments for ENTERPRISE Subscription")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/sessions/enterprise")
    public String createSessionEnterprise(@RequestHeader("Authorization") String authHeader) throws StripeException {
        AvyUser user = userService.getUserByToken(authHeader.substring(7));

        Stripe.apiKey = "sk_test_51ONkV2CQt5qdvPbwoiWg3tHK7JhWZsvo44jnVEe6jqThMfXkHspTc09rNmuTc5fycCSGvdeODOVFo0Hse82KCAMZ003EWL9nGe";

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setSuccessUrl("http://localhost:5000/success.html")// Success payment page
                        // must be added
                        .setCancelUrl("http://localhost:5000")//Cancel payment page
                        // must be added
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPrice("price_1ONtemCQt5qdvPbwWje2IOaH")//Price_ID
                                        .setQuantity(1L)
                                        .build()
                        )
                        .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                        .putMetadata("user_id",user.getId().toString())
                        .build();
        Session session = Session.create(params);
        log.info("Session created");
        return session.getUrl();
    }
}

