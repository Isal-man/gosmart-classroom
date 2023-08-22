package com.gosmart.classroom.teachers;

import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    /*
    * @detail Get all data
    * @method GET /api/v1/teachers
    * @access private
    */
    @GetMapping
    public List<Teachers> findAll() {
        return teacherService.findAll();
    }

    /*
    * @detail Get teacher by ID
    * @method GET /api/v1/teachers/{id}
    * @access private
    */
    @GetMapping("/{id}")
    public Teachers findById(@PathVariable("id") String id) {
        return teacherService.findById(id);
    }

    /*
    * @detail Add teacher
    * @method POST /api/v1/teachers
    * @access private
    */
    @PostMapping
    public Teachers insert(@RequestBody String email) {
        return teacherService.insert(email);
    }

}
