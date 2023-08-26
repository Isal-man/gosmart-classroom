package com.gosmart.classroom.grades;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
@Setter
public class GradeRequest {

    private String email;
    private String aid;
    private String cid;

    @Min(value = 0, message = "Minimum grade is 0")
    @Max(value = 100, message = "Maximum grade is 100")
    @Digits(integer = Integer.MAX_VALUE, fraction = 0, message = "Invalid input. Please enter only numbers.")
    private Integer grade;

}
