package com.example.userManagement.service;

import com.example.userManagement.DTO.LoginTO;
import com.example.userManagement.DTO.MessageTO;
import com.example.userManagement.entity.User;
import com.example.userManagement.repository.DesignationRepository;
import com.example.userManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DesignationRepository designationRepository;

    @Override
    public MessageTO saveUser(User user) throws RuntimeException {
        try {
            // check if email already exists
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                return new MessageTO("User with this email already exists!", false, null);
            }

            // save user
            userRepository.save(user);
            return new MessageTO("User saved successfully!", true, null);

        } catch (Exception e) {
            return new MessageTO("Error saving user: " + e.getMessage(), false, null);
        }
    }

    @Override
    public List<User> getAllUsers() throws RuntimeException {
        return userRepository.findAll();
    }


    @Override
    public MessageTO userLogIn(LoginTO loginTO) throws RuntimeException {
        MessageTO messageTO = new MessageTO();

        Optional<User> optionalUser = userRepository.findByEmail(loginTO.getEmail());

        if (!optionalUser.isPresent()) {
            messageTO.setMessage("Login failed: User not found");
            return messageTO;
        }

        User user = optionalUser.get();

        if (!user.isActiveStaus()) {
            messageTO.setMessage("Login failed: User is not active");
            return messageTO;
        }

        if (!user.getPassword().equals(loginTO.getPassword())) {
            messageTO.setMessage("Login failed: Invalid credentials");
            return messageTO;
        }

        messageTO.setMessage("Login successful");
        messageTO.setData(user);
        return messageTO;
    }

    @Override
    public MessageTO disableUser(String emailID) throws RuntimeException {
        try {

            Optional<User> optionalUser = userRepository.findByEmail(emailID);

            if (optionalUser.isEmpty()) {
                return new MessageTO("User Id Does not exsits", false, null);
            }

            User user = optionalUser.get();

            // set activeStatus = false (disabled)
            user.setActiveStaus(false);
          userRepository.save(user);

            return new MessageTO("User disabled Sucessfully" , false, null);
        } catch (Exception e) {
            throw new RuntimeException("Failed to disable user: " + e.getMessage(), e);
        }
    }



}
