package com.gosmart.classroom.users;

import com.gosmart.classroom.security.request.EditRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /*
    * @detail Get all user
    * @method GET /api/v1/users
    * @access private
    */
    @GetMapping
    public List<Users> findAll() {
        return userService.findAll();
    }

    /*
     * @detail Edit user data
     * @method PUT /api/v1/users?email=?
     * @access private
     */
    @PutMapping
    public Users update(@Valid @RequestBody EditRequest request, @RequestParam("email") String email) {
        return userService.update(request, email);
    }

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
