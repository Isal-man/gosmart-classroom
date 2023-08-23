package com.gosmart.classroom.assignments;

import com.gosmart.classroom.courses.Courses;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class Assignments {

    @Id
    private String id;
    private String name;
    private String description;
    private Boolean isMaterial;
    private Boolean isTask;
    private Boolean isAnnouncement;

    @ManyToOne
    private Courses courses;

}
