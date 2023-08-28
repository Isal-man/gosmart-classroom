package com.gosmart.classroom.grades;

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
@RequestMapping("/api/v1/grades")
@RequiredArgsConstructor
public class GradeController {

    private final GradeService gradeService;

    /*
     * @detail Get all grade
     * @method GET /api/v1/grades
     * @access private
     */
    @GetMapping
    public List<Grades> findAll() {
        return gradeService.findAll();
    }

    /*
     * @detail Get all grade by User email
     * @method GET /api/v1/grades/u/{email}
     * @access private
     */
    @GetMapping("/u/{email}")
    public ResponseEntity<?> findAllByUser(@PathVariable("email") String email) {
        return ResponseEntity.ok(gradeService.findAllByUser(email)).getBody();
    }

    /*
     * @detail Get all grade by Assignment id
     * @method GET /api/v1/grades/a/{id}
     * @access private
     */
    @GetMapping("/a/{id}")
    public ResponseEntity<?> findAllByAssignment(@PathVariable("id") String id) {
        return ResponseEntity.ok(gradeService.findAllByAssignment(id)).getBody();
    }

    /*
     * @detail Get grade by ID
     * @method GET /api/v1/grades/{id}
     * @access private
     */
    @GetMapping("/{id}")
    public Grades findById(@PathVariable("id") Integer id) {
        return gradeService.findById(id);
    }

    /*
     * @detail Get grade by User email and Assignment id
     * @method GET /api/v1/grades/una?user=?&assignment=?
     * @access private
     */
    @GetMapping("/una")
    public Grades findByUserAndAssignment(@RequestParam("user") String email, @RequestParam("assignment") String id) {
        return gradeService.findByUserAndAssignment(email, id);
    }

    /*
     * @detail Give and Update grade assignment student
     * @method POST /api/v1/grades
     * @access private
     */
    @PostMapping
    public ResponseEntity<?> grade(@Valid @RequestBody GradeRequest gradeRequest, BindingResult bindingResult) {

        // // Check if validation errors
        // if (bindingResult.hasErrors()) {
        //     return ResponseEntity.badRequest().body(createValidationErrorResponseBody(bindingResult));
        // }

        return ResponseEntity.ok(gradeService.grades(gradeRequest.getEmail(), gradeRequest.getAid(),
                gradeRequest.getCid(),
                gradeRequest.getGrade()));
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
