package com.gosmart.classroom.users;

import com.gosmart.classroom.security.request.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Users> findAll() {
        return userRepository.findAll();
    } // Get all data

    public Users findByEmail(String email) {
        return userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + email));
    } // Find data by email

    // Add user
    public Users insert(RegisterRequest request) {

        Users users = new Users();

        if (request.getPassword().contains("admin")) {
            users.setRoles("admin");
        } else {
            users.setRoles("user");
        }

        users.setEmail(request.getEmail());
        users.setPassword(passwordEncoder.encode(request.getPassword()));
        users.setFullName(request.getFullName());
        users.setPhoneNumber(request.getPhoneNumber());
        users.setImage(request.getImage());
        users.setIsVerified(false);

        return userRepository.save(users);

    }

    public Users update(RegisterRequest request) {
        Users users = userRepository.findById(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + request.getEmail()));
        userRepository.delete(users);

        Users newUser = new Users();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFullName(request.getFullName());
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setImage(request.getImage());

        return userRepository.save(newUser);
    } // Update data

    public String delete(String email) {
        Users users = userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + email));
        userRepository.delete(users);

        return "User has been deleted with email " + email;
    } // Delete data

}
