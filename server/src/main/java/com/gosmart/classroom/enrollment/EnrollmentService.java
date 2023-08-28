package com.gosmart.classroom.enrollment;

import com.gosmart.classroom.courses.CourseRepository;
import com.gosmart.classroom.courses.CourseService;
import com.gosmart.classroom.courses.Courses;
import com.gosmart.classroom.users.UserRepository;
import com.gosmart.classroom.users.UserService;
import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.MissingResourceException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    // Get all data
    public List<Enrollments> findAll() {
        return enrollmentRepository.findAll();
    }

    // Get all data by UserId as teacher
    public List<Enrollments> findAllByTeacher(String email) {
        return enrollmentRepository.findAllByUsersEmailAndIsTeacher(email,true);
    }

    // Get all data by UserId as student
    public List<Enrollments> findAllByStudent(String email) {
        return enrollmentRepository.findAllByUsersEmailAndIsStudent(email, true);
    }

    // Get all data by student participant
    public List<Enrollments> findAllParticipant(String courseId) {
        return enrollmentRepository.findAllByCourses_Id(courseId);
    }

    // Get data by ID
    public Enrollments findById(String id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Enrollment not found with ID: " + id));
    }

    // Get data by courseId
    public Enrollments findByCourseId(String id) {
        return enrollmentRepository.findByCoursesId(id)
                .orElseThrow(() -> new  IllegalStateException("Enrollment not found with courseId: " + id));
    }

    // Get data by User email and Course ID
    public Enrollments findByUsersEmailAndCourses_Id(String email, String id) {
        // Check if user exists
        Users users = getUser(email);

        // Check if course exists
        Courses courses = getCourse(id);

        return enrollmentRepository.findByUsersEmailAndCourses_Id(users.getEmail(), courses.getId())
                .orElseThrow(() -> new RuntimeException("not enroll"));
    }

    // Check if user has been enrolled on course as student
    public boolean findUserHasEnroll(String course, String email) {
        return enrollmentRepository.existsByCoursesIdAndUsersEmail(course, email);
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
    public void student(String email, String courseCode) {

        Enrollments newEnrollment = new Enrollments();
        newEnrollment.setId(UUID.randomUUID().toString());
        newEnrollment.setUsers(getUser(email));
        newEnrollment.setCourses(getCourse(courseCode));
        newEnrollment.setIsStudent(true);
        newEnrollment.setEnrollmentDate(new Date());

        enrollmentRepository.save(newEnrollment);
    }

    // Delete all enrollment by courseId
    public void delete(String id) {

        enrollmentRepository.deleteAllByCoursesId(id);

    }

    public Users getUser(String email) {
        return userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public Courses getCourse(String courseCode) {
        return courseRepository.findByIdContains(courseCode)
                .orElseThrow(() -> new IllegalStateException("Course not found with ID: " + courseCode));
    }

}
