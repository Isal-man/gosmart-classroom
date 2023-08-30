package com.gosmart.classroom.attachments;

import com.gosmart.classroom.assignments.Assignments;
import com.gosmart.classroom.courses.Courses;
import com.gosmart.classroom.enrollment.Enrollments;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Attachments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fileName;
    private String url;
    private String type;
    private Long size;
    private Boolean isFromTeacher;
    private Boolean isFromStudent;

    @ManyToOne
    private Enrollments enrollments;

    @ManyToOne
    private Assignments assignments;

}
