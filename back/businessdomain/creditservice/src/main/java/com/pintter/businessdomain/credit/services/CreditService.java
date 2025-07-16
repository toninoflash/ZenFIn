/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.credit.services;

import com.pintter.businessdomain.credit.dto.CreditDto;
import com.pintter.businessdomain.credit.entities.Credit;
import com.pintter.businessdomain.credit.exceptions.BusinessRuleException;
import java.util.List;
import org.springframework.security.core.Authentication;

/**
 *
 * @author Pc
 */

public interface CreditService {
    List<CreditDto> getAllCredits();
    CreditDto getCreditById(Long id);
    CreditDto getCurrentCredit(Authentication auth);
    CreditDto createCredit(CreditDto CreditDto);
    CreditDto updateCredit(Long id, CreditDto creditDto) throws BusinessRuleException;
    void deleteCredit(Long id);
    CreditDto simulationCredit(CreditDto creditDto);
    List<CreditDto> updateTotalAmountPending(List<CreditDto> credits);
}
