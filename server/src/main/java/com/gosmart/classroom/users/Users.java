package com.gosmart.classroom.users;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Users {

    @Id
    private String email;
    private String password;
    private String fullName;
    private String phoneNumber;
    private String image;
    private String roles;
    private Boolean isVerified;

}
