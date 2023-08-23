package com.gosmart.classroom.teachers;

import com.gosmart.classroom.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teachers, String> {
    boolean existsByUsers(Users users);

    Optional<Teachers> findByUsers(Users users);
}
