/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.userservice.services;

import com.pintter.businessdomain.userservice.dto.UserDto;
import com.pintter.businessdomain.userservice.entities.User;
import com.pintter.businessdomain.userservice.exceptions.BusinessRuleException;
import java.util.List;
import java.util.Optional;


/**
 *
 * @author Pc
 */

public interface UserService {
    List<UserDto> getAllUsers();
    Optional<User> getUserById(Long id);
    UserDto createUser(UserDto userDto);
    UserDto updateUser(Long id, UserDto userDto) throws BusinessRuleException;
    void deleteUser(Long id);
    UserDto getFull(Long uid) throws BusinessRuleException;
    Optional<User> getUserByUsername(String username);
    Optional<User> getUserByEmail(String username);
}
