/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.credit.services;

import com.pintter.businessdomain.credit.exceptions.BusinessRuleException;
import com.pintter.businessdomain.credit.dto.CreditDto;
import com.pintter.businessdomain.credit.entities.Credit;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.pintter.businessdomain.credit.mapper.CreditMapper;
import com.pintter.businessdomain.credit.repository.CreditRepository;

/**
 *
 * @author Pc
 */
@Service
@Slf4j
public class CreditServiceImpl implements CreditService {

    @Autowired
    private CreditRepository CreditRepository;
    @Autowired
    private CreditMapper CreditMapper;
    // Add any required dependencies here (e.g., repositories, mappers)
    
    
    @Override
    public List<CreditDto> getAllCredits() {
        // Implementation here
        return null;
    }

    @Override
    public CreditDto getCreditById(Long id) {
        // Implementation here
        return null;
    }

    @Override
    public CreditDto getCurrentCredit(Authentication auth) {
        // Implementation here
        return null;
    }

    @Override
    public CreditDto createCredit(CreditDto creditDto) {
        // Implementation here
        return null;
    }

    @Override
    public CreditDto updateCredit(Long id, CreditDto creditDto) throws BusinessRuleException {
        // Implementation here
        Optional<Credit> opt = CreditRepository.findById(id); 
        log.info("resCredit:::::::"+opt.get());
        Credit resCredit = CreditMapper.toOptional(opt);
        if (resCredit != null) {
            resCredit.setId(id);
            resCredit.setName(creditDto.getName());
            resCredit.setAmount(creditDto.getAmount());
            resCredit.setInterestRate(creditDto.getInterestRate());
            resCredit.setTerm(creditDto.getTerm());
            resCredit.setMonthlyPayment(creditDto.getMonthlyPayment());
        } else {
            BusinessRuleException businessRuleException = new BusinessRuleException("0002", "Error validación. Transacion no localizada. ", HttpStatus.PRECONDITION_FAILED);
            throw businessRuleException;
        }
        log.info("resCredit:::::::"+resCredit);
        CreditDto save = CreditMapper.toDto(CreditRepository.save(resCredit));
        return save;
    }

    @Override
    public void deleteCredit(Long id) {
        // Implementation here
    }
    @Override
    public CreditDto simulationCredit(CreditDto creditDto) {
        // Implementation here
        creditDto.setTotalInterest(calculateInterest(creditDto.getAmount(),creditDto.getInterestRate()));
        creditDto.setTotalAmount(creditDto.getAmount().add(creditDto.getTotalInterest()));
        creditDto.setMonthlyPayment(creditDto.getTotalAmount().divide(new BigDecimal(creditDto.getTerm()),2,RoundingMode.HALF_UP));
        creditDto.setStartDate(LocalDateTime.now());
        creditDto.setEndDate(LocalDateTime.now().plusMonths(creditDto.getTerm()));
        return creditDto;
    }

    private BigDecimal calculateInterest(BigDecimal amount, BigDecimal interestRate) {
        // Validación de parámetros
        if (amount == null || interestRate == null) {
            throw new IllegalArgumentException("Amount and interest rate cannot be null");
        }
        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }

        // Convertir el porcentaje a decimal (8% -> 0.08)
        BigDecimal decimalRate = interestRate.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP);

        // Calcular interés: amount * (interestRate / 100)
        return amount.multiply(decimalRate)
                .setScale(2, RoundingMode.HALF_UP); // Redondear a 2 decimales
    }
    @Override
    public List<CreditDto> updateTotalAmountPending(List<CreditDto> credits) {
        LocalDateTime today = LocalDateTime.now();

        credits.forEach(credit -> {
            LocalDateTime endDate = credit.getEndDate();
            long monthsRemaining = ChronoUnit.MONTHS.between(today.withDayOfMonth(1), endDate.withDayOfMonth(1));
            monthsRemaining = Math.max(monthsRemaining, 0);

            BigDecimal totalPending = BigDecimal.valueOf(monthsRemaining).multiply(credit.getMonthlyPayment());
            credit.setTotalAmountPending(totalPending);
            credit.setTermPending( (int)monthsRemaining);
        });
        return credits;
    }
}
