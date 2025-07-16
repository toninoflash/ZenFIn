package com.pintter.businessdomain.credit.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
public class SimulationDto {
    private Long uid;
    private String name;
    private String type;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private Integer term;
}
