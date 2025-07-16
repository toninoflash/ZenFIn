/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pintter.businessdomain.product.services;

import com.pintter.businessdomain.product.dto.ProductDto;
import com.pintter.businessdomain.product.entities.Product;
import com.pintter.businessdomain.product.exceptions.BusinessRuleException;
import java.util.List;
import java.util.Optional;


/**
 *
 * @author Pc
 */

public interface ProductService {
    List<ProductDto> getAllProducts();
    Optional<Product> getProductById(Long id);
    ProductDto createProduct(ProductDto productDto);
    ProductDto updateProduct(Long id, ProductDto productDto) throws BusinessRuleException;
    List<ProductDto> findByAid(Long aid);
    List<Product> findByUid(Long aid);
    void deleteProduct(Long id);
}
