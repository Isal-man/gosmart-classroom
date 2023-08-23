package com.gosmart.classroom.assignments;

import com.gosmart.classroom.courses.CourseService;
import com.gosmart.classroom.courses.Courses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.MissingResourceException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final CourseService courseService;

    // Get all assignment
    public List<Assignments> findAll() {
        return assignmentRepository.findAll();
    }

    // Get all assignment by Course
    public List<Assignments> findAllByCourse(String id) {
        return assignmentRepository.findAllByCourses_Id(id);
    }

    // Get assignment by ID
    public Assignments findById(String id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new MissingResourceException("Assignment not found with ID: " + id,
                        Assignments.class.toString(), "Assignment"));
    }

    // Add assignment
    public Object insert(AssignmentRequest assignmentRequest, String courseId, String type) {

        Courses courses = courseService.findById(courseId);

        Assignments assignment = new Assignments();
        assignment.setId(UUID.randomUUID().toString());
        assignment.setName(assignmentRequest.getName());
        assignment.setDescription(assignmentRequest.getDescription());

        if (type.equalsIgnoreCase("material")) {
            assignment.setIsMaterial(true);
        } else if (type.equalsIgnoreCase("task")) {
            assignment.setIsTask(true);
        } else if (type.equalsIgnoreCase("announcement")) {
            assignment.setIsAnnouncement(true);
        } else {
            return ResponseEntity.badRequest().body(new IllegalStateException("Type invalid").getMessage());
        }

        assignment.setCourses(courses);

        return assignmentRepository.save(assignment);

    }

}
