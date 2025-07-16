/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.product.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

/**
 *
 * @author Pc
 */
@Entity
@Data
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long uid; // ID del usuario propietario
    private Long aid; // ID de la cuenta propietario
    private String name; // Nombre del producto (ej. "Tarjeta Oro")
    private String type; // Tipo de producto (ej. "credit-card", "insurance", etc.)
    private String currency = "EUR";
    private Boolean active = true;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    private LocalDateTime endedAt = LocalDateTime.now();
    private String program;
    private BigDecimal balance;
    private BigDecimal cuota;
}
