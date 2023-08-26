package com.gosmart.classroom.attachments;

import com.gosmart.classroom.assignments.AssignmentService;
import com.gosmart.classroom.assignments.Assignments;
import com.gosmart.classroom.enrollment.EnrollmentService;
import com.gosmart.classroom.enrollment.Enrollments;
import com.gosmart.classroom.file.FileResponse;
import com.gosmart.classroom.file.FileService;
import com.gosmart.classroom.users.UserService;
import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.MissingResourceException;

@Service
@RequiredArgsConstructor
public class AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final AssignmentService assignmentService;
    private final UserService userService;
    private final EnrollmentService enrollmentService;
    private final FileService fileService;

    // Get all attachment
    public List<Attachments> findAll() {
        return attachmentRepository.findAll();
    }

    // Get attachment by ID
    public Attachments findById(Integer id) {
        return attachmentRepository.findById(id)
                .orElseThrow(() -> new MissingResourceException("Attachment not found", Attachments.class.toString(),
                        "Attachment ID"));
    }

    // Add attachment
    public Object upload(MultipartFile file, String email, String id, String status) throws IOException {

        // Check if user exists
        Users users = userService.findByEmail(email);

        // Check if assignment exists
        Assignments assignments = assignmentService.findById(id);

        // Check if enrollment exists
        Enrollments enrollments = enrollmentService.findByUsersEmailAndCourses_Id(email, assignments.getCourses().getId());

        // Upload file and get response
        FileResponse response = fileService.uploadFile(file);

        // Add attachment
        Attachments newAttachments = new Attachments();
        newAttachments.setName(response.getFileName());
        newAttachments.setUrl(response.getUrl());
        newAttachments.setType(response.getType());
        newAttachments.setSize(response.getSize());

        // Check who's send the attachment
        if (status.equalsIgnoreCase("teacher")) {
            newAttachments.setIsFromTeacher(true);
        } else if (status.equalsIgnoreCase("student")) {
            newAttachments.setIsFromStudent(true);
        } else {
            return ResponseEntity.badRequest().body("Invalid");
        }

        newAttachments.setEnrollments(enrollments);
        newAttachments.setAssignments(assignments);

        // Save attachment
        return attachmentRepository.save(newAttachments);
    }

}