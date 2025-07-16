/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.product.controller;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 *
 * @author Pc
 */
@Data
public class AccountDto {
    private Long id;
    private Long uid; // ID del usuario propietario de la cuenta
    private String iban;
    private String type; // Ej: "checking", "savings", "joint"
    private Long balance;
    private String currency = "EUR"; // Por defecto
    private Boolean status = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<?> products;
    
}
