/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.roles.controller;

import com.pintter.businessdomain.roles.dto.RoleDto;
import com.pintter.businessdomain.roles.entities.Role;
import com.pintter.businessdomain.roles.exceptions.BusinessRuleException;
import com.pintter.businessdomain.roles.mapper.RoleMapper;
import com.pintter.businessdomain.roles.repository.RoleRepository;
import com.pintter.businessdomain.roles.services.RoleService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Pc
 */
@RestController
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    private RoleService roleService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleMapper roleMapper;

    @GetMapping
    public ResponseEntity<?> getAllRoles() {
        List<RoleDto> listRoleDto = roleMapper.toDtoList(roleRepository.findAll());
        if (listRoleDto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.ok(listRoleDto);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoleById(@PathVariable(name = "id") Long id) {
        
        Optional<Role> opt = roleRepository.findById(id);
        if (opt.isPresent()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(roleMapper.toDto(opt.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No existe el usuario");
        }
    }

    @PostMapping
    public ResponseEntity<?> createRole(@RequestBody RoleDto roleDto) {
        // Convertir DTO a Entidad
        Role role = roleMapper.toEntity(roleDto);
        // Guardar en base de datos
        Role savedRole = roleRepository.save(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRole);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable(name = "id") Long id) {
        Optional<Role> find = roleRepository.findById(id);
        if (find.isPresent()) {
            RoleDto roleDto = roleMapper.toDto(find.get());
            roleRepository.delete(find.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(roleDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRole(@PathVariable(name="id") Long id, @RequestBody RoleDto roleDto) throws BusinessRuleException {
        if (roleDto != null) {
            RoleDto dto = roleService.updateRole(id, roleDto);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No es aceptable");
        }
    }
    
}
