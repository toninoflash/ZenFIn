/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.userservice.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Transient;
import lombok.Data;

/**
 *
 * @author Pc
 */
@Data
public class UserDto {

    private Long id;
    private String username;
    private String email;
    private String password;
    private String name;
    private String lastname;
    private String bio;
    private String phone;
    private String website;
    private String direction;
    private String avatarUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String role;
    private List<?> account;
    private List<?> product;
    private List<?> movements;
    private List<?> credits;

}
