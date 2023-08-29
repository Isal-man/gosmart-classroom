package com.gosmart.classroom.assignments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignments, String> {
    List<Assignments> findAllByCourses_Id(String id);

    Optional<Assignments> findByName(String name);
}
