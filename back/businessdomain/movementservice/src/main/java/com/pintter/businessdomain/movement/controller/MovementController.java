/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.movement.controller;

import com.pintter.businessdomain.movement.dto.MovementDto;
import com.pintter.businessdomain.movement.entities.Movement;
import com.pintter.businessdomain.movement.exceptions.BusinessRuleException;
import com.pintter.businessdomain.movement.mapper.MovementMapper;
import com.pintter.businessdomain.movement.repository.MovementRepository;
import com.pintter.businessdomain.movement.services.MovementService;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Pc
 */
@Slf4j
@RestController
@RequestMapping("/api/movement")
public class MovementController {

    @Autowired
    private MovementService movementService;
    @Autowired
    private MovementRepository movementRepository;
    @Autowired
    private MovementMapper movementMapper;
    @GetMapping
    public ResponseEntity<?> getAllMovements() {
        List<MovementDto> listMovementDto = movementService.getAllMovements();
        if (listMovementDto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.ok(listMovementDto);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMovementById(@PathVariable(name = "id") Long id) {
        
        Optional<Movement> opt = movementService.getMovementById(id);
        if (opt.isPresent()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(movementMapper.toDto(opt.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No existe el usuario");
        }
    }


    @PostMapping
    public ResponseEntity<?> createMovement(@RequestBody MovementDto movementDto) throws BusinessRuleException, UnknownHostException {
        // Convertir DTO a Entidad
        MovementDto movement = movementService.createMovement(movementDto);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(movement);
    }
    @PostMapping("/full")
    public MovementDto createMovementFull(@RequestBody MovementDto movementDto)  {
        // Convertir DTO a Entidad
        MovementDto movement = movementService.createMovement(movementDto);

        return movement;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovement(@PathVariable(name = "id") Long id) {
        Optional<Movement> find = movementRepository.findById(id);
        if (find.isPresent()) {
            MovementDto movementDto = movementMapper.toDto(find.get());
            movementRepository.delete(find.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(movementDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMovement(@PathVariable(name="id") Long id, @RequestBody MovementDto movementDto) throws BusinessRuleException {
        if (movementDto != null) {
            MovementDto dto = movementService.updateMovement(id, movementDto);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
}
