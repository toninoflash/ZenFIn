package com.pintter.businessdomain.product.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class MovementDto {
    private Long uid; // ID del usuario propietario
    private Long aid; // ID de la cuenta propietario
    private String name; // Nombre del producto (ej. "Tarjeta Oro")
    private String type; // Tipo de producto (ej. "credit-card", "insurance", etc.)
    private String currency = "EUR";
    private LocalDateTime createdAt = LocalDateTime.now();
    private String program;
    private BigDecimal cuota;
}
