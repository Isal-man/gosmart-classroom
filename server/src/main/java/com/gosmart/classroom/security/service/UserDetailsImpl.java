package com.gosmart.classroom.security.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gosmart.classroom.users.Users;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class UserDetailsImpl implements UserDetails {
;
    private String email;
    @JsonIgnore
    private String password;
    private String fullName;
    private String image;
    private String phoneNumber;
    @JsonIgnore
    private Boolean isVerified;
    @JsonIgnore
    private String role;

    public UserDetailsImpl(String email, String password, String fullName, String role, String image,
                           String phoneNumber, Boolean isVerified) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
        this.image = image;
        this.phoneNumber = phoneNumber;
        this.isVerified = isVerified;
    }

    public static UserDetailsImpl build(Users users) {
        return new UserDetailsImpl(
                users.getEmail(),
                users.getPassword(),
                users.getFullName(),
                users.getRoles(),
                users.getImage(),
                users.getPhoneNumber(),
                users.getIsVerified()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (StringUtils.hasText(role)) {
            String[] splits = role.replaceAll(" ", " ").split(",");
            for (String split : splits) {
                authorities.add(new SimpleGrantedAuthority(split));
            }
        }

        return authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isVerified;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isVerified;
    }

}
