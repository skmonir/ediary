package com.skmonir.webdiary.controller;

import com.skmonir.webdiary.dto.AuthRequest;
import com.skmonir.webdiary.dto.AuthUserResponse;
import com.skmonir.webdiary.model.User;
import com.skmonir.webdiary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user/")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("login")
    public AuthUserResponse loginUser(@RequestBody AuthRequest authRequest) throws Exception {
        AuthUserResponse response;
        try {
            response = userService.login(authRequest);
        } catch (Exception ex) {
            response = new AuthUserResponse();
            response.setMessage("Something went wrong!");
        }
        return response;
    }

    @PostMapping("register")
    public AuthUserResponse registerUser(@RequestBody User user) throws Exception {
        AuthUserResponse response;
        try {
            response = userService.register(user);
        } catch (Exception ex) {
            response = new AuthUserResponse();
            response.setMessage("Something went wrong!");
        }
        return response;
    }
}
