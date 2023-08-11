package com.gosmart.classroom.entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
public class Materi {

    private String id;
    private String nama;
    private String deskripsi;
    private Date created;
    private String attachmentId;
    private String komentarKelas;

    public Materi(String id, String nama, String deskripsi, Date created, String attachmentId, String komentarKelas) {
        this.id = id;
        this.nama = nama;
        this.deskripsi = deskripsi;
        this.created = created;
        this.attachmentId = attachmentId;
        this.komentarKelas = komentarKelas;
    }
}
