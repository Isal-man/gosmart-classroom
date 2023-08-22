package com.gosmart.classroom.teachers;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teachers, String> {
    boolean existsByEmail(String email);
}
