package com.gosmart.classroom.entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
public class Tugas {

    private String id;
    private String nama;
    private String deskripsi;
    private Object komentarPribadi;
    private Date created;
    private Date deadline;
    private String attachment;
    private String siswa;
    private String komentarKelas;

    public Tugas(String id, String nama, String deskripsi, Object komentarPribadi, Date created, Date deadline,
                 String attachment, String siswa, String komentarKelas) {
        this.id = id;
        this.nama = nama;
        this.deskripsi = deskripsi;
        this.komentarPribadi = komentarPribadi;
        this.created = created;
        this.deadline = deadline;
        this.attachment = attachment;
        this.siswa = siswa;
        this.komentarKelas = komentarKelas;
    }
}
