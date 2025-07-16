package com.pintter.businessdomain.movement.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AccountDto {
    private Long id;
    private Long uid; // ID del usuario propietario de la cuenta
    private String iban;
    private String type; // Ej: "checking", "savings", "joint"
    private BigDecimal balance;
    private String currency = "EUR"; // Por defecto
    private Boolean status = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<?> products;
}
