package com.gosmart.classroom.students;

import com.gosmart.classroom.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Students, String> {
    Optional<Students> findByUsers(Users users);

    boolean existsByUsers(Users users);
}
