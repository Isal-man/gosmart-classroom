package com.gosmart.classroom.enrollment;

import com.gosmart.classroom.courses.Courses;
import com.gosmart.classroom.users.Users;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
@Getter
@Setter
public class Enrollments {

    @Id
    private String id;

    @ManyToOne
    private Users users;

    @ManyToOne
    private Courses courses;

    private Boolean isTeacher;
    private Boolean isStudent;
    private Date enrollmentDate;

}
