package com.gosmart.classroom.security;

import com.gosmart.classroom.email.EmailService;
import com.gosmart.classroom.email.Token;
import com.gosmart.classroom.email.TokenRepository;
import com.gosmart.classroom.security.jwt.JwtUtils;
import com.gosmart.classroom.security.request.LoginRequest;
import com.gosmart.classroom.security.request.RegisterRequest;
import com.gosmart.classroom.security.service.UserDetailsImpl;
import com.gosmart.classroom.users.UserRepository;
import com.gosmart.classroom.users.UserService;
import com.gosmart.classroom.users.Users;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.view.RedirectView;

import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;

@RestController
@RequestMapping("/auth")
@EnableWebMvc
@Component
public class AuthController {

    private UserService userService;
    private UserRepository userRepository;
    private TokenRepository tokenRepository;
    private EmailService emailService;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    @Autowired
    public AuthController(UserService userService, UserRepository userRepository, TokenRepository tokenRepository, EmailService emailService, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    /*
     * @detail Register user
     * @method POST /auth/register
     * @access public
     * */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request, BindingResult bindingResult) throws MessagingException, UnsupportedEncodingException {

        // Check if email already registered
        if (userRepository.existsById(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // // Check if validation errors
        // if (bindingResult.hasErrors()) {
        //     return ResponseEntity.badRequest().body(createValidationErrorResponseBody(bindingResult));
        // }


        // Generate token for verification
        Token token = new Token();
        token.setToken(UUID.randomUUID().toString());
        token.setEmail(request.getEmail());
        tokenRepository.save(token);

        // Create link email verification
        String verificationLink = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/auth/verify?token=" + token.getToken())
                .build()
                .toUriString();

        // Create body email
        String emailContent = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "  <style>\n" +
                "    body {\n" +
                "      margin: 0;\n" +
                "      padding: 0;\n" +
                "      display: flex;\n" +
                "      justify-content: center;\n" +
                "      align-items: center;\n" +
                "      height: 100vh;\n" +
                "      font-family: Arial, sans-serif;\n" +
                "      background-color: #f0f0f0;\n" +
                "    }\n" +
                "\n" +
                "    .email-container {\n" +
                "      text-align: center;\n" +
                "      background-color: #ffffff;\n" +
                "      padding: 20px;\n" +
                "      border-radius: 10px;\n" +
                "      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\n" +
                "    }\n" +
                "\n" +
                "    .logo {\n" +
                "      width: 100px;\n" +
                "      height: auto;\n" +
                "      margin: 20px auto;\n" +
                "    }\n" +
                "\n" +
                "    .message {\n" +
                "      font-size: 18px;\n" +
                "      margin-bottom: 20px;\n" +
                "    }\n" +
                "\n" +
                "    .verify-button {\n" +
                "      display: inline-block;\n" +
                "      padding: 10px 20px;\n" +
                "      background-color: #007bff;\n" +
                "      color: #ffffff;\n" +
                "      border: none;\n" +
                "      border-radius: 8px;\n" +
                "      font-size: 16px;\n" +
                "      cursor: pointer;\n" +
                "      transition: background-color 0.3s ease;\n" +
                "      text-decoration: none;\n" +
                "    }\n" +
                "\n" +
                "    .verify-button:hover {\n" +
                "      background-color: #0056b3;\n" +
                "    }\n" +
                "  </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <div class=\"email-container\">\n" +
                "    <h1>Email Verification</h1>\n" +
                "    <img src=\"https://storage.googleapis.com/gosmart-classroom.appspot.com/logo-with-no-color.png\" alt=\"Logo\" " +
                "class=\"logo\">\n" +
                "    <p class=\"message\">Registration successful. Click the button below for verification.</p>\n" +
                "    <a href="+verificationLink+" class=\"verify-button" +
                "\">Verify</a>\n" +
                "  </div>\n" +
                "</body>\n" +
                "</html>";

        // send email
        emailService.sendEmailVerification(request.getEmail(), "Email Verification", emailContent);

        // Save user
        return ResponseEntity.ok(userService.insert(request));
    }

    /*
     * @detail Verify email user
     * @method GET /auth/verify?token=?(token)
     * @access public
     */
    @GetMapping("/verify")
    public RedirectView verifyUser(@RequestParam("token") String token) {
        Token tokenUser = tokenRepository.findById(token)
                .orElseThrow(() -> new IllegalStateException("Invalid token"));
        Users users = userRepository.findById(tokenUser.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + tokenUser.getEmail()));

        users.setIsVerified(true);
        userRepository.save(users);
        tokenRepository.delete(tokenUser);

        return new RedirectView("http://localhost:5173/");
    }

    /*
     * @detail Login user
     * @method POST /auth/login
     * @access public
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest,
                                                 BindingResult bindingResult, HttpServletResponse response) throws JwtException {

        // // Check if validation errors
        // if (bindingResult.hasErrors()) {
        //     return ResponseEntity.badRequest().body(createValidationErrorResponseBody(bindingResult));
        // }

        // Authenticate user with loginRequest
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // Set authenticate
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT Token from local authentication user
        String jwt = jwtUtils.generateJwtTokenLocal(authentication);

        // Put token to cookie
        Cookie cookie = new Cookie("token", jwt);
        cookie.setMaxAge((int) (jwtUtils.getJwtExpirationMs() / 1000));
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        // Get user
        UserDetailsImpl users = (UserDetailsImpl) authentication.getPrincipal();

        // Return user detail response
        return ResponseEntity.ok().body(users);

    }

    /*
     * @detail Login or Register using OAuth
     * @method GET /auth/oauth?email={}
     * @access public
     */
    @GetMapping("/oauth")
    public ResponseEntity<?> getUser(@RequestParam("email") String email, HttpServletResponse response) {
        Users users = userService.findByEmail(email);

        // Generate JWT Token from local authentication user
        String jwt = jwtUtils.generateJwtTokenOnline(users.getEmail());

        // Put token to cookie
        Cookie cookie = new Cookie("token", jwt);
        cookie.setMaxAge((int) (jwtUtils.getJwtExpirationMs() / 1000));
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        // Return user detail response
        return ResponseEntity.ok().body(users);

    }

    /*
    * @detail Log out user
    * @method Get /auth/logout
    * @access public
    */
    @GetMapping("/logout")
    public String logout(HttpServletResponse response) {
        // Remove token to cookie
        Cookie cookie = new Cookie("token", "");
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        return "User has logged out";
    }

    @GetMapping("/get-token")
    public ResponseEntity<?> getToken(@CookieValue(name = "token") String token) {

        if (token.length() > 0) {
            Map<String, Object> jwt = new HashMap<>();
            jwt.put("token", token);
            return ResponseEntity.ok(jwt);
        }

        return ResponseEntity.badRequest().body("User not logged in");
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

    // @Override
    // @GetMapping("/oauth")
    // public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
    //
    // }
}
