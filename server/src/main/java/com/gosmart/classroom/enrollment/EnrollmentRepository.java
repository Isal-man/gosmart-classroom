package com.gosmart.classroom.enrollment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollments, String> {
    List<Enrollments> findAllByUsersAndIsTeacher(String email);

    List<Enrollments> findAllByUsersAndIsStudent(String email);
}
