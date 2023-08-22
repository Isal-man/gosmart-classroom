package com.gosmart.classroom.security.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class LoginRequest {

    @Email(message = "Email not valid")
    @NotBlank(message = "Email cannot be empty")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 5, max = 15, message = "Password must have at least 5 characters and a maximum of 15 characters")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()-_=+\\[\\]{}|;:'\",.<>?/]*$", message = "Password must have at least " +
            "letter or number")
    private String password;

}
