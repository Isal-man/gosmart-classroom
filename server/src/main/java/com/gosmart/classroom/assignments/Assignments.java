package com.gosmart.classroom.assignments;

import com.gosmart.classroom.courses.Courses;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
@Getter
@Setter
public class Assignments {

    @Id
    private String id;
    private String name;
    private String description;
    private Date postDate = new Date();
    private Date dueDate;
    private Boolean isMaterial;
    private Boolean isTask;
    private Boolean isAnnouncement;

    @ManyToOne
    private Courses courses;

}
