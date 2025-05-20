/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.movement.services;

import com.pintter.businessdomain.movement.dto.MovementDto;
import com.pintter.businessdomain.movement.entities.Movement;
import com.pintter.businessdomain.movement.exceptions.BusinessRuleException;
import java.util.List;
import java.util.Optional;


/**
 *
 * @author Pc
 */

public interface MovementService {
    List<MovementDto> getAllMovements();
    Optional<Movement> getMovementById(Long id);
    MovementDto createMovement(MovementDto movementDto);
    MovementDto updateMovement(Long id, MovementDto movementDto) throws BusinessRuleException;
    void deleteMovement(Long id);
}
