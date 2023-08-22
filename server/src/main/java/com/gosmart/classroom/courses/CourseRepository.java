package com.gosmart.classroom.courses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Courses, String> {
    Optional<Courses> findByClassCode(String classCode);
}
