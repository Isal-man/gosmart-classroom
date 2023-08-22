package com.gosmart.classroom.students;

import com.gosmart.classroom.users.UserRepository;
import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    // Get all data
    public List<Students> findAll() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Students findById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Student not found with ID " + id));
    }

    // Add student
    public Students insert(Users users) {

        Students newStudent = new Students();
        newStudent.setId(UUID.randomUUID().toString());
        newStudent.setFullName(users.getFullName());
        newStudent.setEmail(users.getEmail());
        newStudent.setPhoneNumber(users.getPhoneNumber());
        newStudent.setImage(users.getImage());

        return studentRepository.save(newStudent);

    }

}
