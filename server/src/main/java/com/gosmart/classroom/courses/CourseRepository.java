package com.gosmart.classroom.courses;

import com.gosmart.classroom.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Courses, String> {
    Optional<Courses> findByIdContains(String id);

    Optional<Courses> findByUsersEmail(String email);

    boolean existsByUsers(Users users);

}
