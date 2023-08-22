package com.gosmart.classroom.teachers;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teachers, String> {
    boolean existsByEmail(String email);

    Optional<Teachers> findByEmail(String email);
}
