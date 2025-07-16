/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.movement.controller;

import com.pintter.businessdomain.movement.dto.AccountDto;
import com.pintter.businessdomain.movement.dto.MovementDto;
import com.pintter.businessdomain.movement.dto.TotalMovementDto;
import com.pintter.businessdomain.movement.entities.Movement;
import com.pintter.businessdomain.movement.exceptions.BusinessRuleException;
import com.pintter.businessdomain.movement.mapper.MovementMapper;
import com.pintter.businessdomain.movement.repository.MovementRepository;
import com.pintter.businessdomain.movement.services.MovementService;

import java.math.BigDecimal;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.pintter.businessdomain.movement.transactions.BusinessTransactions;
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
    @Autowired
    private BusinessTransactions businessTransactions;
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
    @GetMapping("/full/{uid}")
    public ResponseEntity<?> getMovementByUid(@PathVariable(name = "uid") Long uid) {

        List<Movement>  movementDtoList= movementService.getMovementByUid(uid);
        List<Movement> movimientosLast = movementDtoList.stream()
                .filter(m -> m.getCreatedAt().isBefore(LocalDateTime.now()))
                .collect(Collectors.toList());
        if (!movementDtoList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(movimientosLast);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No existe el usuario");
        }
    }
    @GetMapping("/uid/{uid}/{moth}")
    public ResponseEntity<?> getMovementByUid(@PathVariable(name = "uid") Long uid, @PathVariable(name = "moth") int moth) {
        List<TotalMovementDto> result = new ArrayList();
        TotalMovementDto total = new TotalMovementDto();
        List<Movement>  movementDtoList= movementService.getMovementByUid(uid);
        List<Movement> movimientosLast = movementDtoList.stream()
                .filter(m -> m.getCreatedAt().isBefore(LocalDateTime.now().withMonth(moth)))
                .collect(Collectors.toList());

        for (int i=0;i<=3;i++) {
            final int moths= moth - i;
            BigDecimal sumaIncomes = movementDtoList.stream()
                    .filter(m -> "Ingreso".equals(m.getType()) && m.getCreatedAt().getMonthValue() == moths)
                    .map(Movement::getCuota) // suponiendo que getAmount() devuelve un BigDecimal
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal sumaBills = movementDtoList.stream()
                    .filter(m -> ("Gasto".equals(m.getType()) || m.getType().startsWith("Prestamo")) && m.getCreatedAt().getMonthValue() == moths)
                    .map(Movement::getCuota) // suponiendo que getAmount() devuelve un BigDecimal
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal sumaPiggy = movementDtoList.stream()
                    .filter(m -> "Ahorro".equals(m.getType()) && m.getCreatedAt().getMonthValue() == moths)
                    .map(Movement::getCuota) // suponiendo que getAmount() devuelve un BigDecimal
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            TotalMovementDto totals = new TotalMovementDto();
            totals.setIncome(sumaIncomes);
            totals.setBills(sumaBills);
            totals.setPigg(sumaPiggy);
            result.add(totals);
        }
        if (!movementDtoList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No existe el usuario");
        }
    }

    @PostMapping
    public ResponseEntity<?> createMovement(@RequestBody MovementDto movementDto) throws BusinessRuleException, UnknownHostException {
        // Convertir DTO a Entidad
        MovementDto movement = movementService.createMovement(movementDto);
         AccountDto accountDto = new AccountDto();
         accountDto.setId(movement.getAid());
         accountDto.setBalance(movement.getCuota());
         accountDto.setType(movement.getType());
         accountDto = businessTransactions.updateAccountBalance(accountDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(movement);
    }
    @PostMapping("/full")
    public MovementDto createMovementFull(@RequestBody MovementDto movementDto)  {
        // Convertir DTO a Entidad
        MovementDto movement = movementService.createMovement(movementDto);
       // AccountDto accountDto = new AccountDto();
       // accountDto.setId(movement.getAid());
       // accountDto.setBalance(movement.getCuota());
       // accountDto = businessTransactions.updateAccountBalance(accountDto);
        // Actualizar balance en el microservicio Account
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
