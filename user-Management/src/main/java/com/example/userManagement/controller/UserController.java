package com.example.userManagement.controller;

import com.example.userManagement.DTO.ActiveDisableTO;
import com.example.userManagement.DTO.LoginTO;
import com.example.userManagement.DTO.MessageTO;
import com.example.userManagement.entity.User;
import com.example.userManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // 👉 API to register/save a new user
    @PostMapping("/register")
    public MessageTO registerUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/all-users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/log-in")
    public  MessageTO userLogin(@RequestBody LoginTO loginTO) {
        return  userService.userLogIn(loginTO);
    }

    @PostMapping("/disable")
    public  MessageTO disableUser(@RequestBody ActiveDisableTO activeDisableTO) {
        return  userService.disableUser(activeDisableTO);
    }
}
