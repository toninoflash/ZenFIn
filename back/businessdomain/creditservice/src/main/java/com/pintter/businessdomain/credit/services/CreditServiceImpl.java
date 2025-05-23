/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pintter.businessdomain.roles.services;

import com.pintter.businessdomain.roles.exceptions.BusinessRuleException;
import com.pintter.businessdomain.roles.dto.RoleDto;
import com.pintter.businessdomain.roles.entities.Role;
import com.pintter.businessdomain.roles.mapper.RoleMapper;
import com.pintter.businessdomain.roles.repository.RoleRepository;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

/**
 *
 * @author Pc
 */
@Service
@Slf4j
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleMapper roleMapper;
    // Add any required dependencies here (e.g., repositories, mappers)
    
    
    @Override
    public List<RoleDto> getAllRoles() {
        // Implementation here
        return null;
    }

    @Override
    public RoleDto getRoleById(Long id) {
        // Implementation here
        return null;
    }

    @Override
    public RoleDto getCurrentRole(Authentication auth) {
        // Implementation here
        return null;
    }

    @Override
    public RoleDto createRole(RoleDto roleDto) {
        // Implementation here
        return null;
    }

    @Override
    public RoleDto updateRole(Long id, RoleDto roleDto) throws BusinessRuleException {
        // Implementation here
        Optional<Role> opt = roleRepository.findById(id); 
        log.info("resRole:::::::"+opt.get());
        Role resRole = roleMapper.toOptional(opt);
        if (resRole != null) {
            resRole.setId(id);
            resRole.setName(roleDto.getName());
            resRole.setDescription(roleDto.getDescription());
        } else {
            BusinessRuleException businessRuleException = new BusinessRuleException("0002", "Error validación. Transacion no localizada. ", HttpStatus.PRECONDITION_FAILED);
            throw businessRuleException;
        }
        log.info("resRole:::::::"+resRole);
        RoleDto save = roleMapper.toDto(roleRepository.save(resRole));
        return save;
    }

    @Override
    public void deleteRole(Long id) {
        // Implementation here
    }
    
}
