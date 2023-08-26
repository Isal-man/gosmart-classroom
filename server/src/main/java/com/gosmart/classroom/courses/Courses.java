package com.gosmart.classroom.courses;

import com.gosmart.classroom.teachers.Teachers;
import com.gosmart.classroom.users.Users;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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

    @ManyToOne
    private Users users;

    private Boolean isArchived = false;

}
