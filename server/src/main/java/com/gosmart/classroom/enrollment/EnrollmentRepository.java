package com.gosmart.classroom.enrollment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollments, String> {

    List<Enrollments> findAllByUsersEmailAndIsTeacher(String email, boolean b);

    List<Enrollments> findAllByUsersEmailAndIsStudent(String email, boolean b);

    Optional<Enrollments> findByCoursesId(String id);

    void deleteAllByCoursesId(String id);

    boolean existsByCoursesIdAndUsersEmail(String course, String email);

    List<Enrollments> findAllByCourses_Id(String courseId);
}
