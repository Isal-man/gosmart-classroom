package com.gosmart.classroom.grades;

import com.gosmart.classroom.assignments.Assignments;
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

    @OneToOne
    private Users users;

    @OneToOne
    private Assignments assignments;

    private Integer grade;

}
