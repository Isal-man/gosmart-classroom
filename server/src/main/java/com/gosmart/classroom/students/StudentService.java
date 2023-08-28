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
    public Students insert(String email) {

        Users users = userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (studentRepository.existsByUsers(users)) {
            return studentRepository.findByUsers(users)
                    .orElseThrow(() -> new RuntimeException("Student not found"));
        }

        Students newStudent = new Students();
        newStudent.setId(UUID.randomUUID().toString());
        newStudent.setUsers(users);

        return studentRepository.save(newStudent);

    }

}
