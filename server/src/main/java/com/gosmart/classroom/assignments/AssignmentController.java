package com.gosmart.classroom.assignments;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    /*
    * @detail Get all assignment
    * @method GET /api/v1/assignments
    * @access private
    */
    @GetMapping
    public List<Assignments> findAll() {
        return assignmentService.findAll();
    }

    /*
     * @detail Get assignment by Course use ID
     * @method GET /api/v1/assignments/cid/{courseId}
     * @access private
     */
    @GetMapping("/cid/{courseId}")
    public List<Assignments> findAllByCourse(@PathVariable("courseId") String id) {
        return assignmentService.findAllByCourse(id);
    }

    /*
    * @detail Get assignment by ID
    * @method GET /api/v1/assignments/{id}
    * @access private
    */
    @GetMapping("/{id}")
    public Assignments findById(@PathVariable("id") String id) {
        return assignmentService.findById(id);
    }

    /*
    * @detail Add assignment
    * @method POST /api/v1/assignments/{courseId}?type=?
    * @access private
    */
    @PostMapping("/{courseId}")
    public ResponseEntity<?> insert(@Valid @RequestBody AssignmentRequest assignmentRequest,
                                    @PathVariable("courseId") String courseId,
                                    @RequestParam("type") String type, BindingResult bindingResult) {

        return ResponseEntity.ok(assignmentService.insert(assignmentRequest, courseId, type));

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
