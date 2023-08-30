package com.gosmart.classroom.attachments;

import com.gosmart.classroom.assignments.AssignmentService;
import com.gosmart.classroom.assignments.Assignments;
import com.gosmart.classroom.enrollment.EnrollmentService;
import com.gosmart.classroom.enrollment.Enrollments;
import com.gosmart.classroom.file.FileService;
import com.gosmart.classroom.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    // Get all attachment By Assignment ID and isTeacher
    public List<Attachments> findAllByAssignmentAndStatus(String id, String status) {

        if (!(status.equalsIgnoreCase("teacher"))) {
            return attachmentRepository.findAllByAssignmentsIdAndEnrollments_IsStudent(id, true);
        }

        return attachmentRepository.findAllByAssignmentsIdAndEnrollments_IsTeacher(id, true);
    }

    // Get all attachment by Assignment ID and User email
    public List<Attachments> findAllByAssignmentAndUser(String aid, String email) {
        return attachmentRepository.findAllByAssignmentsIdAndAndEnrollments_Users_Email(aid, email);
    }

    // Get attachment by ID
    public Attachments findById(Integer id) {
        return attachmentRepository.findById(id)
                .orElseThrow(() -> new MissingResourceException("Attachment not found", Attachments.class.toString(),
                        "Attachment ID"));
    }

    // Add attachment
    public Object upload(AttachmentRequest attachmentRequest, String email, String id, String status) throws IOException {

        // Check if user exists
        userService.findByEmail(email);

        // Check if assignment exists
        Assignments assignments = assignmentService.findById(id);

        // Check if enrollment exists
        Enrollments enrollments = enrollmentService.findByUsersEmailAndCourses_Id(email, assignments.getCourses().getId());

        if (attachmentRepository.existsByFileNameAndAndEnrollments_Users_Email(attachmentRequest.getFileName(), email)) {
            Attachments attachments =
                    attachmentRepository.findByFileNameAndEnrollments_Users_Email(attachmentRequest.getFileName(), email)
                    .orElseThrow(() -> new RuntimeException("Attachment not found"));

            return ResponseEntity.ok(attachments);
        }

        // Add attachment
        Attachments newAttachments = new Attachments();
        newAttachments.setFileName(attachmentRequest.getFileName());
        newAttachments.setUrl(attachmentRequest.getUrl());
        newAttachments.setType(attachmentRequest.getType());
        newAttachments.setSize(attachmentRequest.getSize());

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
