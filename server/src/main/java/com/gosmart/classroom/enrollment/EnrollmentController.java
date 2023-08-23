package com.gosmart.classroom.enrollment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    /*
     * @detail Get all participant
     * @method GET /api/v1/enrollments/cid/{courseId}
     * @access private
     */
    @GetMapping("/cid/{courseId}")
    public ResponseEntity<?> findAllParticipant(@PathVariable("courseId") String courseId) {

        return ResponseEntity.ok(enrollmentService.findAllParticipant(courseId));

    }

}
