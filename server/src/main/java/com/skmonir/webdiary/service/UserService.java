package com.skmonir.webdiary.service;

import com.skmonir.webdiary.dto.AuthRequest;
import com.skmonir.webdiary.dto.AuthUserResponse;
import com.skmonir.webdiary.jwt.JwtUtil;
import com.skmonir.webdiary.model.User;
import com.skmonir.webdiary.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthUserResponse login(AuthRequest authRequest) {
        AuthUserResponse authUserResponse = new AuthUserResponse();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            authUserResponse.setUserInfo(new User(authRequest.getUsername()));
            authUserResponse.setAccessToken(jwtUtil.generateToken(authRequest.getUsername()));
        } catch (Exception ex) {
            authUserResponse.setMessage("Invalid username/password");
        }

        return authUserResponse;
    }

    public AuthUserResponse register(User user) {
        AuthUserResponse authUserResponse = new AuthUserResponse();
        User existingUser = userRepo.findByUsername(user.getUsername());
        if (existingUser != null) {
            authUserResponse.setMessage("Username already exists in the system");
        } else {
            userRepo.save(user);
            authUserResponse = login(new AuthRequest(user.getUsername(), user.getPassword()));
        }
        return authUserResponse;
    }
}
