package com.gosmart.classroom.grades;

import com.gosmart.classroom.assignments.AssignmentService;
import com.gosmart.classroom.assignments.Assignments;
import com.gosmart.classroom.courses.CourseService;
import com.gosmart.classroom.courses.Courses;
import com.gosmart.classroom.enrollment.EnrollmentService;
import com.gosmart.classroom.enrollment.Enrollments;
import com.gosmart.classroom.users.UserService;
import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.WeaverMessages;
import org.aspectj.weaver.ast.Or;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.MissingResourceException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GradeService {

    private final GradeRepository gradeRepository;
    private final UserService userService;
    private final AssignmentService assignmentService;
    private final CourseService courseService;

    // Get all grade
    public List<Grades> findAll() {
        return gradeRepository.findAll();
    }

    // Get all grade by User email
    public ResponseEntity<?> findAllByUser(String email) {

        if (!gradeRepository.existsByUsersEmail(email)) {
            return ResponseEntity.badRequest().body("Grade not found with User email: " + email);
        }

        return ResponseEntity.ok(gradeRepository.findAllByUsersEmail(email));
    }

    // Get all grade by Assignment ID
    public ResponseEntity<?> findAllByAssignment(String id) {

        if (!gradeRepository.existsByAssignments_Id(id)) {
            return ResponseEntity.badRequest().body("Grade not found with Assignment ID: " + id);
        }

        return ResponseEntity.ok(gradeRepository.findAllByAssignments_Id(id));
    }

    // Count which student has been graded
    public ResponseEntity<?> countAllByAssignmentId(String aid) {
        Assignments assignments = assignmentService.findById(aid);

        return ResponseEntity.ok(gradeRepository.countAllByAssignments_Id(assignments.getId()));
    }

    // Get grade by ID
    public Grades findById(Integer id) {
        return gradeRepository.findById(id)
                .orElseThrow(() -> new MissingResourceException("Grade not found with ID: " + id,
                        Grades.class.toString(), "Grades ID"));
    }

    // Get grade by User and Assignment ID
    public Grades findByUserAndAssignment(String email, String id) {
        return gradeRepository.findByUsersEmailAndAssignments_Id(email, id)
                .orElseThrow(() -> new MissingResourceException("Grade not found",
                        Grades.class.toString(), "Grades ID"));
    }

    // Rate assignments task
    public Grades grades(String email, String aid, String cid, Integer grade) {

        Users users = userService.findByEmail(email);
        Assignments assignments = assignmentService.findById(aid);
        Courses courses = courseService.findById(cid);

        if (gradeRepository.existsByUsersEmailAndAssignments_Id(email, aid)) {
            Grades updateGrades = gradeRepository.findByUsersEmailAndAssignments_Id(email, aid)
                    .orElseThrow(() -> new MissingResourceException("Grade not found with User email: " + email,
                            Grades.class.toString(), "Grade User Email"));

            updateGrades.setGrade(grade);
            return gradeRepository.save(updateGrades);
        }

        Grades addGrades = new Grades();
        addGrades.setUsers(users);
        addGrades.setAssignments(assignments);
        addGrades.setCourses(courses);
        addGrades.setGrade(grade);

        return gradeRepository.save(addGrades);

    }

}
