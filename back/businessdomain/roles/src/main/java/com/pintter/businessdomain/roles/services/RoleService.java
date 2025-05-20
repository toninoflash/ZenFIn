/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.roles.services;

import com.pintter.businessdomain.roles.dto.RoleDto;
import com.pintter.businessdomain.roles.exceptions.BusinessRuleException;
import java.util.List;
import org.springframework.security.core.Authentication;

/**
 *
 * @author Pc
 */

public interface RoleService {
    List<RoleDto> getAllRoles();
    RoleDto getRoleById(Long id);
    RoleDto getCurrentRole(Authentication auth);
    RoleDto createRole(RoleDto roleDto);
    RoleDto updateRole(Long id, RoleDto roleDto) throws BusinessRuleException;
    void deleteRole(Long id);
}
