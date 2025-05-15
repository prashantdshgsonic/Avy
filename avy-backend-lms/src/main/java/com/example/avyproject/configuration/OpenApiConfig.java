package com.example.avyproject.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@OpenAPIDefinition(info = @Info(title = "AVY application api", description = "AVY application",
        version = "1.0.0", contact = @Contact(name = "Oleg Rulyov", email = "orulyov81@gmail.com")))
@SecurityScheme(name = "Authorization", in = SecuritySchemeIn.HEADER, type =
        SecuritySchemeType.APIKEY,
        scheme = "apiKey")
public class OpenApiConfig {

}
