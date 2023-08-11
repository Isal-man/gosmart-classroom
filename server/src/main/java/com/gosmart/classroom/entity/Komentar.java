package com.gosmart.classroom.entity;

import java.util.Date;

public class Komentar {

    private String id;
    private String sender;
    private String receiver;
    private String message;
    private Date created;
    private Boolean isUmum;
    private Boolean isPribadi;

    public Komentar(String id, String sender, String receiver, String message, Date created, Boolean isUmum, Boolean isPribadi) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.created = created;
        this.isUmum = isUmum;
        this.isPribadi = isPribadi;
    }
}
