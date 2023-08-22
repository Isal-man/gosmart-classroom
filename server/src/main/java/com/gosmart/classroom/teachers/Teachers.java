package com.gosmart.classroom.teachers;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Teachers {

    @Id
    private String id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String image;

}