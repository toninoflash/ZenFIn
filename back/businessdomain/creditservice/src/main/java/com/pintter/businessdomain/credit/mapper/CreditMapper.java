/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.credit.mapper;

import com.pintter.businessdomain.credit.dto.CreditDto;
import com.pintter.businessdomain.credit.entities.Credit;
import java.util.List;
import java.util.Optional;
import org.mapstruct.Mapper;

/**
 *
 * @author Pc
 */
@Mapper(componentModel = "spring")
public interface CreditMapper {
    CreditDto toDto(Credit credit);
    Credit toEntity(CreditDto creditDto);
    List<CreditDto> toDtoList(List<Credit> credits);
    Credit toOptional(Optional<Credit> opt);
}
