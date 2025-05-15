package com.example.avyproject.service.utility.customAnnotation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DegreeValidator.class)
@Documented
public @interface Degree {
    String message() default "Invalid degree value";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
