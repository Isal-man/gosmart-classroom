package com.gosmart.classroom.students;

import com.gosmart.classroom.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Students, String> {
    Students findByUsers(Users users);

    boolean existsByUsers(Users users);
}
