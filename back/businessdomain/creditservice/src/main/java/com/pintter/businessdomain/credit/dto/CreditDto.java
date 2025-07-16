/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.credit.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 *
 * @author Pc
 */
@Data
public class CreditDto {
    private Long id;
    private Long uid;
    private Long aid;
    private String name;
    private String type;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private Integer term;
    private LocalDateTime startDate;
    private BigDecimal monthlyPayment;
    private BigDecimal totalInterest;
    private BigDecimal totalAmount;
    private LocalDateTime endDate;
    private Boolean status = true;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt; // Optional calculated field
    private boolean isPaid;

    private BigDecimal totalAmountPending;
    private Integer termPending;

}
