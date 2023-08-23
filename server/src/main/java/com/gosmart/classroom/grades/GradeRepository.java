package com.gosmart.classroom.grades;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GradeRepository extends JpaRepository<Grades, Integer> {
    List<Grades> findAllByAssignments_Id(String id);

    Optional<Grades> findByUsersEmailAndAssignments_Id(String email, String id);

    List<Grades> findAllByUsersEmail(String email);

    Optional<Grades> findByUsersEmail(String email);

    Optional<Grades> findByAssignments_Id(String id);

    boolean existsByUsersEmailAndAssignments_Id(String email, String id);

    boolean existsByAssignments_Id(String id);

    boolean existsByUsersEmail(String email);
}
