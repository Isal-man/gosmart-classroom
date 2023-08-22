package com.gosmart.classroom.students;

import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
// @Validated
public class Students {

    @Id
    private String id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String image;

}
