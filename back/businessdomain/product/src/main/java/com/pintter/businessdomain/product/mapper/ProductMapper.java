/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.product.mapper;

import com.pintter.businessdomain.product.dto.ProductDto;
import com.pintter.businessdomain.product.entities.Product;
import java.util.List;
import java.util.Optional;
import org.mapstruct.Mapper;

/**
 *
 * @author Pc
 */
@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDto toDto(Product product);
    Product toEntity(ProductDto productDto);
    List<ProductDto> toDtoList(List<Product> products);
    default Product toOptional(Optional<Product> opt) {
        return opt.orElse(null); // o lanza una excepción si lo prefieres
    }
}
