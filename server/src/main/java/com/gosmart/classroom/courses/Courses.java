package com.gosmart.classroom.courses;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Getter
@Setter
public class Courses {

    @Id
    private String id;
    private String name;
    private String schedule;
    private String image;
    private String theme;


}
