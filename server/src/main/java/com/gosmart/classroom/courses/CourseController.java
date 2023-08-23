package com.gosmart.classroom.courses;

import com.gosmart.classroom.enrollment.EnrollmentRepository;
import com.gosmart.classroom.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final EnrollmentRepository enrollmentRepository;

    /*
     * @detail Get all data
     * @method GET /api/v1/courses
     * @access private
     */
    @GetMapping
    public List<Courses> findAll() {
        return courseService.findAll();
    }

    /*
     * @detail Get all data by teacher
     * @method GET /api/v1/courses/s/teacher?email=?
     * @access private
     */
    @GetMapping("/s/{status}")
    public List<Courses> findAllByStatus(@PathVariable("status") String status, @RequestParam("email") String email) {

        if (status.equalsIgnoreCase("teacher")) {
            return courseService.findAllByTeacher(email);
        } else if (status.equalsIgnoreCase("student")) {
            return courseService.findAllByStudent(email);
        }

        return courseService.findAll();
    }

    /*
     * @detail Add or Create course and make user as teacher
     * @method POST /api/v1/courses
     * @access private
     */
    @PostMapping
    public Courses insert(@Valid @RequestBody CourseRequest request) {
        return courseService.insert(request);
    }

    /*
     * @detail Add student to course
     * @method GET /api/v1/courses/cid/{courseId}?cc=?&email=?
     * @access private
     */
    @GetMapping("/cid/{courseId}")
    public RedirectView addStudentToCourse(@PathVariable("courseId") String courseId, @RequestParam(value = "email",
            required = false) String email, @RequestParam("cc") String code) {

        courseService.findById(courseId);

        if (findStudentHasEnroll(courseId, email, true)) {
            return new RedirectView("https://isal-blog.vercel.app/");
        }

        if (email == null) {
           return new RedirectView("https://isal-blog.vercel.app/");
        }

        courseService.student(email, code);

        return new RedirectView("https://isal-blog.vercel.app/");
    }

    public boolean findStudentHasEnroll(String course, String email, Boolean b) {
        return enrollmentRepository.existsByCoursesIdAndUsersEmailAndIsStudent(course, email, b);
    }

}
