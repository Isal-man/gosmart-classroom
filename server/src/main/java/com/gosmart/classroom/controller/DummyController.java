package com.gosmart.classroom.controller;

import com.gosmart.classroom.entity.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1")
public class DummyController {

    Akun akun1 = new Akun("isal-man", "Ahmad Faisal Hidayat", "ahmadfaisal@accessdigital.id", "kataIsal#123", "https" +
            "://media.licdn.com/dms/image/D5635AQE53s-CghAPCA/profile-framedphoto-shrink_400_400/0/1689828904234?e=1692194400&v=beta&t=RXEh75bXQaImmFMNdEMdP09WZzvFq0EPJNo-13-Oc70", true);
    Akun akun2 = new Akun("do-kyung-soo", "Do Kyungsoo", "dokyungsoo123@accessdigital.id", "kyungSu#123",
            "https://cdn1-production-images-kly.akamaized" +
                    ".net/B8_YF__Y7egehy2F09HyC_Sd8fk=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2819465/original/004625800_1559189314-do.jpg", true);
    Akun akun3 = new Akun("byunbaek", "Byun Baekhyun", "byunBaekhyun@accessdigital.id", "byunBaek#123", "https" +
            "://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Byun_Baek-hyun_at_Melon_Music_Awards_on_December_2" +
            "%2C_2017_%283%29.jpg/170px-Byun_Baek-hyun_at_Melon_Music_Awards_on_December_2%2C_2017_%283%29.jpg", true);

    Guru guru = new Guru("isal-man", "Ahmad Faisal Hidayat", "ahmadfaisal@accessdigital.id", "https" +
            "://media.licdn.com/dms/image/D5635AQE53s-CghAPCA/profile-framedphoto-shrink_400_400/0" +
            "/1689828904234?e=1692194400&v=beta&t=RXEh75bXQaImmFMNdEMdP09WZzvFq0EPJNo-13-Oc70", "201");

    Siswa siswa1 = new Siswa("do-kyung-soo", "Do kyungsoo", "dokyungsoo123@accessdigital.id", "https://cdn1" +
            "-production-images-kly.akamaized.net/B8_YF__Y7egehy2F09HyC_Sd8fk=/1200x675/smart/filters:quality(75)" +
            ":strip_icc():format(jpeg)/kly-media-production/medias/2819465/original/004625800_1559189314-do.jpg",
            "201");

    Siswa siswa2 = new Siswa("byunbaek", "Byun Baekhyun", "byunBaekhyun@accessdigital.id", "https" +
            "://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Byun_Baek-hyun_at_Melon_Music_Awards_on_December_2" +
            "%2C_2017_%283%29.jpg/170px-Byun_Baek-hyun_at_Melon_Music_Awards_on_December_2%2C_2017_%283%29.jpg",
            "201");

    Materi materi1 = new Materi("001", "Learn java fundamental", "Lets learn what is java?", new Date(), "", "");
    Materi materi2 = new Materi("002", "Learn java advance", "Lets learn what is spring boot?", new Date(), "", "");
    Materi materi3 = new Materi("003", "Learn React", "Lets learn what is react?", new Date(), "", "");

    Tugas tugas = new Tugas("101", "Make some code", "", "", new Date(), new Date(), "", "do-kyung-soo", "");
    Tugas tugas2 = new Tugas("102", "Make some code", "", "", new Date(), new Date(), "", "do-kyung-soo", "");
    Tugas tugas3 = new Tugas("103", "Make some code", "", "", new Date(), new Date(), "", "do-kyung-soo", "");

    Kelas kelas1 = new Kelas("201", "Java Fundamental", "https://venturebeat.com/wp-content/uploads/2015/12/oracle" +
            "-java-e1450723340931.jpg?w=1200&strip=all", "isal-man", "WxYz123", "red", "Senin pagi", "do-kyung-soo", "001",
            "101", new Date());

    Kelas kelas2 = new Kelas("202", "Java Advance", "https://miro.medium.com/v2/resize:fit:900/0*t61rpXrvkpesX_8U" +
            ".jpg", "isal-man", "AbCd123", "blue", "Selasa pagi", "do-kyung-soo", "002",
            "102", new Date());

    Kelas kelas3 = new Kelas("203", "React", "https://repository-images.githubusercontent" +
            ".com/37153337/9d0a6780-394a-11eb-9fd1-6296a684b124", "isal-man", "EfGh123", "green", "Rabu pagi", "do-kyung-soo",
            "003",
            "103", new Date());

    @GetMapping("akun")
    public List<Object> findAkun() {
        return new ArrayList<>(
                Arrays.asList(akun1, akun2, akun3));
    }

    @GetMapping("guru")
    public Object findGuru() {
        return guru;
    }

    @GetMapping("siswa")
    public List<Object> findSiswa() {
        return new ArrayList<>(
                Arrays.asList(siswa1, siswa2));
    }

    @GetMapping("kelas")
    public List<Object> findKelas() {
        return new ArrayList<>(
                Arrays.asList(kelas1, kelas2, kelas3));
    }

    @GetMapping("materi")
    public List<Object> findMateri() {
        return new ArrayList<>(
                Arrays.asList(materi1, materi2, materi3));
    }

    @GetMapping("tugas")
    public List<Object> findTugas() {
        return new ArrayList<>(
                Arrays.asList(tugas, tugas2, tugas3));
    }

}
