package com.gosmart.classroom.security.jwt;

import lombok.Data;

@Data
public class JwtResponse {

    private String email;
    private String fullName;
    private String token;

    public JwtResponse(String email, String fullName, String token) {
        this.email = email;
        this.fullName = fullName;
        this.token = token;
    }
}
