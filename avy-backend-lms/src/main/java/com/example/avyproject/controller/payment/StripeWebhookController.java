package com.example.avyproject.controller.payment;

import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Role;
import com.example.avyproject.exceptions.RoleNotFoundException;
import com.example.avyproject.repository.RoleRepository;
import com.example.avyproject.service.AvyUserService;
import  com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import java.util.Set;

@Slf4j
@AllArgsConstructor
@RestController
public class StripeWebhookController {

    private final AvyUserService service;
    private final RoleRepository roleRepository;

    private static final String endpointSecret = "whsec_QShkSHG4l3GHFoBgL6sSDK0HmcnhXUkZ";

    @PostMapping("/stripe-webhook")
    public String handleStripeEvent(HttpServletRequest request, @RequestBody String payload) {
        String sigHeader = request.getHeader("Stripe-Signature");
        log.info("SigHeader done" + sigHeader);

        Event event = null;

        try {
            event = Webhook.constructEvent(
                    payload, sigHeader, endpointSecret);
            log.info("Log event" + event);
        } catch (SignatureVerificationException e) {
            return "Signature verification failed";
        }

        // Event handling
        switch (event.getType()) {
            case "checkout.session.completed":
                Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);

                if (session != null) {
                    log.info("User ID" + session.getMetadata());
                    Role userRole = roleRepository.findRoleByRoleName("ROLE_PAID_ADMIN")
                            .orElseThrow(() -> new RoleNotFoundException("Role not found"));
                    AvyUser user = service.getEntityById((Long.valueOf(session.getMetadata().get(
                            "user_id"))));
                    user.setRoles(Set.of(userRole));
                    log.info(String.format("Role of user %s changed to %s",
                            user.getUserName(), user.getRoles()));
                    return "Session completed: " + session.getId();
                }
                break;
            default:
                return "Unhandled event type";
        }
        return "OK";
    }
}
