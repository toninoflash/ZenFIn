/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.movement.mapper;

import com.pintter.businessdomain.movement.dto.MovementDto;
import com.pintter.businessdomain.movement.entities.Movement;
import java.util.List;
import java.util.Optional;
import org.mapstruct.Mapper;

/**
 *
 * @author Pc
 */
@Mapper(componentModel = "spring")
public interface MovementMapper {
    MovementDto toDto(Movement movement);
    Movement toEntity(MovementDto movementDto);
    List<MovementDto> toDtoList(List<Movement> movements);
    default Movement toOptional(Optional<Movement> opt) {
        return opt.orElse(null); // o lanza una excepción si lo prefieres
    }
}
