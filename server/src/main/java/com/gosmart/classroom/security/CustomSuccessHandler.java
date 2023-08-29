package com.gosmart.classroom.security;

import com.gosmart.classroom.users.UserRepository;
import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        DefaultOAuth2User user = (DefaultOAuth2User) authentication.getPrincipal();

        if (!userRepository.existsByEmail(user.getAttribute("email"))) {
            Users newUser = new Users();
            newUser.setEmail(user.getAttribute("email"));
            newUser.setPassword(user.getName());
            newUser.setFullName(user.getAttribute("name"));
            newUser.setImage("https://storage.googleapis.com/gosmart-classroom.appspot.com/8380015.png");
            newUser.setRoles("user");
            newUser.setIsVerified(true);
            userRepository.save(newUser);
        }
        new DefaultRedirectStrategy().sendRedirect(request, response,
                "http://localhost:5173/oauth?email=" + user.getAttribute("email"));
    }
}
