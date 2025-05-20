/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.accountservice.controller;


import com.pintter.businessdomain.accountservice.common.AccountConstants;
import com.pintter.businessdomain.accountservice.dto.AccountDto;
import com.pintter.businessdomain.accountservice.entities.Account;
import com.pintter.businessdomain.accountservice.exceptions.BusinessRuleException;
import com.pintter.businessdomain.accountservice.mapper.AccountMapper;
import com.pintter.businessdomain.accountservice.repository.AccountRepository;
import com.pintter.businessdomain.accountservice.services.IAccountService;
import com.pintter.businessdomain.accountservice.services.ICloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Pc
 */
@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private IAccountService accountService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountMapper accountMapper;
    @Autowired
    private ICloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<?> getAllAccounts() {
        List<AccountDto> listAccountDto = accountMapper.toDtoList(accountRepository.findAll());
        if (listAccountDto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.ok(listAccountDto);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable(name = "id") Long id) {
        
        Optional<Account> opt = accountRepository.findById(id);
        if (opt.isPresent()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(accountMapper.toDto(opt.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No existe la obra");
        }
    }

    @GetMapping("/user/full")
    public ResponseEntity<?> get(@RequestParam(name = "uid") Long uid) {
        List<Account> accounts = accountRepository.findByUid(uid);
        List<AccountDto> accountsList = accountMapper.toDtoList(accounts);

        if (accountsList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.ok(accountsList);
        }
    }
    @GetMapping("/full/product/{id}")
    public ResponseEntity<?> getFull(@PathVariable(name = "id") Long id) throws BusinessRuleException {
        AccountDto save = accountService.getFull(id);

        if (save != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(save);
        } else {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }
    }
    @PostMapping
    public ResponseEntity<AccountDto> createAccount(@RequestBody AccountDto accountDto) {
        // Convertir DTO a Entidad
        Account account = accountMapper.toEntity(accountDto);
        account.setCreatedAt(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        // Guardar en base de datos
        Account savedAccount = accountRepository.save(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(accountMapper.toDto(savedAccount));
    }

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = cloudinaryService.uploadFile(file);
            return ResponseEntity.ok(Collections.singletonMap("url", imageUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading image: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable(name = "id") Long id) {
        Optional<Account> find = accountRepository.findById(id);
        if (find.isPresent()) {
            AccountDto accountDto = accountMapper.toDto(find.get());
            accountRepository.delete(find.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(accountDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable(name="id") Long id, @RequestBody AccountDto accountDto) throws BusinessRuleException {
        if (accountDto != null) {
            AccountDto dto = accountService.updateAccount(id, accountDto);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
    
}
