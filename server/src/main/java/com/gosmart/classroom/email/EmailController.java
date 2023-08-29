package com.gosmart.classroom.email;

import com.gosmart.classroom.assignments.AssignmentRepository;
import com.gosmart.classroom.assignments.Assignments;
import com.gosmart.classroom.students.StudentRepository;
import com.gosmart.classroom.teachers.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/v1/send-email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService service;
    private final AssignmentRepository assignmentRepository;

    @PostMapping
    public void sendEmailAssignmentSent(@RequestBody EmailRequest emailRequest) throws MessagingException, UnsupportedEncodingException {

        Assignments assignments = assignmentRepository.findByName(emailRequest.getAssignmentName())
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        String assignmentLink = "http://localhost:5173/assignment/" + assignments.getId();

        String emailContent = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "  <style>\n" +
                "    body {\n" +
                "      margin: 0;\n" +
                "      padding: 0;\n" +
                "      display: flex;\n" +
                "      justify-content: center;\n" +
                "      align-items: center;\n" +
                "      height: 100vh;\n" +
                "      font-family: Arial, sans-serif;\n" +
                "      background-color: #f0f0f0;\n" +
                "    }\n" +
                "\n" +
                "    .email-container {\n" +
                "      text-align: center;\n" +
                "      background-color: #ffffff;\n" +
                "      padding: 20px;\n" +
                "      border-radius: 10px;\n" +
                "      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\n" +
                "    }\n" +
                "\n" +
                "    .logo {\n" +
                "      width: 100px;\n" +
                "      height: auto;\n" +
                "      margin: 20px auto;\n" +
                "    }\n" +
                "\n" +
                "    .message {\n" +
                "      font-size: 18px;\n" +
                "      margin-bottom: 20px;\n" +
                "    }\n" +
                "\n" +
                "    .verify-button {\n" +
                "      display: inline-block;\n" +
                "      padding: 10px 20px;\n" +
                "      background-color: #007bff;\n" +
                "      color: #ffffff;\n" +
                "      border: none;\n" +
                "      border-radius: 8px;\n" +
                "      font-size: 16px;\n" +
                "      cursor: pointer;\n" +
                "      transition: background-color 0.3s ease;\n" +
                "      text-decoration: none;\n" +
                "    }\n" +
                "\n" +
                "    .verify-button:hover {\n" +
                "      background-color: #0056b3;\n" +
                "    }\n" +
                "  </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <div class=\"email-container\">\n" +
                "    <h1>Assignment Received</h1>\n" +
                "    <img src=\"https://storage.googleapis.com/gosmart-classroom.appspot.com/logo-with-no-color.png\" alt=\"Logo\" class=\"logo\">\n" +
                "    <p class=\"message\">Dear " + emailRequest.getStudentEmail() + ",</p>\n" +
                "    <p class=\"message\">" + emailRequest.getTeacherName() + " has sent you a new assignment:</p>\n" +
                "    <p class=\"message\">" + emailRequest.getAssignmentName() + "</p>\n" +
                "    <a href=" + assignmentLink + " class=\"verify-button\">View Assignment</a>\n" +
                "  </div>\n" +
                "</body>\n" +
                "</html>";

        service.sendEmailAssignment(emailRequest.getTeacherName(), emailRequest.getStudentEmail(), "Assignment " +
                "Received", emailContent);

    }

}
