package com.gosmart.classroom.courses;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@Where(clause = "is_archived = false")
public class Courses {

    @Id
    private String id;
    private String name;
    private String schedule;
    private String image;
    private String theme;
    private Boolean isArchived = false;

}
