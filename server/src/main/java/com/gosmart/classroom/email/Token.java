package com.gosmart.classroom.email;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Token {

    @Id
    private String token;
    private String email;

}
