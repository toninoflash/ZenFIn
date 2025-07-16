package com.pintter.businessdomain.movement.dto;

import lombok.Data;

import java.math.BigDecimal;
@Data

public class TotalMovementDto {
    private BigDecimal income;
    private BigDecimal bills;
    private BigDecimal pigg;
}
