package com.gosmart.classroom.security.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class RegisterRequest {

    @NotBlank(message = "Email cannot be empty")
    @Pattern(regexp = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}", message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 5, max = 15, message = "Password must have at least 5 characters and a maximum of 15 characters")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()-_=+\\[\\]{}|;:'\",.<>?/]*$", message = "Invalid password format, " +
            "Password " +
            "must " +
            "have at least " +
            "one letter and one number")
    private String password;

    @NotBlank(message = "Full name cannot be empty")
    @Size(min = 3, max = 50, message = "Full name must have at least 3 characters and a maximum of 50 " +
            "characters")
    @Pattern(regexp = "^(?!.*(.)\\1\\1)(?!.*(?:''|[' ]{2}))[a-zA-Z'-]+([ ][a-zA-Z'-]+)*(?!.*  )[a-zA-Z'-]+$", message = "Invalid name format")
    private String fullName;

    @NotBlank(message = "Phone number cannot be empty")
    @Pattern(regexp = "(^\\+62\\d{9,12}$)", message = "Invalid phone number format, telephone number must be preceded by +62")
    private String phoneNumber;

    private String image;
    private String roles;

}
