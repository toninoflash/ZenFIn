/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.accountservice.mapper;

import com.pintter.businessdomain.accountservice.dto.AccountDto;
import com.pintter.businessdomain.accountservice.entities.Account;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Pc
 */
@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountDto toDto(Account account);
    Account toEntity(AccountDto accountDto);
    List<AccountDto> toDtoList(List<Account> accounts);
    Account toOptional(Optional<Account> opt);
}
