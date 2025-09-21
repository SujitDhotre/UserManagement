package com.example.userManagement.service;

import com.example.userManagement.DTO.ActiveDisableTO;
import com.example.userManagement.DTO.LoginTO;
import com.example.userManagement.DTO.MessageTO;
import com.example.userManagement.entity.User;

import java.util.List;

public interface UserService {

    MessageTO saveUser(User user) throws RuntimeException;

    List<User> getAllUsers() throws RuntimeException;

    MessageTO userLogIn(LoginTO loginTO) throws RuntimeException;

    MessageTO disableUser(ActiveDisableTO activeDisableTO) throws RuntimeException;
}
