package com.gosmart.classroom.courses;

import com.gosmart.classroom.enrollment.EnrollmentService;
import com.gosmart.classroom.enrollment.Enrollments;
import com.gosmart.classroom.students.StudentService;
import com.gosmart.classroom.teachers.TeacherService;
import com.gosmart.classroom.users.UserRepository;
import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final EnrollmentService enrollmentService;
    private final UserRepository userRepository;
    private final TeacherService teacherService;
    private final StudentService studentService;

    // Get all data
    public List<Courses> findAll() {
        return courseRepository.findAll();
    }

    // Get all data by user teacher
    public List<Courses> findAllByTeacher(String email) {
        List<Enrollments> enrollments = enrollmentService.findAllByTeacher(email);
        List<Courses> listCourse = new ArrayList<>();

        for (Enrollments e :
                enrollments) {
            Courses courses = courseRepository.findById(e.getCourses().getId())
                    .orElseThrow(() -> new IllegalStateException("Courses not found with ID: " + e.getCourses().getId()));
            listCourse.add(courses);
        }

        return listCourse;
    }

    // Get all data by user student
    public List<Courses> findAllByStudent(String email) {
        List<Enrollments> enrollments = enrollmentService.findAllByStudent(email);
        List<Courses> listCourse = new ArrayList<>();

        for (Enrollments e :
                enrollments) {
            Courses courses = courseRepository.findById(e.getCourses().getId())
                    .orElseThrow(() -> new IllegalStateException("Courses not found with ID: " + e.getCourses().getId()));
            listCourse.add(courses);
        }

        return listCourse;
    }

    // Get data by ID
    public Courses findById(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Course not found with ID: " + id));
    }

    // Get data by Course Code
    public Courses findByCc(String cc) {
        return courseRepository.findByIdContains(cc)
                .orElseThrow(() -> new IllegalStateException("Course not found with ID: " + cc));
    }

    // Add course for teacher
    public Courses insert(CourseRequest courseRequest) {

        // Create course ID
        String id = UUID.randomUUID().toString();

        // Check if user is exists
        Users users = userRepository.findById(courseRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + courseRequest.getEmail()));

        // Make user as teacher
        teacherService.insert(courseRequest.getEmail());

        // Create new course
        Courses newCourse = new Courses();
        newCourse.setId(id);
        newCourse.setName(courseRequest.getName());
        newCourse.setSchedule(courseRequest.getSchedule());
        newCourse.setImage(courseRequest.getImage());
        newCourse.setTheme(courseRequest.getTheme());
        newCourse.setUsers(users);

        // Save course
        courseRepository.save(newCourse);

        // Create enrollment of teacher
        enrollmentService.teacher(courseRequest.getEmail(), id);

        return newCourse;
    }

    // Add course for student
    public void student(String email, String courseCode) {

        // Check if user is exists
        userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Check if course is exists
        courseRepository.findByIdContains(courseCode)
                .orElseThrow(() -> new IllegalStateException("Course not found with class code: " + courseCode));

        // Make user as student
        studentService.insert(email);

        // Create enrollment of student
        enrollmentService.student(email, courseCode);

    }

    // Update course
    public Courses update(CourseRequest courseRequest) {

        // Set update course
        Courses setCourse = new Courses();
        setCourse.setName(courseRequest.getName());
        setCourse.setSchedule(courseRequest.getSchedule());
        setCourse.setImage(courseRequest.getImage());
        setCourse.setTheme(courseRequest.getTheme());

        return courseRepository.save(setCourse);

    }

    // Delete course
    public String delete(String id) {

        // Find course by id
        Courses courses = courseRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Course not found with ID: " + id));

        // Find enrollment by courseId
        Enrollments enrollments = enrollmentService.findByCourseId(id);

        // Delete enrollment by courseId
        enrollmentService.delete(id);

        // Delete course
        courseRepository.delete(courses);

        return "Course has been deleted";

    }

}
