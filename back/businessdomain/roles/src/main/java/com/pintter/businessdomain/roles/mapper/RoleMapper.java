/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.roles.mapper;

import com.pintter.businessdomain.roles.dto.RoleDto;
import com.pintter.businessdomain.roles.entities.Role;
import java.util.List;
import java.util.Optional;
import org.mapstruct.Mapper;

/**
 *
 * @author Pc
 */
@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleDto toDto(Role user);
    Role toEntity(RoleDto userDto);
    List<RoleDto> toDtoList(List<Role> users);
    Role toOptional(Optional<Role> opt);
}
