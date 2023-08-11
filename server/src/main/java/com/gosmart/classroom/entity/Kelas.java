package com.gosmart.classroom.entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
public class Kelas {

    private String id;
    private String nama;
    private String gambar;
    private String guruId;
    private String kodeKelas;
    private String temaKelas;
    private String jadwal;
    private String siswaId;
    private String materiId;
    private String tugasId;
    private Date created;

    public Kelas(String id, String nama, String gambar, String guruId, String kodeKelas, String temaKelas, String jadwal, String siswaId, String materiId, String tugasId, Date created) {
        this.id = id;
        this.nama = nama;
        this.gambar = gambar;
        this.guruId = guruId;
        this.kodeKelas = kodeKelas;
        this.temaKelas = temaKelas;
        this.jadwal = jadwal;
        this.siswaId = siswaId;
        this.materiId = materiId;
        this.tugasId = tugasId;
        this.created = created;
    }
}
