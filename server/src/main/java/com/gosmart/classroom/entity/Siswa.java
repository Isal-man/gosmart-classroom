package com.gosmart.classroom.entity;

import lombok.Data;

import java.util.ArrayList;

@Data
public class Siswa {

    private String id;
    private String nama;
    private String email;
    private String gambar;
    private String kelasId;

    public Siswa(String id, String nama, String email, String gambar, String kelasId) {
        this.id = id;
        this.nama = nama;
        this.email = email;
        this.gambar = gambar;
        this.kelasId = kelasId;
    }
}
