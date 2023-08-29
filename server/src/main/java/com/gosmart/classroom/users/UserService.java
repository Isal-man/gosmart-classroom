package com.gosmart.classroom.users;

import com.gosmart.classroom.courses.CourseRepository;
import com.gosmart.classroom.courses.Courses;
import com.gosmart.classroom.enrollment.EnrollmentRepository;
import com.gosmart.classroom.enrollment.Enrollments;
import com.gosmart.classroom.grades.GradeRepository;
import com.gosmart.classroom.grades.Grades;
import com.gosmart.classroom.security.request.EditRequest;
import com.gosmart.classroom.security.request.RegisterRequest;
import com.gosmart.classroom.students.StudentRepository;
import com.gosmart.classroom.students.Students;
import com.gosmart.classroom.teachers.TeacherRepository;
import com.gosmart.classroom.teachers.Teachers;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final GradeRepository gradeRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Users> findAll() {
        return userRepository.findAll();
    } // Get all data

    public Users findByEmail(String email) {
        return userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + email));
    } // Find data by email

    // Add user
    public Users insert(RegisterRequest request) {

        Users users = new Users();

        if (request.getPassword().contains("admin")) {
            users.setRoles("admin");
        } else {
            users.setRoles("user");
        }

        users.setEmail(request.getEmail());
        users.setPassword(passwordEncoder.encode(request.getPassword()));
        users.setFullName(request.getFullName());
        users.setPhoneNumber(request.getPhoneNumber());
        users.setImage(request.getImage());
        users.setIsVerified(false);

        return userRepository.save(users);

    }

    // Update user
    public Users update(EditRequest request, String email) {
        System.out.println(email);
        System.out.println(request.getImage());
        Users newUser = new Users();
        List<Enrollments> enrollments = null;
        Students students = null;
        Teachers teachers = null;
        Courses courses = null;
        Grades grades = null;
        Users users = userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + request.getEmail()));

        if (users.getPassword().contains("admin")) {
            newUser.setRoles("admin");
        } else {
            newUser.setRoles("user");
        }
        newUser.setEmail(request.getEmail());
        newUser.setFullName(request.getFullName());
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setImage(request.getImage());
        newUser.setPassword(users.getPassword());
        newUser.setIsVerified(users.getIsVerified());

        if (enrollmentRepository.existsByUsers(users)) {
            enrollments = enrollmentRepository.findAllByUsersEmail(users.getEmail());

            for (Enrollments enrollment : enrollments) {
                enrollment.setUsers(null);
                enrollmentRepository.save(enrollment);
            }
        }

        if (studentRepository.existsByUsers(users)) {
            students = studentRepository.findByUsers(users)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            students.setUsers(null);
            studentRepository.save(students);
        }

        if (teacherRepository.existsByUsers(users)) {
            teachers = teacherRepository.findByUsers(users)
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));

            teachers.setUsers(null);
            teacherRepository.save(teachers);
        }

        if (courseRepository.existsByUsers(users)) {
            courses = courseRepository.findByUsersEmail(users.getEmail())
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            courses.setUsers(null);
            courseRepository.save(courses);
        }

        if (gradeRepository.existsByUsersEmail(users.getEmail())) {
            grades = gradeRepository.findByUsersEmail(users.getEmail())
                    .orElseThrow(() -> new RuntimeException("Grade not found"));

            grades.setUsers(null);
            gradeRepository.save(grades);
        }

        userRepository.delete(users);

        userRepository.save(newUser);

        if (enrollments != null) {
            for (Enrollments enrollment : enrollments) {
                System.out.println("jln");
                enrollment.setUsers(newUser);
                enrollmentRepository.save(enrollment);
            }
        }

        if (students != null) {
            students.setUsers(newUser);
            studentRepository.save(students);
        }

        if (teachers != null) {
            teachers.setUsers(newUser);
            teacherRepository.save(teachers);
        }

        if (courses != null) {
            courses.setUsers(newUser);
            courseRepository.save(courses);
        }

        if (grades != null) {
            grades.setUsers(newUser);
            gradeRepository.save(grades);
        }

        return newUser;
    }

    public String delete(String email) {
        Users users = userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + email));
        userRepository.delete(users);

        return "User has been deleted with email " + email;
    } // Delete data

}
