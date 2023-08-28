package com.gosmart.classroom.assignments;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Getter
@Setter
public class AssignmentRequest {

    @NotBlank(message = "Name cant be empty")
    @Pattern(regexp = "^(?!.*(.)\\1\\1)(?!.*(?:''|[' ]{2}))[a-zA-Z'-]+([ ][a-zA-Z'-]+)*(?!.*  )[a-zA-Z'-]+$", message = "Invalid name format")
    private String name;

    private String description;
    private String dueDate;

}
