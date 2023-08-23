package com.gosmart.classroom.teachers;

import com.gosmart.classroom.users.UserRepository;
import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.MissingResourceException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

    // Get all data
    public List<Teachers> findAll() {
        return teacherRepository.findAll();
    }

    // Get teacher by ID
    public Teachers findById(String id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Teacher not found with ID: " + id));
    }

    // Add teacher
    public Teachers insert(String email) {

        Users users = userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (teacherRepository.existsByUsers(users)) {
            return teacherRepository.findByUsers(users)
                    .orElseThrow(() -> new MissingResourceException("Teacher not found", Teachers.class.toString(),
                            "Teacher"));
        }

        Teachers newTeacher = new Teachers();
        newTeacher.setId(UUID.randomUUID().toString());
        newTeacher.setUsers(users);

        return teacherRepository.save(newTeacher);
    }

}
