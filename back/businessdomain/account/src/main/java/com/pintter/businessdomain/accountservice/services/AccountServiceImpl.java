/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.accountservice.services;

import com.pintter.businessdomain.accountservice.common.BusinesTraslation;
import com.pintter.businessdomain.accountservice.common.BusinessTransactions;
import com.pintter.businessdomain.accountservice.dto.AccountDto;
import com.pintter.businessdomain.accountservice.entities.Account;
import com.pintter.businessdomain.accountservice.exceptions.BusinessRuleException;
import com.pintter.businessdomain.accountservice.mapper.AccountMapper;
import com.pintter.businessdomain.accountservice.repository.AccountRepository;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Pc
 */
@Service
@Slf4j
public class AccountServiceImpl implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountMapper accountMapper;
    // Add any required dependencies here (e.g., repositories, mappers)
    @Autowired
    private BusinessTransactions businessTransactions;
    @Override
    public List<AccountDto> getAllAccounts() {
        // Implementation here
        return null;
    }

    @Override
    public AccountDto getAccountById(Long id) {
        // Implementation here
        return null;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        // Implementation here
        return null;
    }

    @Override
    public AccountDto updateAccount(Long id, AccountDto accountDto) throws BusinessRuleException {
        // Implementation here
        Optional<Account> opt = accountRepository.findById(id);
        log.info("resAccount:::::::" + opt.get());
        Account resAccount = accountMapper.toOptional(opt);
        if (resAccount != null) {
            resAccount.setId(id);
            resAccount.setUpdatedAt(LocalDateTime.now());
            resAccount.setBalance(accountDto.getBalance());
            resAccount.setIban(accountDto.getIban());
            resAccount.setCurrency(accountDto.getCurrency());
            resAccount.setStatus(accountDto.getStatus());

        } else {
            BusinessRuleException businessRuleException = new BusinessRuleException("0002", "Error validación. Transacion no localizada. ", HttpStatus.PRECONDITION_FAILED);
            throw businessRuleException;
        }
        log.info("resAccount:::::::" + resAccount);
        AccountDto save = accountMapper.toDto(accountRepository.save(resAccount));
        return save;
    }

    @Override
    public void deleteAccount(Long id) {
        // Implementation here
    }
    @Override
    public AccountDto getFull(Long id) throws BusinessRuleException  {
        // Implementation
        Optional<Account> opt = accountRepository.findById(id);
        Account account = null;
        if(!opt.isEmpty()) {
            account = opt.get();

        }
      //  List<?> products = businessTransactions.getProduct(id);

        if (account != null) {
            AccountDto dto = accountMapper.toDto(account);
       //     dto.setProducts(products);
            return dto;
        } else {
            BusinessRuleException businessRuleException = new BusinessRuleException("0002", "Error validación. Transacion no localizada. ", HttpStatus.PRECONDITION_FAILED);
            throw businessRuleException;
        }
    }
}
