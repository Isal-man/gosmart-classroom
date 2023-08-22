package com.gosmart.classroom.enrollment;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    /*
    * @detail Get all data
    * @method GET /api/v1/enrollments
    * @access private
    */
    @GetMapping
    public List<Enrollments> findAll() {
        return enrollmentService.findAll();
    }

    /*
     * @detail Get all data by teacher
     * @method GET /api/v1/enrollments/{teacherId}
     * @access private
     */
    @GetMapping("/{teacherId}")
    public List<Enrollments> findAllByTeacher(@PathVariable("teacherId") String teacherId) {
        return enrollmentService.findAllByTeacher(teacherId);
    }

    /*
     * @detail Get all data by student
     * @method GET /api/v1/enrollments/{studentId}
     * @access private
     */
    @GetMapping("/{studentId}")
    public List<Enrollments> findAllByStudent(@PathVariable("studentId") String studentId) {
        return enrollmentService.findAllByStudent(studentId);
    }

}
