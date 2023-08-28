package com.gosmart.classroom.courses;

import com.gosmart.classroom.enrollment.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.util.ArrayList;
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
     * @detail Get all data by status
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
     * @detail Get course by ID
     * @method GET /api/v1/courses/{id}
     * @access private
     */
    @GetMapping("/{id}")
    public Courses findById(@PathVariable("id") String id) {
        return courseService.findById(id);
    }

    /*
     * @detail Add or Create course and make user as teacher
     * @method POST /api/v1/courses
     * @access private
     */
    @PostMapping
    public ResponseEntity<?> insert(@Valid @RequestBody CourseRequest request, BindingResult bindingResult) {

        // // Check if validation errors
        // if (bindingResult.hasErrors()) {
        //     return ResponseEntity.badRequest().body(createValidationErrorResponseBody(bindingResult));
        // }

        return ResponseEntity.ok(courseService.insert(request));
    }

    /*
     * @detail Add student to course
     * @method GET /api/v1/courses/join-course?cc=?&email=?
     * @access private
     */
    @GetMapping("/join-course")
    public String addStudentToCourse(@RequestParam(value = "email",
            required = false) String email, @RequestParam("cc") String code) {

        Courses courses = courseService.findByCc(code);

        if (findUserHasEnroll(courses.getId(), email)) {
            return "enroll";
        }

        courseService.student(email, courses.getId());

        return "http://localhost:5173/course/" + courses.getId();
    }

    public boolean findUserHasEnroll(String course, String email) {
        return enrollmentRepository.existsByCoursesIdAndUsersEmail(course, email);
    }

    // Get detail from validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> handleValidationException(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();

        List<String> errors = new ArrayList<>();
        for (FieldError fieldError : fieldErrors) {
            errors.add(fieldError.getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(errors);
    }

}
