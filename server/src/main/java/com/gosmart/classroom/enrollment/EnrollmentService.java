package com.gosmart.classroom.enrollment;

import com.gosmart.classroom.courses.CourseRepository;
import com.gosmart.classroom.courses.Courses;
import com.gosmart.classroom.users.UserRepository;
import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final  EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    // Get all data
    public List<Enrollments> findAll() {
        return enrollmentRepository.findAll();
    }

    // Get all data by UserId as teacher
    public List<Enrollments> findAllByTeacher(String email) {
        return enrollmentRepository.findAllByUsersAndIsTeacher(email);
    }

    // Get all data by UserId as student
    public List<Enrollments> findAllByStudent(String email) {
        return enrollmentRepository.findAllByUsersAndIsStudent(email);
    }

    // Get data by ID
    public Enrollments findById(String id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Enrollment not found with ID: " + id));
    }

    // Add enrollment teacher
    public void teacher(String email, String courseId) {
        Enrollments newEnrollment = new Enrollments();
        newEnrollment.setId(UUID.randomUUID().toString());
        newEnrollment.setUsers(getUser(email));
        newEnrollment.setCourses(getCourse(courseId));
        newEnrollment.setIsTeacher(true);
        newEnrollment.setEnrollmentDate(new Date());

        enrollmentRepository.save(newEnrollment);
    }

    // Add enrollment student
    public void student(String email, String courseId) {
        Enrollments newEnrollment = new Enrollments();
        newEnrollment.setId(UUID.randomUUID().toString());
        newEnrollment.setUsers(getUser(email));
        newEnrollment.setCourses(getCourse(courseId));
        newEnrollment.setIsStudent(true);
        newEnrollment.setEnrollmentDate(new Date());

        enrollmentRepository.save(newEnrollment);
    }

    public Users getUser(String email) {
        return userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public Courses getCourse(String courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalStateException("Course not found with ID: " + courseId));
    }

}
