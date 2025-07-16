/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.credit.repository;

import com.pintter.businessdomain.credit.entities.Credit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 *
 * @author Pc
 */
public interface CreditRepository  extends JpaRepository<Credit, Long> {
    List<Credit> findByUid(Long userId);

    
}
