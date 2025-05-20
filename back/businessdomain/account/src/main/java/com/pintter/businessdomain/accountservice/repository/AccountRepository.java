/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.accountservice.repository;

import com.pintter.businessdomain.accountservice.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 *
 * @author Pc
 */
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUid(Long userId);
    
}
