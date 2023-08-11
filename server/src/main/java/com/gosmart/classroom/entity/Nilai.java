package com.gosmart.classroom.entity;

public class Nilai {

    private String tugasId;
    private String siswaId;
    private Integer poin;

    public Nilai(String tugasId, String siswaId, Integer poin) {
        this.tugasId = tugasId;
        this.siswaId = siswaId;
        this.poin = poin;
    }
}
