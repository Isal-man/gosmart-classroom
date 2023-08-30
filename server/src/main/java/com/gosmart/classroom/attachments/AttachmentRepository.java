package com.gosmart.classroom.attachments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachments, Integer> {

    List<Attachments> findAllByAssignmentsIdAndEnrollments_IsTeacher(String aid, boolean t);
    List<Attachments> findAllByAssignmentsIdAndEnrollments_IsStudent(String aid, boolean s);

    List<Attachments> findAllByAssignmentsIdAndAndEnrollments_Users_Email(String aid, String email);
    
    boolean existsByFileNameAndAndEnrollments_Users_Email(String name, String email);

    Optional<Attachments> findByFileNameAndEnrollments_Users_Email(String fileName, String email);
}
