package com.gosmart.classroom.students;

import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    /*
    * @detail Get all data
    * @method GET /api/v1/students
    * @access private
    */
    @GetMapping
    public List<Students> findAll() {
        return studentService.findAll();
    }

    /*
    * @detail Get student by ID
    * @method GET /api/v1/students/{id}
    * @access private
    */
    @GetMapping("/{id}")
    public Students findById(@PathVariable("id") String id) {
        return studentService.findById(id);
    }

    /*
    * @detail Add student
    * @method POST /api/v1/students
    * @access private
    */
    @PostMapping
    public Students insert(@RequestBody String email) {
        return studentService.insert(email);
    }

}
