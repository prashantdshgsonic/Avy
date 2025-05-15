package com.example.avyproject.service.utility.customAnnotation;

import com.example.avyproject.enums.Degrees;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class DegreeValidator implements ConstraintValidator<Degree,String> {

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return s!= null && Degrees.degreeExists(s);
    }
}
