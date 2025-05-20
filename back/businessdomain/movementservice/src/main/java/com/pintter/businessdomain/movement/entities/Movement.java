/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.movement.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

/**
 *
 * @author Pc
 */
@Entity
@Data
@Table(name = "users")
public class Movement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long uid; // ID del usuario propietario
    private Long aid; // ID de la cuenta propietario
    private String name; // Nombre del producto (ej. "Tarjeta Oro")
    private String type; // Tipo de producto (ej. "credit-card", "insurance", etc.)
    private String currency = "EUR";
    private LocalDateTime createdAt = LocalDateTime.now();
    private String program;
    private Long cuota;

}
