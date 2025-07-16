/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.credit.controller;

import com.pintter.businessdomain.credit.dto.CreditDto;
import com.pintter.businessdomain.credit.dto.MovementDto;
import com.pintter.businessdomain.credit.dto.SimulationDto;
import com.pintter.businessdomain.credit.entities.Credit;
import com.pintter.businessdomain.credit.exceptions.BusinessRuleException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.pintter.businessdomain.credit.transactions.BusinessTransactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pintter.businessdomain.credit.mapper.CreditMapper;
import com.pintter.businessdomain.credit.repository.CreditRepository;
import com.pintter.businessdomain.credit.services.CreditService;

/**
 *
 * @author Pc
 */
@RestController
@RequestMapping("/api/credit")
public class CreditController {

    @Autowired
    private CreditService creditService;
    @Autowired
    private CreditRepository creditRepository;
    @Autowired
    private CreditMapper creditMapper;

    @Autowired
    private BusinessTransactions businessTransactions;
    @GetMapping
    public ResponseEntity<?> getAllCredits() {
        List<CreditDto> listCreditDto = creditMapper.toDtoList(creditRepository.findAll());
        if (listCreditDto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.ok(listCreditDto);
        }
    }
    @GetMapping("/full/{id}")
    public ResponseEntity<?> get(@PathVariable(name = "id") Long uid) {
        List<Credit> credits = creditRepository.findByUid(uid);
        List<CreditDto> creditsList = creditMapper.toDtoList(credits);
        creditsList = creditService.updateTotalAmountPending(creditsList);

        return ResponseEntity.ok(creditsList);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCreditById(@PathVariable(name = "id") Long id) {
        
        Optional<Credit> opt = creditRepository.findById(id);
        if (opt.isPresent()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(creditMapper.toDto(opt.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No existe el usuario");
        }
    }

    @PostMapping
    public ResponseEntity<?> createCredit(@RequestBody CreditDto creditDto) {
        // Convertir DTO a Entidad
        Credit credit = creditMapper.toEntity(creditDto);
        credit.setTotalAmountPending(creditDto.getAmount());
        credit.setTermPending(creditDto.getTerm());
        // Guardar en base de datos
        Credit savedCredit = creditRepository.save(credit);
        MovementDto movementDto = new MovementDto();
        movementDto.setUid(savedCredit.getUid());
        movementDto.setAid(savedCredit.getAid());
        movementDto.setCreatedAt(savedCredit.getCreatedAt());
        movementDto.setAid(savedCredit.getAid());
        movementDto.setCuota(savedCredit.getMonthlyPayment());
        movementDto.setName(savedCredit.getName());
        movementDto.setType(savedCredit.getType());
        movementDto.setProgram("Mensual");
        try {
            movementDto = businessTransactions.createMovement(movementDto);
        } catch (Exception e) {
            // Decide si quieres continuar sin el movimiento o lanzar la excepción
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCredit);
    }
    @PostMapping("/simulation")
    public ResponseEntity<?> simulationCredit(@RequestBody SimulationDto simulationDto) {
        // Convertir DTO a Entidad
        CreditDto creditDto = new CreditDto();
        creditDto.setName(simulationDto.getName());
        creditDto.setUid(simulationDto.getUid());
        creditDto.setAmount(simulationDto.getAmount());
        creditDto.setInterestRate(simulationDto.getInterestRate());
        creditDto.setTerm(simulationDto.getTerm());
        creditDto.setType(simulationDto.getType());
        creditDto.setTotalAmountPending(simulationDto.getAmount());
        creditDto.setTermPending(simulationDto.getTerm());
        creditDto = creditService.simulationCredit(creditDto);
        Credit credit = creditMapper.toEntity(creditDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(credit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCredit(@PathVariable(name = "id") Long id) {
        Optional<Credit> find = creditRepository.findById(id);
        if (find.isPresent()) {
            CreditDto creditDto = creditMapper.toDto(find.get());
            creditRepository.delete(find.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(creditDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCredit(@PathVariable(name="id") Long id, @RequestBody CreditDto creditDto) throws BusinessRuleException {
        if (creditDto != null) {
            CreditDto dto = creditService.updateCredit(id, creditDto);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
    
}
