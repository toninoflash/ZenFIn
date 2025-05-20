/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.movement.services;


import com.pintter.businessdomain.movement.dto.MovementDto;
import com.pintter.businessdomain.movement.entities.Movement;
import com.pintter.businessdomain.movement.exceptions.BusinessRuleException;
import com.pintter.businessdomain.movement.mapper.MovementMapper;
import com.pintter.businessdomain.movement.repository.MovementRepository;
import com.pintter.businessdomain.movement.transactions.BusinessTransactions;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

/**
 *
 * @author Pc
 */
@Service
@Slf4j
public class MovementServiceImpl implements MovementService {

    @Autowired
    private MovementRepository movementRepository;
    @Autowired
    private MovementMapper movementMapper;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private BusinessTransactions businessTransactions;
    // Add any required dependencies here (e.g., repositories, mappers)

    @Override
    public List<MovementDto> getAllMovements() {
        List<MovementDto> listMovementDto = movementMapper.toDtoList(movementRepository.findAll());

        return listMovementDto;
    }

    @Override
    public Optional<Movement> getMovementById(Long id) {
        Optional<Movement> opt = movementRepository.findById(id);
        return opt;
    }

    @Override
    public MovementDto createMovement(MovementDto movementDto) {
        

        Movement movement = movementMapper.toEntity(movementDto);
        movement.setCreatedAt(LocalDateTime.now());
        movement = movementRepository.save(movement);
        return movementMapper.toDto(movement);
    }

    @Override
    public MovementDto updateMovement(Long id, MovementDto movementDto) throws BusinessRuleException {
        // Implementation here
        Optional<Movement> opt = movementRepository.findById(id);
        log.info("resRole:::::::" + opt.get());
        Movement resMovement = movementMapper.toOptional(opt);
        log.info("resRole:::::::" + resMovement);

        if (resMovement != null) {
            resMovement.setId(id);
            

        } else {
            BusinessRuleException businessRuleException = new BusinessRuleException("0002", "Error validación. Transacion no localizada. ", HttpStatus.PRECONDITION_FAILED);
            throw businessRuleException;
        }
        log.info("resRole:::::::" + resMovement);
        MovementDto save = movementMapper.toDto(movementRepository.save(resMovement));
        return save;
    }

    @Override
    public void deleteMovement(Long id) {
        // Implementation here
    }


}
