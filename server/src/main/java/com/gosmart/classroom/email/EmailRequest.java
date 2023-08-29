package com.gosmart.classroom.email;

import lombok.Data;

@Data
public class EmailRequest {

    private String teacherName;
    private String studentEmail;
    private String assignmentName;

}
