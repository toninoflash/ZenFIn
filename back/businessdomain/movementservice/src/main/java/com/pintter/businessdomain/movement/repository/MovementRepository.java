/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.movement.repository;

import com.pintter.businessdomain.movement.dto.MovementDto;
import com.pintter.businessdomain.movement.entities.Movement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Pc
 */
public interface MovementRepository  extends JpaRepository<Movement, Long> {
    List<Movement> findByUid (Long uid);
}
