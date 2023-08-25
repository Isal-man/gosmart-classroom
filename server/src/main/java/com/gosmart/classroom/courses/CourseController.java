package com.gosmart.classroom.courses;

import com.gosmart.classroom.enrollment.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
     * @method GET /api/v1/courses/s/{status}?email=?
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
    public ResponseEntity<?> insert(@Valid @RequestBody CourseRequest request, BindingResult bindingResult) {

        // Check if validation errors
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(createValidationErrorResponseBody(bindingResult));
        }

        return ResponseEntity.ok(courseService.insert(request));
    }

    /*
     * @detail Add student to course
     * @method GET /api/v1/courses/cid/{courseId}cc=?&email=?
     * @access private
     */
    @GetMapping("/cid/{courseId}")
    public RedirectView addStudentToCourse(@PathVariable("courseId") String courseId, @RequestParam(value = "email",
            required = false) String email, @RequestParam("cc") String code) {

        courseService.findById(courseId);

        if (findUserHasEnroll(courseId, email)) {
            return new RedirectView("https://isal-blog.vercel.app/");
        }

        if (email == null) {
           return new RedirectView("https://isal-blog.vercel.app/");
        }

        courseService.student(email, code);

        return new RedirectView("https://isal-blog.vercel.app/");
    }

    public boolean findUserHasEnroll(String course, String email) {
        return enrollmentRepository.existsByCoursesIdAndUsersEmail(course, email);
    }

    // Get detail from validation errors
    private Map<String, String> createValidationErrorResponseBody(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : bindingResult.getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return errors;
    }

}
