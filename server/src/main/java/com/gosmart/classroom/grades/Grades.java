package com.gosmart.classroom.grades;

import com.gosmart.classroom.assignments.Assignments;
import com.gosmart.classroom.courses.Courses;
import com.gosmart.classroom.users.Users;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Grades {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Users users;

    @ManyToOne
    private Assignments assignments;

    @ManyToOne
    private Courses courses;

    private Integer grade;

}
