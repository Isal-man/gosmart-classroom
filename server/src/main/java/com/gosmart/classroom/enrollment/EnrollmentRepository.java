package com.gosmart.classroom.enrollment;

import com.gosmart.classroom.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollments, String> {

    List<Enrollments> findAllByUsersEmailAndIsTeacher(String email, boolean b);

    List<Enrollments> findAllByUsersEmailAndIsStudent(String email, boolean b);

    Optional<Enrollments> findByCoursesId(String id);
    List<Enrollments> findAllByUsersEmail(String email);

    void deleteAllByCoursesId(String id);
    // void deleteByUsersEmail(String email);

    boolean existsByCoursesIdAndUsersEmail(String course, String email);
    boolean existsByUsers(Users users);

    List<Enrollments> findAllByCourses_Id(String courseId);

    Optional<Enrollments> findByUsersEmailAndCourses_Id(String email, String id);
}
