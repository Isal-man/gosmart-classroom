package com.gosmart.classroom.entity;

import lombok.Data;

@Data
public class Akun {

    private String username;
    private String nama;
    private String email;
    private String password;
    private String gambar;
    private Boolean isAktif = false;

    public Akun(String username, String nama, String email, String password, String gambar, Boolean isAktif) {
        this.username = username;
        this.nama = nama;
        this.email = email;
        this.password = password;
        this.gambar = gambar;
        this.isAktif = isAktif;
    }
}
