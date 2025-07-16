/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.accountservice.services;

import com.pintter.businessdomain.accountservice.dto.AccountDto;
import com.pintter.businessdomain.accountservice.exceptions.BusinessRuleException;

import java.util.List;

/**
 *
 * @author Pc
 */

public interface IAccountService {
    List<AccountDto> getAllAccounts();
    AccountDto getAccountById(Long id);
    AccountDto createAccount(AccountDto accountDto);
    AccountDto updateAccount(Long id, AccountDto accountDto) throws BusinessRuleException;
    void deleteAccount(Long id);
    AccountDto getFull(Long id) throws BusinessRuleException;
    AccountDto updateAccountBalance(Long id, AccountDto accountDto) throws BusinessRuleException;
}
