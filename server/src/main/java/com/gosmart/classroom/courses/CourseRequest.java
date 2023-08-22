package com.gosmart.classroom.courses;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class CourseRequest {

    @NotBlank(message = "Full name cannot be empty")
    @Pattern(regexp = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}", message = "Invalid email format")
    private String email;

    @NotBlank(message = "Full name cannot be empty")
    @Size(min = 3, max = 50, message = "Full name must have at least 3 characters and a maximum of 50 " +
            "characters")
    @Pattern(regexp = "^(?!.*(.)\\1\\1)(?!.*(?:''|[' ]{2}))[a-zA-Z']+([ ][a-zA-Z']+)*(?!.*  )[a-zA-Z']+$", message = "Invalid name format")
    private String name;

    @NotBlank(message = "Schedule cannot be empty")
    private String schedule;

    private String image;
    private String theme;

}
